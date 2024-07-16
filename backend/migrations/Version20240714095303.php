<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240714095303 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product CHANGE final_price final_price DOUBLE PRECISION DEFAULT NULL COMMENT \'the price after online fetching\'');
        $this->addSql('ALTER TABLE user CHANGE is_allow_order is_allow_order TINYINT(1) DEFAULT 0 NOT NULL COMMENT \'for agent only (agent can send order without approve)\', CHANGE is_allow_all_clients is_allow_all_clients TINYINT(1) DEFAULT 0 NOT NULL COMMENT \'for agent only (can all clients not only yours)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product CHANGE final_price final_price DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE is_allow_order is_allow_order TINYINT(1) DEFAULT 0 NOT NULL, CHANGE is_allow_all_clients is_allow_all_clients TINYINT(1) DEFAULT 0 NOT NULL');
    }
}
