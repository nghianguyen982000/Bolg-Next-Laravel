<?php

namespace App\Http\Controllers;

use Aws\Credentials\Credentials;
use Aws\S3\Exception\S3Exception;
use Aws\S3\S3Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class S3Controller extends Controller
{
    public function generateUploadUrl(string $filePath)
    {
        $key  = config('filesystems.disks.s3.key');
        $secret = config('filesystems.disks.s3.secret');
        $credentials = new Credentials($key, $secret);

        $s3Client = new S3Client([
            'credentials' => $credentials,
            'region' => config('filesystems.disks.s3.region'),
            'version' => 'latest',
            'endpoint' => config('filesystems.disks.s3.url'),
            'use_path_style_endpoint' => true,
        ]);

        try {
            $cmd = $s3Client->getCommand('PutObject', [
                'Bucket' => config('filesystems.disks.s3.bucket'),
                'Key' => $filePath,
                'ContentType' => 'application/octet-stream',
            ]);

            $request = $s3Client->createPresignedRequest($cmd, '+20 minutes');
            return  (string) $request->getUri();
        } catch (S3Exception $e) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => $e->getMessage()
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
    }
    public function createGetObjectPresignedURL(Request $request): JsonResponse
    {
        $params = $request->all();
        $preSignedURL = $this->generateUploadUrl($params['file_path']);
        return new JsonResponse(
            [
                'success' => true,
                'url' => $preSignedURL,
            ],
            Response::HTTP_OK
        );
    }

    public function createPutObjectPreSignedURL(Request $request)
    {
        $params = $request->all();
        $fileName = empty($params['file_name']) ? time() : $params['file_name'];
        $uuid = \Illuminate\Support\Str::uuid();
        $filePath = 'upload/tmp' . '/' . $uuid . '/' . $fileName;
        $preSignedURL = $this->generateUploadUrl($filePath);

        return new JsonResponse(
            [
                'success' => true,
                'file_path' => $filePath,
                'pre_signed' => $preSignedURL,
            ],
            Response::HTTP_OK
        );
    }
}
