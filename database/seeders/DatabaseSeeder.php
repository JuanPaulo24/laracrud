<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
      //  \App\Models\Job::factory(200) -> create();

      \App\Models\User::factory()->create([
        'first_name' => 'John Paul',
        'last_name' => 'Dela Cruz',
        'email' => 'johndelacruz@gmail.com'
    ]);
        $this->call(JobSeeder::class);


    }
}
