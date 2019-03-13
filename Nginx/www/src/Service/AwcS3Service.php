<?php
/**
 * Created by PhpStorm.
 * User: fg
 * Date: 3/13/19
 * Time: 8:07 PM
 */

namespace App\Service;

use Aws\S3\S3Client;

class AwcS3Service
{

    public function savePicture(string $bucket, string $fileName, $fileBody, S3Client $s3): string {

        $isExistBucket = $s3->doesBucketExist($bucket);
        if (!$isExistBucket) $s3->createBucket(['Bucket' => $bucket]);

        $result1 = $s3->putObject([
            'Bucket' => $bucket,
            'Key'    => $fileName,
            'Body' => base64_encode($fileBody),
            //'SourceFile' => '/var/www/111.txt',
            //'StorageClass' => 'REDUCED_REDUNDANCY',
            'ACL'    => 'public-read',

        ]);

        if (!$result1) throw new \Exception("Can't put file to S3...");

        $url = $result1['ObjectURL'];

        $urlArr = explode("/", $url);
        $urlRes = $urlArr[count($urlArr) - 2] . "/" . $urlArr[count($urlArr) - 1];

        return $urlRes;
    }

    public function deletePicture(string $link, S3Client $s3): string {

        $linkArr = explode("/", $link);

        $bucket = $linkArr[count($linkArr) - 2];
        $key = $linkArr[count($linkArr) - 1];

        $res = $s3->deleteObject([
            'Bucket' => $bucket,
            'Key'    => $key
        ]);

        return $res;

    }

    public function readPicture(string $link, S3Client $s3): string {

        $linkArr = explode("/", $link);

        $bucket = $linkArr[count($linkArr) - 2];
        $key = $linkArr[count($linkArr) - 1];

        $res = $s3->getObject(
            [
                'Bucket' => $bucket,
                'Key' => $key
            ]
        );

        return base64_decode($res['Body']);
    }

}