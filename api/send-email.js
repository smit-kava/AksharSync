import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, website, countryCode } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and Email are required",
      });
    }

    // Create transporter (CWP SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true", // TRUE for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
    });

    // Verify connection (IMPORTANT DEBUG)
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");

    // Format website
    const websiteUrl = website
      ? website.startsWith("http")
        ? website
        : "https://" + website
      : "N/A";

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${countryCode || ""} ${phone || ""}
Website: ${websiteUrl}
      `,
      html: `
<div style="font-family: Arial; padding:20px;">
  <h2 style="color:#472187;">New Contact Request</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${countryCode || ""} ${phone || ""}</p>
  <p><strong>Website:</strong> ${websiteUrl}</p>
</div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("📧 Email Sent:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("❌ ERROR:", error);

    let message = error.message;

    if (error.code === "EAUTH") {
      message = "Authentication failed (check email & password)";
    } else if (error.code === "ESOCKET") {
      message = "Connection failed (port blocked or wrong host)";
    }

    return res.status(500).json({
      success: false,
      error: message,
    });
  }
}