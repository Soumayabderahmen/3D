<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSubServiceRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $subId     = $this->route('subService')?->id;
        $serviceId = $this->input('service_id') ?? $this->route('subService')?->service_id;

        return [
            'service_id'    => 'required|exists:services,id',
            'slug'          => ['required', 'string', 'max:100', 'regex:/^[a-z0-9\-]+$/',
                                Rule::unique('sub_services')->where('service_id', $serviceId)->ignore($subId)],
            'title'         => 'required|string|max:150',
            'icon'          => 'nullable|string|max:20',
            'desc'          => 'nullable|string|max:500',
            'long_desc'     => 'nullable|string|max:5000',
            'image'         => 'nullable|string|max:1000',
            'prestations'   => 'nullable|array',
            'prestations.*' => 'string|max:255',
            'sections'      => 'nullable|array',
            'sections.*.title' => 'nullable|string|max:255',
            'sections.*.text'  => 'nullable|string|max:3000',
            'order'         => 'nullable|integer|min:0',
            'active'        => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'service_id.required' => 'Le service parent est obligatoire.',
            'service_id.exists'   => 'Ce service n\'existe pas.',
            'slug.required'       => 'Le slug est obligatoire.',
            'slug.unique'         => 'Ce slug est déjà utilisé pour ce service.',
            'slug.regex'          => 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets.',
            'title.required'      => 'Le titre est obligatoire.',
        ];
    }
}
