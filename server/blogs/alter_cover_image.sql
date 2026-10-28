-- ============================================================
-- alter_cover_image.sql
-- Run this in phpMyAdmin if you have already created the blogs table!
-- This expands cover_image and author_avatar to support high-res URLs and Base64 Data URLs.
-- ============================================================

ALTER TABLE `blogs` MODIFY `cover_image` MEDIUMTEXT NULL;
ALTER TABLE `blogs` MODIFY `author_avatar` TEXT NULL;
