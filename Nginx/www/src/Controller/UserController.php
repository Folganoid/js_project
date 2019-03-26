<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\TokenService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\Service\ResponseService;

class UserController extends AbstractController
{
    /**
     * reg
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function registrationAction(Request $request)
    {
        $login = $request->headers->get('Login');
        $pass = $request->headers->get('Password');
        $email = $request->headers->get('Email');

        if (!$login || strlen($login) == 0 || !$pass || strlen($pass) == 0 || !$email || strlen($email) == 0) {
            return (new ResponseService())->buildErrorResponse(401, "Invalid credentials...");
        }

        $userLogin = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(["login" => $login]);

        $userEmail = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(["email" => $login]);

        if ($userLogin || $userEmail) return (new ResponseService())->buildErrorResponse(403, "User already exist");

            $tokenService = new TokenService();
            $manager = $this->getDoctrine()->getManager();

            $user = new User();
            $user->setRole("user");
            $user->setLogin($login);
            $user->setEmail($email);
            $user->setPassword($tokenService->generatePass($pass));

            $manager->persist($user);
            $manager->flush();

            $tokens = ($tokenService->newTokens($user, $manager));

            if (isset($tokens["error"])) return (new ResponseService())->buildErrorResponse(404, $tokens["error"]);
            return (new ResponseService())->buildOkResponse($tokens);
    }

}
