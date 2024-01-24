<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


/**
 * @OA\Info(title="API BLOG", version="1.0")
 * @OA\Server(url="http://localhost:8080")
 * @OA\SecurityScheme(
 *      securityScheme="AdminBearerAuth",
 *      description="Use /auth get to token",
 *      type="http",
 *      name="Authorization",
 *      scheme="Bearer",
 *      bearerFormat="JWT"
 * ),
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
