<?php

namespace App\Services;

interface UploadServiceInterface
{
    public function getPreSigned(string $filePath, string $method = 'PutObject'): ?string;
}
