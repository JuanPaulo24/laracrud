<?php

namespace Database\Factories;

use App\Models\Employer;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->jobTitle();
        $title = substr($title, 0, 50); // Limit the title to 50 characters

        return [
            'title' => $title,
            'employer_id' => Employer::factory(),
            'salary' => '₱' . number_format($this->faker->numberBetween(100, 100000)),
            'image' => 'uploads/jobs/noImage.png', // Generate a static image path
        ];
    }
}
