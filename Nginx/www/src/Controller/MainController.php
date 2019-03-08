<?php

namespace App\Controller;

use App\Service\TokenService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\Service\ResponseService;

class MainController extends AbstractController
{

    protected function checkUserAccess(Request $request, array $role = []) {
        $accessToken = $request->headers->get('access');
        $manager = $this->getDoctrine()->getManager();
        $responseService = new ResponseService();
        $tokenService = new TokenService();

        if (!$accessToken) return $responseService->buildErrorResponse(404, "Invalid access token data...");

        $user = $tokenService->getUserByAccessToken($accessToken, $manager);

        if ($user->getRole() == "404") return $responseService->buildErrorResponse(404, "Invalid access token...");
        if ($user->getRole() == "401") return $responseService->buildErrorResponse(401, "Access token time elapsed...");

        if (!empty($role)) {
            if (!in_array($user->getRole(), $role)) return $responseService->buildErrorResponse(404, "Access denied...");
        }

        return true;
    }

}
