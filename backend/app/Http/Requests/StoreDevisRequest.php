<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDevisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'service'        => 'required|in:debarras,demolition,desamiantage,nettoyage',
            'place'          => 'required|in:appartement,maison,cave,bureau,autre',
            'volume'         => 'nullable|string|max:100',
            'departement'    => 'nullable|string|max:100',
            'date_souhaitee' => 'nullable|date|after_or_equal:today',
            'urgent'         => 'boolean',
            'prenom'         => 'required|string|max:100',
            'nom'            => 'nullable|string|max:100',
            'tel'            => 'required|string|max:20',
            'email'          => 'required|email|max:255',
            'message'        => 'nullable|string|max:3000',
            'captcha' => 'required|string', // ← nouveau

        ];
    }

    public function messages(): array
    {
        return [
            'service.required'        => 'Le type de service est obligatoire.',
            'service.in'              => 'Type de service invalide.',
            'place.required'          => 'Le type de lieu est obligatoire.',
            'place.in'                => 'Type de lieu invalide.',
            'date_souhaitee.after_or_equal' => 'La date doit être aujourd\'hui ou dans le futur.',
            'prenom.required'         => 'Le prénom est obligatoire.',
            'tel.required'            => 'Le téléphone est obligatoire.',
            'email.required'          => 'L\'email est obligatoire.',
            'email.email'             => 'L\'adresse email n\'est pas valide.',
        ];
    }
}
