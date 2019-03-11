<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190310154218 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE picture (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, s3link VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE picture_rating (id INT AUTO_INCREMENT NOT NULL, picture_id INT NOT NULL, user_id INT NOT NULL, rate INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE picture_comment (id INT AUTO_INCREMENT NOT NULL, picture_id INT NOT NULL, user_id INT NOT NULL, text VARCHAR(255) NOT NULL, picture_comment_id INT DEFAULT NULL, create_at DATETIME NOT NULL, update_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');

        $this->addSql("ALTER TABLE picture ADD FOREIGN KEY (user_id) REFERENCES user(id);");
        $this->addSql("ALTER TABLE picture_rating ADD FOREIGN KEY (picture_id) REFERENCES picture(id);");
        $this->addSql("ALTER TABLE picture_comment ADD FOREIGN KEY (picture_id) REFERENCES picture(id);");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE picture');
        $this->addSql('DROP TABLE picture_rating');
        $this->addSql('DROP TABLE picture_comment');

    }
}
