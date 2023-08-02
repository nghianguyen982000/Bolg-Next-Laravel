<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


/**
 * @OA\Schema(
 *      properties={
 *           @OA\Property(property="name",type="string",format="name",example="client"),
 *           @OA\Property(property="email",type="string",format="email",example="client@example.com"),
 *           @OA\Property(property="password",type="string",format="password",example="password"),
 *      }
 * )
 */

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ];
    }
}
