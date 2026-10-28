-- ============================================================
-- create_customer_tables.sql
-- AksharSync Customer Sign-In & Website Visitor Analytics
-- Run this in your MySQL database (akshar_db)
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- 1. Customers Table (Sign-Ins & Leads)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(180) NOT NULL UNIQUE,
    `phone` VARCHAR(40) NULL,
    `company` VARCHAR(150) NULL,
    `interests` VARCHAR(255) NULL,
    `visits_count` INT UNSIGNED NOT NULL DEFAULT 1,
    `last_ip` VARCHAR(60) NULL,
    `last_active` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`),
    INDEX `idx_last_active` (`last_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Site Visitors Table (Page Views & Traffic Analytics)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_visitors` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `session_id` VARCHAR(64) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `page_url` VARCHAR(255) NOT NULL,
    `referrer` VARCHAR(255) NULL,
    `user_agent` VARCHAR(255) NULL,
    `device_type` VARCHAR(30) DEFAULT 'desktop',
    `visited_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_visited_at` (`visited_at`),
    INDEX `idx_session` (`session_id`),
    INDEX `idx_ip` (`ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
