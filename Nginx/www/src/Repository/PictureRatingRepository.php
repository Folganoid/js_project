<?php

namespace App\Repository;

use App\Entity\PictureRating;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method PictureRating|null find($id, $lockMode = null, $lockVersion = null)
 * @method PictureRating|null findOneBy(array $criteria, array $orderBy = null)
 * @method PictureRating[]    findAll()
 * @method PictureRating[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PictureRatingRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PictureRating::class);
    }

    // /**
    //  * @return PictureRating[] Returns an array of PictureRating objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PictureRating
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
