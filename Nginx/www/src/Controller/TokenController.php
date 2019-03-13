<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\TokenService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\Service\ResponseService;

class TokenController extends AbstractController
{
    /**
     * generate tokens
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function generateTokenAction(Request $request)
    {
        $login = $request->headers->get('Login');
        $pass = $request->headers->get('Password');

        if (!$login || strlen($login) == 0 || !$pass || strlen($pass) == 0) {
            return (new ResponseService())->buildErrorResponse(401, "Invalid credentials...");
        }

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(["login" => $login, "password" => (new TokenService())->generatePass($pass)]);

        if (!$user) return (new ResponseService())->buildErrorResponse(401, "User not found");

            $manager = $this->getDoctrine()->getManager();
            $tokens = (new TokenService())->newTokens($user, $manager);

            if (isset($tokens["error"])) return (new ResponseService())->buildErrorResponse(404, $tokens["error"]);
            return (new ResponseService())->buildOkResponse($tokens);
    }

    /**
     * refresh tokens
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function refreshTokenAction(Request $request)
    {
        $refresh = $request->headers->get('Refresh');
        if (!$refresh || strlen($refresh) == 0) return (new ResponseService())->buildErrorResponse(404, "Invalid refresh token data...");

        $manager = $this->getDoctrine()->getManager();
        $tokens = (new TokenService())->refreshTokens($refresh, $manager);

        if (isset($tokens["error"])) return (new ResponseService())->buildErrorResponse(404, $tokens["error"]);
        return (new ResponseService())->buildOkResponse($tokens);
    }

    /**
     *
     */
    public function checkUserByAccessTokenAction(Request $request) {

        $access = $request->headers->get('Access');
        $responseService = new ResponseService();

        if (!$access || strlen($access) == 0) return $responseService->buildErrorResponse(404, "Invalid refresh token data...");

        $manager = $this->getDoctrine()->getManager();
        $user = (new TokenService())->getUserByAccessToken($access, $manager);

        if ($user->getRole() == "404") return $responseService->buildErrorResponse(404, "Invalid access token...");
        if ($user->getRole() == "401") return $responseService->buildErrorResponse(401, "Access token time elapsed...");


    }
}
