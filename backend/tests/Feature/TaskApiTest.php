<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    private $user;
    private $token;

    public function setUp(): void
    {
        parent::setUp();

        // Migrate the database
        Artisan::call('migrate');
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('auth-token')->plainTextToken;
    }

    /** @test */
    public function unauthenticated_user_cannot_list_tasks()
    {
        Task::factory(3)->create();
        $response = $this->getJson(route('tasks.index'));

        $response->assertStatus(401);
    }

    /** @test */
    public function it_can_list_all_tasks()
    {
        Task::factory(3)->create();
        $response = $this->getWithHeaders()->getJson(route('tasks.index'));

        $response->assertStatus(200)->assertJsonCount(3);
    }

    /** @test */
    public function it_can_show_a_single_task()
    {
        $task = Task::factory()->create();

        $response = $this->getWithHeaders()->getJson(route('tasks.show', ['task' => $task->id]));

        $response->assertStatus(200)
            ->assertJson([
                    'title' => $task->title,
                    'description' => $task->description,
                ]);
    }

    /** @test */
    public function it_can_create_a_task()
    {
        $taskData = [
            'title' => 'New Task',
            'description' => 'Task Description',
        ];

        $response = $this->getWithHeaders()->postJson(route('tasks.store'), $taskData);

        $response->assertStatus(201)
            ->assertJson($taskData);

        $this->assertDatabaseHas('tasks', $taskData);
    }

    /** @test */
    public function it_can_update_a_task()
    {
        $task = Task::factory()->create();

        $updatedData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
        ];

        $response = $this->getWithHeaders()->putJson(route('tasks.update', ['task' => $task->id]), $updatedData);

        $response->assertStatus(200)
            ->assertJson($updatedData);

        $this->assertDatabaseHas('tasks', $updatedData);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->getWithHeaders()->deleteJson(route('tasks.destroy', ['task' => $task->id]));

        $response->assertStatus(204);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    private function getWithHeaders(){
        return $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ]);
    }
}
