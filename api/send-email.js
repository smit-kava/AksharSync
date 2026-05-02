import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Fallback for local development: manually load .env.local if variables are missing
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const envPath = path.join(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
            process.env[key.trim()] = value;
          }
        });
        console.log('Manually loaded .env.local fallback');
      }
    } catch (e) {
      console.error('Failed to manually load .env.local:', e);
    }
  }

  const { name, email, phone, website, countryCode } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Check again after fallback
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing EMAIL_USER or EMAIL_PASS environment variables. Current Keys:', Object.keys(process.env).filter(k => !k.includes('TOKEN')));
    return res.status(500).json({ 
      success: false, 
      error: 'Server configuration error: Email credentials not set in environment.' 
    });
  }

  // Create a transporter using SMTP or a service
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add a timeout
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });

  const websiteUrl = website ? (website.startsWith('http') ? website : 'https://' + website) : 'N/A';

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `New Consultation Call Request from ${name}`,
    replyTo: email,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${countryCode} ${phone}
      Website: ${websiteUrl}
    `,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #472187;">New Consultation Call Request</h2>
        <hr />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <p><strong>Website:</strong> <a href="${websiteUrl}">${websiteUrl}</a></p>
      </div>
    `,
  };

  try {
    console.log('Attempting to send email via:', transporter.options.host);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('NODEMAILER ERROR:', error);
    
    // Provide more specific error messages if possible
    let errorMessage = error.message;
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your App Password.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Could not connect to the email server. Port 587 might be blocked.';
    }

    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email: ' + errorMessage,
      debug: error.code
    });
  }
}
