<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


/**
 * @OA\Schema(
 *      required={"token", "email"},
 *      properties={
 *           @OA\Property(property="token",type="string",format="token",example="123456"),
 *           @OA\Property(property="email",type="string", format="email",example="client@example.com")
 *      }
 * )
 */

class EmailVerifyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'token' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255'],
        ];
    }
}
