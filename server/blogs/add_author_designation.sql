-- ============================================================
-- add_author_designation.sql
-- Run this query in phpMyAdmin / MySQL (database: akshar_db)
-- Adds the dynamic author_designation column to blogs table
-- ============================================================

-- 1. Add author_designation column if it does not already exist
ALTER TABLE `blogs`
ADD COLUMN `author_designation` VARCHAR(150) NULL DEFAULT 'AksharSync Engineering Specialist' AFTER `author_name`;

-- 2. Populate any existing articles with default designation
UPDATE `blogs`
SET `author_designation` = 'AksharSync Engineering Specialist'
WHERE `author_designation` IS NULL OR `author_designation` = '';
