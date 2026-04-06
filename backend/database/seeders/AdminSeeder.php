<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $user = User::factory()->create([

            'name' => 'oumaima jlidi',
            'email' => 'jlidioumaima01@gmail.com',
            'password' => bcrypt('+-3dservices+-'),
        ]);
    }
}
