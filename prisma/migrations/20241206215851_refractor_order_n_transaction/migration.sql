/*
  Warnings:

  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `cateringId` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `ongkir` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `paketId` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `totalHarga` on the `Transaksi` table. All the data in the column will be lost.
  - Added the required column `ongkir` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paketId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalHarga` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_transaksiId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaksi` DROP FOREIGN KEY `Transaksi_cateringId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaksi` DROP FOREIGN KEY `Transaksi_paketId_fkey`;

-- AlterTable
ALTER TABLE `Makanan` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `customerId`,
    DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `ongkir` DOUBLE NOT NULL,
    ADD COLUMN `paketId` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentMethod` VARCHAR(50) NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL,
    ADD COLUMN `totalHarga` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Schedule` MODIFY `waktu` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Transaksi` DROP COLUMN `cateringId`,
    DROP COLUMN `ongkir`,
    DROP COLUMN `paketId`,
    DROP COLUMN `paymentMethod`,
    DROP COLUMN `tanggal`,
    DROP COLUMN `totalHarga`,
    ADD COLUMN `customerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Transaksi_fkey` FOREIGN KEY (`transaksiId`) REFERENCES `Transaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Paket_fkey` FOREIGN KEY (`paketId`) REFERENCES `Paket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Owner_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
