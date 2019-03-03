<?php

namespace App\Controller;

use App\Entity\User;
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

        if (!$accessToken) return $responseService->buildErrorResponse(403, "Invalid access token data...");
        $user = $tokenService->getUserByAccessToken($accessToken, $manager);
        if (!$user->getId()) return $responseService->buildErrorResponse(404, "Invalid or elapsed token...");

        if (!empty($role)) {
            if (!in_array($user->getRole(), $role)) return $responseService->buildErrorResponse(404, "Access denied...");
        }

        return true;
    }

}
