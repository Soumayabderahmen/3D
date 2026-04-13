<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $serviceId = $this->route('service')?->id;

        return [
            'slug'        => ['required', 'string', 'max:100', 'regex:/^[a-z0-9\-]+$/',
                              Rule::unique('services', 'slug')->ignore($serviceId)],
            'title'       => 'required|string|max:150',
            'icon'        => 'nullable|string|max:100',
            'color_hex'   => ['nullable', 'string', 'regex:/^#[0-9A-Fa-f]{3,8}$/'],
            'color'       => 'nullable|string|max:100',
            'badge'       => 'nullable|string|max:100',
            'short_desc'  => 'nullable|string|max:500',
            'long_desc'   => 'nullable|string|max:5000',
            'prestations' => 'nullable|array',
            'prestations.*' => 'string|max:255',
            'order'       => 'nullable|integer|min:0',
            'active'      => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'slug.required'  => 'Le slug est obligatoire.',
            'slug.unique'    => 'Ce slug est déjà utilisé.',
            'slug.regex'     => 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets.',
            'title.required' => 'Le titre est obligatoire.',
            'color_hex.regex'=> 'La couleur doit être un code hexadécimal valide (#RRGGBB).',
        ];
    }
}
