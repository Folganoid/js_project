<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PictureRatingRepository")
 */
class PictureRating
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
     */
    private $user_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $rate;

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

    public function getRate(): ?int
    {
        return $this->rate;
    }

    public function setRate(int $rate): self
    {
        $this->rate = $rate;

        return $this;
    }
}
