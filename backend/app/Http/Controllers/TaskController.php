<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function show($task)
    {
        $task = Task::where('id', $task)->first();
        if($task){
            return $task;
        }
        return $this->taskNotFound();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date'
        ]);

        $task = Task::create($validatedData);

        return response()->json($task, 201);
    }

    public function update(Request $request, $task)
    {
        $task = Task::where('id', $task)->first();
        if(!$task){
            return $this->taskNotFound();
        }

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date'
        ]);

        $task->update($validatedData);

        return response()->json($task, 200);
    }

    public function destroy($task)
    {
        $task = Task::where('id', $task)->first();
        if(!$task){
            return $this->taskNotFound();
        }
        $task->delete();

        return response()->json(null, 204);
    }

    private function taskNotFound(){
        return response()->json([
            "error" => ["message" => "Task Not Found"]
        ], 404);
    }
}
