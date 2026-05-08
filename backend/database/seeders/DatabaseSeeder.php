<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([AdminSeeder::class,
         ChatbotConfigSeeder::class,
         ServicesSeeder::class,
         SubServicesSeeder::class,
        ZoneSeeder::class,]);
    }
}
