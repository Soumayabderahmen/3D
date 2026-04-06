<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'prenom'  => 'required|string|max:100',
            'nom'     => 'nullable|string|max:100',
            'tel'     => 'required|string|max:20',
            'email'   => 'required|email|max:255',
            'sujet'   => 'nullable|string|max:100',
            'message' => 'nullable|string|max:3000',
        ];
    }

    public function messages(): array
    {
        return [
            'prenom.required'  => 'Le prénom est obligatoire.',
            'tel.required'     => 'Le numéro de téléphone est obligatoire.',
            'email.required'   => 'L\'adresse email est obligatoire.',
            'email.email'      => 'L\'adresse email n\'est pas valide.',
        ];
    }
}
