<?php

namespace App\Controller;

use App\Entity\Picture;
use App\Service\AwcS3Service;
use App\Service\ResponseService;
use App\Service\TokenService;
use App\Service\SysService;
use Symfony\Component\Config\Definition\Exception\Exception;
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
            $fileName = SysService::getGUID();
            $fileNameMin = SysService::getGUID();

            $type = getimagesize($file->getPathname());
            if (!$type) return $responseService->buildErrorResponse(404, "File is not image...");

            try {
                $link = $awcS3Service->savePicture($user->getLogin(), $fileName, $contents, $s3);
                $contentsMin = resize_image($file->getPathname(), 150, 150);
                $linkMin = $awcS3Service->savePicture($user->getLogin(), $fileNameMin, $contentsMin, $s3);
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
            $picture->setS3minlink($linkMin);
            $picture->setCoord("111");
            $picture->setCreatedAt($createAt);
            $manager->persist($picture);
            $manager->flush();

            return $responseService->buildOkResponse([$method, $access, $fileName, $link, $type]);
        } else if ($method == "GET") {

        } else if ($method == "DELETE") {

        }


        return $responseService->buildErrorResponse(500, "Server error...");
    }

    function resize_image($file, $w, $h, $crop=FALSE) {
        list($width, $height) = getimagesize($file);
        $r = $width / $height;
        if ($crop) {
            if ($width > $height) {
                $width = ceil($width-($width*abs($r-$w/$h)));
            } else {
                $height = ceil($height-($height*abs($r-$w/$h)));
            }
            $newwidth = $w;
            $newheight = $h;
        } else {
            if ($w/$h > $r) {
                $newwidth = $h*$r;
                $newheight = $h;
            } else {
                $newheight = $w/$r;
                $newwidth = $w;
            }
        }
        $src = imagecreatefromjpeg($file);
        $dst = imagecreatetruecolor($newwidth, $newheight);
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

        return $dst;
    }
}
