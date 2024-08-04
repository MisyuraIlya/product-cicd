<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240804085452 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product DROP length, DROP width, DROP height, DROP color, DROP volume, DROP diameter, DROP weight, DROP minimum_price');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product ADD length VARCHAR(255) DEFAULT NULL, ADD width VARCHAR(255) DEFAULT NULL, ADD height VARCHAR(255) DEFAULT NULL, ADD color VARCHAR(255) DEFAULT NULL, ADD volume VARCHAR(255) DEFAULT NULL, ADD diameter VARCHAR(255) DEFAULT NULL, ADD weight VARCHAR(255) DEFAULT NULL, ADD minimum_price DOUBLE PRECISION DEFAULT NULL COMMENT \'Minimum price for agent only (calucaltion)\'');
    }
}
