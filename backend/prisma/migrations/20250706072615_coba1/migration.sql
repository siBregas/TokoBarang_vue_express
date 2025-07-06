-- AlterTable
ALTER TABLE `item` ADD COLUMN `description` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(191) NULL;
