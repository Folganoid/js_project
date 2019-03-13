<?php

namespace App\Controller;

use App\Entity\Picture;
use App\Service\AwcS3Service;
use App\Service\ResponseService;
use App\Service\TokenService;
use Symfony\Component\HttpFoundation\Request;
use Aws\S3\S3Client;

class PictureController extends MainController
{

    public function PictureAction(Request $request, ResponseService $responseService, S3Client $s3, AwcS3Service $awcS3Service)
    {
        $method = $request->getMethod();
        $access = $request->headers->get('Access');

        $manager = $this->getDoctrine()->getManager();
        $user = (new TokenService())->getUserByAccessToken($access, $manager);
        if (!$user->getLogin() || strlen($user->getLogin()) == 0) return $responseService->buildErrorResponse(404, "Access denied...");

        /**
         * POST
         */
        if ($method == "POST") {
            $file = $request->files->get('file');
            $contents = file_get_contents($file->getPathname());
            $fileName = $this->getGUID();

            try {
                $link = $awcS3Service->savePicture($user->getLogin(), $fileName, $contents, $s3);
            } catch (\Exception $e) {
                return $responseService->buildErrorResponse(500, $e->getMessage());
            }

            $createAt = \DateTime::createFromFormat('U', time() );
            $createAt->setTimezone(new \DateTimeZone('UTC'));

            $picture = new Picture();
            $picture->setUserId($user->getId());
            $picture->setName("");
            $picture->setDescription("");
            $picture->setS3link($link);
            $picture->setCreatedAt($createAt);
            $manager->persist($picture);
            $manager->flush();

            return $responseService->buildOkResponse([$method, $access, $fileName, $link]);
        }

        return $responseService->buildErrorResponse(500, "Server error...");
    }

    function getGUID(){
            mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
            $charid = strtolower(md5(uniqid(rand(), true)));

            $uuid = substr($charid, 0, 8)
                .substr($charid, 8, 4)
                .substr($charid,12, 4)
                .substr($charid,16, 4)
                .substr($charid,20,12);
            return $uuid;
    }

}
