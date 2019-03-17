<?php

namespace App\Repository;

use App\Entity\Picture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Picture|null find($id, $lockMode = null, $lockVersion = null)
 * @method Picture|null findOneBy(array $criteria, array $orderBy = null)
 * @method Picture[]    findAll()
 * @method Picture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PictureRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Picture::class);
    }

    // /**
    //  * @return Picture[] Returns an array of Picture objects
    //  */

    public function findPictureWithRate($userId)
    {
        return $this->createQueryBuilder('p')
            ->select([
                'p.id',
                'p.name',
                'p.description',
                'p.s3link',
                'p.s3minlink',
                'p.coord',
                'p.created_at',
                'r.rate'])
            ->leftJoin('App\Entity\PictureRating', 'r', 'with', 'p.id = r.picture_id')
            ->where('p.user_id = ' . $userId)
            //->addSelect('r.rate')
            ->getQuery()
            ->getResult()
        ;
    }


    /*
    public function findOneBySomeField($value): ?Picture
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
