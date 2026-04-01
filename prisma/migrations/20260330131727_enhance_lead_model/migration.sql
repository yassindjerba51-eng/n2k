/*
  Warnings:

  - You are about to drop the column `company` on the `leads` table. All the data in the column will be lost.
  - You are about to drop the column `problem_zone` on the `leads` table. All the data in the column will be lost.
  - Added the required column `activity_type` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem_type` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leads` DROP COLUMN `company`,
    DROP COLUMN `problem_zone`,
    ADD COLUMN `activity_type` VARCHAR(100) NOT NULL,
    ADD COLUMN `capacity` VARCHAR(100) NOT NULL,
    ADD COLUMN `cycle_info` VARCHAR(100) NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `problem_type` TEXT NOT NULL,
    ADD COLUMN `region` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'NEW';
