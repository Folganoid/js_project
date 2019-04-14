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

            try {
                $client = new \Google_Client();
                $client->setAuthConfig(__DIR__ . DIRECTORY_SEPARATOR . '../../client_secret.json');
                $client->addScope(\Google_Service_PeopleService::USERINFO_PROFILE);
                $client->setRedirectUri('http://localhost:3001/google/callback');
                $client->setIncludeGrantedScopes(true);   // incremental auth
                $client->fetchAccessTokenWithAuthCode($code);
                $access_token = $client->getAccessToken();

                $service = new \Google_Service_PeopleService($client);
                $results = $service->people->get('people/me', ['personFields' => 'names,metadata']);

            } catch (\Exception $e) {
                return $responseService->buildErrorResponse(404, $e->getMessage());
            }

            if (
                !isset($access_token['access_token']) ||
                !isset($results->names[0]->displayName) ||
                strlen($access_token['access_token']) < 10 ||
                strlen($results->names[0]->displayName) < 5 ||
                !isset($results->metadata[0]->id) ||
                strlen($results->metadata[0]->id) < 10
            ) return $responseService->buildErrorResponse(404, "Bad google credentials...");

            try {
                $tokenService = new TokenService();
                $pass = $tokenService->generatePass($tokenService->generateToken(20));

                $manager = $this->getDoctrine()->getManager();

                $user = $this->getDoctrine()
                    ->getRepository(User::class)
                    ->findOneBy(["login" => $results->names[0]->displayName, "email" => $results->metadata[0]->id]);

                if (!$user) {
                    $user = new User();
                    $user->setRole("user");
                    $user->setLogin($results->names[0]->displayName);
                    $user->setEmail($results->metadata[0]->id);
                    $user->setPassword($pass);

                    $manager->persist($user);
                    $manager->flush();
                }
            } catch (\Exception $e) {
                return $responseService->buildErrorResponse(404, $e->getMessage());
            }

            $tokens = ($tokenService->newTokens($user, $manager));

            //return $responseService->buildOkResponse([$tokens]);
            return $this->redirect('http://localhost:3000/login?login='. base64_encode($results->names[0]->displayName) . '&access='. $tokens['accessToken'] . "&refresh=" . $tokens['refreshToken']);

        } else {
            return $responseService->buildErrorResponse(404, "Invalid code...");
        }
    }

}