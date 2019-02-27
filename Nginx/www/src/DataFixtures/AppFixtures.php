<?php

namespace App\DataFixtures;

use App\Entity\Token;
use App\Entity\User;
use App\Service\TokenService;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\DateTime;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $accessTokenTime = \DateTime::createFromFormat('U', time() + 86400);
        $accessTokenTime->setTimezone(new \DateTimeZone('UTC'));

        $refreshTokenTime = \DateTime::createFromFormat('U', time() + 86400 * 30 );
        $refreshTokenTime->setTimezone(new \DateTimeZone('UTC'));

        $tokenService = new TokenService();

        // user1
        $user = new User();
        $user->setEmail("test@test.test");
        $user->setLogin("test");
        $user->setPassword("test");
        $user->setRole("admin");
        $manager->persist($user);
        $manager->flush();

        $token = new Token();
        $token->setType("access");
        $token->setToken($tokenService->generateToken());
        $token->setFinishAt($accessTokenTime);
        $token->setUserId($user->getId());
        $manager->persist($token);
        $manager->flush();

        $token = new Token();
        $token->setType("refresh");
        $token->setToken($tokenService->generateToken());
        $token->setFinishAt($refreshTokenTime);
        $token->setUserId($user->getId());
        $manager->persist($token);
        $manager->flush();

        // user2
        $user = new User();
        $user->setEmail("test2@test2.test2");
        $user->setLogin("test2");
        $user->setPassword("test2");
        $user->setRole("user");
        $manager->persist($user);
        $manager->flush();

        $token = new Token();
        $token->setType("access");
        $token->setToken($tokenService->generateToken());
        $token->setFinishAt($accessTokenTime);
        $token->setUserId($user->getId());
        $manager->persist($token);
        $manager->flush();

        $token = new Token();
        $token->setType("refresh");
        $token->setToken($tokenService->generateToken());
        $token->setFinishAt($refreshTokenTime);
        $token->setUserId($user->getId());
        $manager->persist($token);
        $manager->flush();
    }
}
