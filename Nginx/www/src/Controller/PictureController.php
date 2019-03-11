<?php

namespace App\Controller;

use App\Service\ResponseService;
use Symfony\Component\HttpFoundation\Request;
use Aws\S3\S3Client;

class PictureController extends MainController
{

    public function getPictureAction(ResponseService $responseService, S3Client $s3)
    {

        $isExistBucket = $s3->doesBucketExist('my-bucket');
        if (!$isExistBucket) $s3->createBucket(['Bucket' => 'my-bucket']);

        $result1 = $s3->putObject([
            'Bucket' => "my-bucket",
            'Key'    => '111',
            //"Body" => "11111111111111111111111111++++++++++++++",
            'SourceFile' => '/var/www/111.txt',
            'StorageClass' => 'REDUCED_REDUNDANCY',
            'ACL'    => 'public-read',

        ]);
        $url1 = $result1['ObjectURL'];
        $result2 = $s3->putObject([
            'Bucket' => "my-bucket",
            'Key'    => '11',
            //"Body" => "222222222222222222222222++++++++++++++",
            'SourceFile' => '/var/www/222.txt',
            'StorageClass' => 'REDUCED_REDUNDANCY',
            'ACL'    => 'public-read',

        ]);
        $url2= $result2['ObjectURL'];

        $res = $s3->getObject(['Bucket' => "my-bucket", 'Key' => '111']);


        var_dump((string)$res['Body']);

        return $responseService->buildOkResponse(["res" => $res]);
    }


}
