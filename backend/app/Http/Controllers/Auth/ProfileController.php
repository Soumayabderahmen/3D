<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    // GET /api/profile
    public function show(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

    // PUT /api/profile
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email,' . $user->id,
            'phone'        => 'nullable|string|max:20',
            'address'      => 'nullable|string|max:255',
            'role'         => 'nullable|string|max:100',
            'company_name' => 'nullable|string|max:255',
            'siret'        => 'nullable|string|max:50',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user'    => $user->fresh(),
        ]);
    }

    // POST /api/profile/avatar
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $user = $request->user();

        // Supprimer l'ancien avatar
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->update(['avatar' => $path]);

        return response()->json([
            'message'    => 'Avatar mis à jour',
            'avatar_url' => $user->fresh()->avatar_url,
        ]);
    }

    // PUT /api/profile/password
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password'         => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Le mot de passe actuel est incorrect.'],
            ]);
        }

        $user->update(['password' => Hash::make($request->password)]);

        return response()->json(['message' => 'Mot de passe modifié avec succès']);
    }
}
