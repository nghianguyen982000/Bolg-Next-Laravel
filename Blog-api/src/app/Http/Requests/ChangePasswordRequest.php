<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


/**
 * @OA\Schema(
 *      required={ "old_password", "new_password"},
 *      properties={
 *           @OA\Property(property="old_password",type="string", format="old_password",example="password123"),
 *           @OA\Property(property="new_password",type="string", format="new_password",example="password"),
 *      }
 * )
 */

class ChangePasswordRequest extends FormRequest
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
            'old_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6',
        ];
    }
}
