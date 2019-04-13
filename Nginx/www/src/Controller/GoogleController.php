<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\TokenService;
use Symfony\Component\HttpFoundation\Request;
use App\Service\ResponseService;

class GoogleController extends MainController
{

    public function callBackAction(Request $request, ResponseService $responseService)
    {

        $code = $request->get('code');
        if ($code && strlen($code) > 10) {

            $client = new \Google_Client();
            $client->setAuthConfig(__DIR__. DIRECTORY_SEPARATOR . '../../client_secret.json');
            $client->addScope('people.googleapis.com');
            $client->setRedirectUri('http://localhost:3001/google/callback');
            $client->setIncludeGrantedScopes(true);   // incremental auth
            $client->fetchAccessTokenWithAuthCode($code);
            $access_token = $client->getAccessToken()['access_token'];

            $req = "https://www.people.googleapis.com?access_token=". $access_token;
            $ct = new \GuzzleHttp\Client();
            $response = $ct->request('GET', $req);

            return $responseService->buildOkResponse([$response]);

        } else {
            return $responseService->buildOkResponse(["123"]);
        }

//folganoider@gmail.com

    }

}
