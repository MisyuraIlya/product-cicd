<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240716145827 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE home_edit (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) DEFAULT NULL, orden INT DEFAULT NULL, is_video TINYINT(1) NOT NULL, is_banner TINYINT(1) NOT NULL, is_active TINYINT(1) NOT NULL, count INT DEFAULT NULL, count_mobile INT DEFAULT NULL, is_pop_up TINYINT(1) NOT NULL, is_deletable TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE home_media (id INT AUTO_INCREMENT NOT NULL, media_id INT DEFAULT NULL, home_id INT DEFAULT NULL, INDEX IDX_61D6589CEA9FDD75 (media_id), INDEX IDX_61D6589C28CDC89C (home_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payment (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, json LONGTEXT DEFAULT NULL, token VARCHAR(255) DEFAULT NULL, amount DOUBLE PRECISION DEFAULT NULL, yaad_ac_code VARCHAR(255) DEFAULT NULL, json_j5 LONGTEXT DEFAULT NULL, j5_id VARCHAR(255) DEFAULT NULL, INDEX IDX_6D28840DA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE home_media ADD CONSTRAINT FK_61D6589CEA9FDD75 FOREIGN KEY (media_id) REFERENCES media_object (id)');
        $this->addSql('ALTER TABLE home_media ADD CONSTRAINT FK_61D6589C28CDC89C FOREIGN KEY (home_id) REFERENCES home_edit (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE history ADD payment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704B4C3A3BB FOREIGN KEY (payment_id) REFERENCES payment (id)');
        $this->addSql('CREATE INDEX IDX_27BA704B4C3A3BB ON history (payment_id)');
        $this->addSql('ALTER TABLE product ADD length VARCHAR(255) DEFAULT NULL, ADD width VARCHAR(255) DEFAULT NULL, ADD height VARCHAR(255) DEFAULT NULL, ADD color VARCHAR(255) DEFAULT NULL, ADD volume VARCHAR(255) DEFAULT NULL, ADD diameter VARCHAR(255) DEFAULT NULL, ADD weight VARCHAR(255) DEFAULT NULL, ADD minimum_price DOUBLE PRECISION DEFAULT NULL COMMENT \'Minimum price for agent only (calucaltion)\', CHANGE final_price final_price DOUBLE PRECISION DEFAULT NULL COMMENT \'the price after online fetching\'');
        $this->addSql('ALTER TABLE user CHANGE is_allow_order is_allow_order TINYINT(1) DEFAULT 0 NOT NULL COMMENT \'for agent only (agent can send order without approve)\', CHANGE is_allow_all_clients is_allow_all_clients TINYINT(1) DEFAULT 0 NOT NULL COMMENT \'for agent only (can all clients not only yours)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704B4C3A3BB');
        $this->addSql('ALTER TABLE home_media DROP FOREIGN KEY FK_61D6589CEA9FDD75');
        $this->addSql('ALTER TABLE home_media DROP FOREIGN KEY FK_61D6589C28CDC89C');
        $this->addSql('ALTER TABLE payment DROP FOREIGN KEY FK_6D28840DA76ED395');
        $this->addSql('DROP TABLE home_edit');
        $this->addSql('DROP TABLE home_media');
        $this->addSql('DROP TABLE payment');
        $this->addSql('DROP INDEX IDX_27BA704B4C3A3BB ON history');
        $this->addSql('ALTER TABLE history DROP payment_id');
        $this->addSql('ALTER TABLE product DROP length, DROP width, DROP height, DROP color, DROP volume, DROP diameter, DROP weight, DROP minimum_price, CHANGE final_price final_price DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE is_allow_order is_allow_order TINYINT(1) DEFAULT 0 NOT NULL, CHANGE is_allow_all_clients is_allow_all_clients TINYINT(1) DEFAULT 0 NOT NULL');
    }
}
