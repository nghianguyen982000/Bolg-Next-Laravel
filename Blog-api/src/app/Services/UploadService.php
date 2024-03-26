<?php

namespace App\Services;

use Aws\Credentials\Credentials;
use Aws\S3\S3Client;
use Illuminate\Support\Facades\Log;

class UploadService implements UploadServiceInterface
{
    public function getPreSigned(string $filePath, string $method = 'PutObject'): ?string
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
            $cmd = $s3Client->getCommand($method, [
                'Bucket' => config('filesystems.disks.s3.bucket'),
                'Key' => $filePath,
                'ContentType' => 'application/octet-stream',
            ]);

            $request = $s3Client->createPresignedRequest($cmd, '+20 minutes');
            return  (string) $request->getUri();
        } catch (\Exception $e) {
            Log::error('getPreSigned s3 error', [
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }
}
