<?php

namespace App\Repository;

use App\Entity\PictureComment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method PictureComment|null find($id, $lockMode = null, $lockVersion = null)
 * @method PictureComment|null findOneBy(array $criteria, array $orderBy = null)
 * @method PictureComment[]    findAll()
 * @method PictureComment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PictureCommentRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PictureComment::class);
    }

    // /**
    //  * @return PictureComment[] Returns an array of PictureComment objects
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
    public function findOneBySomeField($value): ?PictureComment
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
