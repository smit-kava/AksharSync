# AksharSync Dynamic Blog System – Deployment & Admin Guide

## 1. Database Setup in MySQL (cPanel / CWP / phpMyAdmin)
1. Log in to your database administration tool (phpMyAdmin or CWP MySQL Manager).
2. Select your database: `akshar_db`.
3. Open the **SQL** tab.
4. **If setting up from scratch:** Copy and paste the contents of `server/blogs/create_blog_tables.sql` and click **Execute / Go**.
5. **If the `blogs` table already exists:** Run `server/blogs/alter_cover_image.sql`:
   ```sql
   ALTER TABLE `blogs` MODIFY `cover_image` MEDIUMTEXT NULL;
   ALTER TABLE `blogs` MODIFY `author_avatar` TEXT NULL;
   ```
   *(This ensures both server URLs and Base64 Data URLs are stored without size restrictions).*
6. **To insert the default blogs:** Run `server/blogs/insert_default_blogs.sql`.

---

## 2. Server Files Deployment (CWP File Manager)
Upload all files from the local `server/blogs/` directory into:
`/home/akshar/public_html/api/blogs/`

Files list:
- `db.php`
- `auth-middleware.php`
- `login.php`
- `get-blogs.php`
- `manage-blog.php`
- `upload-image.php`
- `.htaccess`

### Uploads Folder Permissions
Ensure `/home/akshar/public_html/uploads/blogs/` exists or can be created by PHP (permissions `755` or `777`).

---

## 3. Superadmin Credentials
- **Login URL:** `/admin/login`
- **Default Username:** `superadmin`
- **Default Email:** `admin@aksharsync.com` (also accepts `smitkava21@gmail.com`)
- **Default Password:** `Admin@Akshar2026!`
- **Session Duration:** 24 Hours automatic expiry.

---

## 4. Frontend Console Diagnostics
Open Chrome DevTools (**F12 -> Console**) while testing:
- Every API call prints `[AksharSync API]` with HTTP status, Content-Type, and response body.
- If an endpoint returns HTML (indicating a missing PHP script on CWP), a highlighted warning explains the exact issue.
- If server upload is unavailable, the image uploader automatically falls back to an in-memory Data URL with a diagnostic log so your work is never blocked.
