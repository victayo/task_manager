<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $day = fake()->numberBetween(1, 120);
        $start = now()->subDays($day)->toDateTime();
        $now = now()->toDateTime();
        $startDate = fake()->dateTimeBetween($start, $now);
        $endDate = fake()->dateTimeBetween($startDate, $now);
        return [
            "title" => fake()->word(),
            "description" => fake()->text(),
            "start_date" => $startDate,
            "end_date" => $endDate
        ];
    }
}
