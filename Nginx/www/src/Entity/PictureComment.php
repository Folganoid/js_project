<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PictureCommentRepository")
 */
class PictureComment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @ORM\ManyToOne(targetEntity="App\Entity\Picture", inversedBy="id")
     * @ORM\JoinColumn(nullable=false)
     */
    private $picture_id;

    /**
     * @ORM\Column(type="integer")
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="id")
     * @ORM\JoinColumn(nullable=false)
     *
     */
    private $user_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $text;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $picture_comment_id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $create_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $update_at;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPictureId(): ?Picture
    {
        return $this->picture_id;
    }

    public function setPictureId(?Picture $picture_id): self
    {
        $this->picture_id = $picture_id;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getPictureCommentId(): ?int
    {
        return $this->picture_comment_id;
    }

    public function setPictureCommentId(?int $picture_comment_id): self
    {
        $this->picture_comment_id = $picture_comment_id;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->create_at;
    }

    public function setCreateAt(\DateTimeInterface $create_at): self
    {
        $this->create_at = $create_at;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->update_at;
    }

    public function setUpdateAt(?\DateTimeInterface $update_at): self
    {
        $this->update_at = $update_at;

        return $this;
    }
}
