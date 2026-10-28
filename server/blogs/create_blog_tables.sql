-- ============================================================
-- create_blog_tables.sql
-- AksharSync Dynamic Blog System Database Setup
-- Run this script in your MySQL database (akshar_db)
-- ============================================================

SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- 1. Admin Users Table (For Superadmin Authentication)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(60) NOT NULL UNIQUE,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` VARCHAR(30) NOT NULL DEFAULT 'superadmin',
    `auth_token` VARCHAR(255) DEFAULT NULL,
    `token_expires_at` DATETIME DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Blogs Table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `excerpt` TEXT NULL,
    `content` LONGTEXT NOT NULL,
    `cover_image` MEDIUMTEXT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'Lifecycle & Automation',
    `tags` VARCHAR(255) NULL,
    `author_name` VARCHAR(100) NOT NULL DEFAULT 'AksharSync Team',
    `author_avatar` TEXT NULL,
    `read_time` VARCHAR(30) NOT NULL DEFAULT '5 min read',
    `status` ENUM(
        'draft',
        'published',
        'archived'
    ) NOT NULL DEFAULT 'published',
    `views` INT UNSIGNED NOT NULL DEFAULT 0,
    `seo_title` VARCHAR(255) NULL,
    `seo_description` TEXT NULL,
    `published_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_slug` (`slug`),
    INDEX `idx_status_pub` (`status`, `published_at`),
    INDEX `idx_category` (`category`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Default Superadmin Seed
-- Default Password: Admin@Akshar2026!
-- Hash generated using password_hash('Admin@Akshar2026!', PASSWORD_BCRYPT)
-- ------------------------------------------------------------
INSERT INTO
    `admin_users` (
        `username`,
        `email`,
        `password_hash`,
        `role`
    )
VALUES (
        'superadmin',
        'smitkava21@gmail.com',
        '$2y$10$wH2v7Q4cM1oGkUsm1RzHteYVdYJ7k2rS9qS4fCgD0/wG6mD5m4rS.', -- hashed Admin@Akshar2026!
        'superadmin'
    )
ON DUPLICATE KEY UPDATE
    `username` = `username`;

-- ------------------------------------------------------------
-- 4. Sample High-Value Seed Articles for AksharSync
-- ------------------------------------------------------------
INSERT INTO
    `blogs` (
        `title`,
        `slug`,
        `excerpt`,
        `content`,
        `cover_image`,
        `category`,
        `tags`,
        `author_name`,
        `author_avatar`,
        `read_time`,
        `status`,
        `views`,
        `seo_title`,
        `seo_description`,
        `published_at`
    )
VALUES (
        'The Anatomy of a High-Converting Klaviyo Lifecycle Flow in 2026',
        'high-converting-klaviyo-lifecycle-flow-2026',
        'Learn how modern e-commerce brands structure behavioral triggers, conditional splits, and liquid personalization to scale customer lifetime value.',
        '## Why Static Email Drips Are Dead

Modern retention marketing is no longer about sending scheduled blasts every Tuesday. The highest-performing DTC and B2B brands leverage event-driven customer lifecycle architecture that responds to real-time intent signals.

### 1. The Welcome Matrix: Beyond the Discount Code
Instead of a single 10% off code, the modern welcome sequence must segment subscribers within their first 60 seconds:
- **First-time purchasers vs. browser:** Divert traffic based on pre-purchase quizzes or zero-party survey data.
- **Brand Storytelling & Proof:** Email #2 must validate product efficacy before the first order is even delivered.

```liquid
{% if customer.orders_count > 0 %}
  Thanks for being a VIP customer, {{ customer.first_name }}!
{% else %}
  Here is your 15% welcome pass to get started.
{% endif %}
```

### 2. High-Frequency Abandoned Cart vs. Checkout
Many brands conflate Cart Abandonment and Checkout Abandonment. Separating these two signals allows you to adjust messaging urgency:
- **Added to Cart:** Soft reminder, product benefits, social reviews.
- **Started Checkout:** Clear shipping policies, guarantee seals, direct checkout restore link.

### Key Takeaways
1. Never send a one-size-fits-all email sequence.
2. Monitor inbox placement across Gmail and Apple Mail regularly.
3. Test time delays based on customer timezone and peak engagement hours.',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
        'Lifecycle & Automation',
        'Klaviyo, Email Flows, DTC, Automation',
        'AksharSync Specialist',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        '6 min read',
        'published',
        248,
        'High-Converting Klaviyo Lifecycle Flows (2026 Guide) | AksharSync',
        'Discover how top e-commerce brands scale retention with advanced Klaviyo lifecycle flows, conditional splits, and zero-party data.',
        NOW()
    ),
    (
        'Deliverability Playbook: Beating Gmail and Yahoo Spam Filters',
        'deliverability-playbook-gmail-yahoo-spam-filters',
        'Crucial inbox placement strategies, SPF/DKIM/DMARC compliance, and engagement sunsetting protocols to keep your emails out of the spam folder.',
        '## The New Standard in Email Deliverability

Deliverability is the foundation of every dollar generated through email marketing. If your emails end up in the Spam or Promotions tab, the world’s most persuasive copy won’t make a difference.

### The Essential Authentication Checklist
Every sending domain must strictly enforce:
- **SPF (Sender Policy Framework):** Authorizing sending IP ranges.
- **DKIM (DomainKeys Identified Mail):** 2048-bit cryptographic signatures verifying domain integrity.
- **DMARC (Domain-based Message Authentication):** Moving from `p=none` to `p=quarantine` or `p=reject`.
- **One-Click Unsubscribe Header:** Mandated by Gmail and Yahoo since 2024.

### The 90-Day Engagement Sunset Policy
Sending to unengaged contacts destroys sender reputation. Implement an automated sunset flow:
1. Identify subscribers with zero opens or clicks over 90 consecutive days.
2. Trigger a 2-part "Last Call" re-engagement email.
3. If no action is taken, automatically suppress or tag as inactive.

```
Total List Health > Raw Subscriber Count
```

Protecting your sender score directly boosts inbox placement for active buyers.',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        'Deliverability & Technical',
        'Deliverability, SPF, DKIM, DMARC, Reputation',
        'Deliverability Architect',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        '7 min read',
        'published',
        182,
        'Mastering Email Deliverability & Yahoo/Gmail Filters | AksharSync',
        'Actionable guide on SPF, DKIM, DMARC, and list hygiene to maximize your inbox placement and sender score.',
        NOW()
    ),
    (
        'Modular Email Design Systems: Scaling High-Volume Creative Production',
        'modular-email-design-systems-scale-production',
        'How to build agile, component-driven email design systems in Figma and HTML that slash campaign turnaround time by 60%.',
        '## The Bottleneck in Email Production

As brands scale, producing 4 to 6 campaign emails per week becomes a massive resource drain. Without an established design system, designers create each email from scratch, leading to visual inconsistency and rendering bugs across Outlook and mobile clients.

### Principles of Modular Email Architecture
1. **Grid-Based Tokens:** Establish 8px baseline rhythm across typography and button paddings.
2. **Master Components:** Header bars, hero containers, multi-column product grids, trust badges, and footers.
3. **Bulletproof HTML/CSS:** Rely on hybrid-fluid coding techniques that render flawlessly on desktop Outlook and iOS Mail alike.

### Results
Adopting a modular design system reduces campaign build time from 8 hours to under 2.5 hours while elevating brand cohesion.',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        'UX/UI & Templates',
        'Modular Design, Figma, Email HTML, Templates',
        'Creative Lead',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        '5 min read',
        'published',
        135,
        'Modular Email Design Systems That Scale | AksharSync',
        'Explore how component-based email design systems save time, eliminate bugs, and create visually stunning campaigns.',
        NOW()
    )
ON DUPLICATE KEY UPDATE
    `slug` = `slug`;