<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


/**
 * @OA\Schema(
 *      required={"token", "email", "password"},
 *      properties={
 *           @OA\Property(property="token",type="string",format="name",example="GHBFSBDSFJLGNHGNFDGJKSHD..."),
 *           @OA\Property(property="email",type="string", format="email",example="client@example.com"),
 *           @OA\Property(property="password",type="string", format="password",example="password"),
 *      }
 * )
 */

class ResetPasswordRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'max:255'],
            'token' => ['required'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
