<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190316191500 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE picture DROP FOREIGN KEY picture_ibfk_1');
        $this->addSql('DROP INDEX user_id ON picture');
        $this->addSql('ALTER TABLE picture ADD s3minlink VARCHAR(255) NOT NULL, ADD coord VARCHAR(255)');
        $this->addSql('ALTER TABLE token DROP FOREIGN KEY token_ibfk_1');
        $this->addSql('DROP INDEX user_id ON token');
        $this->addSql('ALTER TABLE picture_rating DROP FOREIGN KEY picture_rating_ibfk_1');
        $this->addSql('DROP INDEX picture_id ON picture_rating');
        $this->addSql('ALTER TABLE picture_comment DROP FOREIGN KEY picture_comment_ibfk_1');
        $this->addSql('DROP INDEX picture_id ON picture_comment');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE picture DROP s3minlink, DROP coord');
        $this->addSql('ALTER TABLE picture ADD CONSTRAINT picture_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX user_id ON picture (user_id)');
        $this->addSql('ALTER TABLE picture_comment ADD CONSTRAINT picture_comment_ibfk_1 FOREIGN KEY (picture_id) REFERENCES picture (id)');
        $this->addSql('CREATE INDEX picture_id ON picture_comment (picture_id)');
        $this->addSql('ALTER TABLE picture_rating ADD CONSTRAINT picture_rating_ibfk_1 FOREIGN KEY (picture_id) REFERENCES picture (id)');
        $this->addSql('CREATE INDEX picture_id ON picture_rating (picture_id)');
        $this->addSql('ALTER TABLE token ADD CONSTRAINT token_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX user_id ON token (user_id)');
    }
}
