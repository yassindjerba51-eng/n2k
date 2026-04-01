-- CreateTable
CREATE TABLE `leads` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `problem_zone` ENUM('BATIMENT', 'EAU', 'AMBIANCE') NOT NULL,
    `message` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `is_disinfectant` BOOLEAN NOT NULL DEFAULT false,
    `category` ENUM('BATIMENT', 'EAU', 'AMBIANCE') NOT NULL,
    `step` INTEGER NOT NULL DEFAULT 1,
    `description` JSON NOT NULL,
    `dosage` VARCHAR(255) NULL,
    `image_url` VARCHAR(500) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `products_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    `cover_image` VARCHAR(500) NULL,
    `tags` TEXT NOT NULL,
    `title_fr` VARCHAR(500) NOT NULL,
    `title_en` VARCHAR(500) NOT NULL,
    `title_ar` VARCHAR(500) NOT NULL,
    `content_fr` LONGTEXT NOT NULL,
    `content_en` LONGTEXT NOT NULL,
    `content_ar` LONGTEXT NOT NULL,
    `published_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `blog_posts_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
