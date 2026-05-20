# 📧 Google SMTP Setup Guide for AksharSync

To allow your website (both in development and in production) to send emails via Google SMTP, you must configure a Google **App Password**. Google blocks regular password logins for SMTP due to modern security standards (2-Step Verification).

This guide walks you through getting your App Password and completing your configuration.

---

## 🔑 Step 1: Generate a Google App Password

1. **Go to your Google Account Settings**:
   - Visit [Google Account Security](https://myaccount.google.com/security) and log in with your account: `kavasmit603@gmail.com`.
2. **Enable 2-Step Verification**:
   - In the "How you sign in to Google" section, verify that **2-Step Verification** is turned **ON**. (Google requires this before allowing App Passwords).
3. **Navigate to App Passwords**:
   - If you can't find the menu, search for **"App passwords"** in the top search bar of your Google Account page, or go directly to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
4. **Create a New App Password**:
   - **App Name**: Enter a descriptive name like `AksharSync Website`.
   - Click **Create**.
5. **Copy the Password**:
   - A modal will pop up showing a **16-character code** (e.g., `abcd efgh ijkl mnop`).
   - Copy this 16-character code immediately. **This is your SMTP password.** (Note: Do not include the spaces when pasting it; just paste all 16 letters).

---

## 🛠️ Step 2: Configure Your Project Files

I have already pre-configured the files in your codebase to use Gmail SMTP. You only need to replace the placeholders with your newly generated 16-character password in the following locations:

### 1. For Local Development / Serverless Environments (`.env.local` & `.env`)
Open your local `.env` and `.env.local` files in your editor:
- Change the `EMAIL_PASS` placeholder:
  ```env
  EMAIL_PASS=your_16_character_app_password
  ```

### 2. For Production Server (`public/api/send-email.php`)
Open `public/api/send-email.php` (which runs on your CWP Server):
- Replace `YOUR_GMAIL_APP_PASSWORD` on line 53:
  ```php
  $smtp_pass = "your_16_character_app_password";
  ```

### 3. For Production Connection Tester (`public/api/test-connection.php`)
Open `public/api/test-connection.php` (optional but recommended for debugging):
- Replace `YOUR_GMAIL_APP_PASSWORD` on line 27:
  ```php
  $pass = "your_16_character_app_password";
  ```

---

## 🚀 Step 3: Deploy the Changes to CWP

Once you have replaced the placeholders with your actual 16-character App Password, redeploy your website:

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
2. **Upload the files**:
   - Zip the contents of your newly generated `dist` folder.
   - Upload and extract them in your CWP File Manager at `/home/USERNAME/public_html/`.
   - Make sure your updated `api/send-email.php` and `api/test-connection.php` are under your domain's `/api/` path.

---

## 🧪 Step 4: Test Your Connection

1. Visit your website's contact page.
2. Click the **"Test Server Connection"** button at the bottom of the form.
3. If it returns **"Connection Test Successful"**, your Google SMTP server is successfully authenticating and sending emails to `kavasmit603@gmail.com`!
