<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActualiteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'        => 'required|string|max:255',
'service_id' => 'required|exists:services,id',            'date'         => 'required|date',
            'location'     => 'nullable|string|max:255',
            'description'  => 'nullable|string|max:5000',
            'image_before' => 'nullable|string|max:1000',
            'image_after'  => 'nullable|string|max:1000',
            'published'    => 'nullable|boolean',
            'order'        => 'nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'    => 'Le titre est obligatoire.',
   'service_id.required' => 'Le service est obligatoire.',
            'service_id.exists'   => 'Le service sélectionné est invalide.',            'date.required'     => 'La date est obligatoire.',
            'date.date'         => 'La date n\'est pas valide.',
        ];
    }
}
