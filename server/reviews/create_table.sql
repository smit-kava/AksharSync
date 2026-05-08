-- ============================================================
-- AksharSync – Client Reviews Table
-- Database: akshar_db
-- Run this in phpMyAdmin > akshar_db > SQL tab
-- ============================================================

CREATE TABLE IF NOT EXISTS `client_reviews` (
  `id`         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(120) NOT NULL,
  `email`      VARCHAR(180) NOT NULL,
  `company`    VARCHAR(120) DEFAULT NULL,
  `rating`     TINYINT      NOT NULL DEFAULT 5 CHECK (`rating` BETWEEN 1 AND 5),
  `review`     TEXT         NOT NULL,
  `avatar_url` VARCHAR(500) DEFAULT NULL,
  `is_verified` TINYINT(1)  NOT NULL DEFAULT 0 COMMENT '0=pending, 1=approved',
  `source`     VARCHAR(60)  NOT NULL DEFAULT 'website',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_verified` (`is_verified`),
  INDEX `idx_created`  (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
