<?php

namespace App\Http\Controllers;

use App\Mail\JobPosted;
use Illuminate\Http\Request;
use App\Models\Job;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $jobs = Job::with('employer')->latest()->get();

        return response()->json([
            'jobs' => $jobs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        try {
            $validated = request()->validate([
                'title' => ['required', 'min:3'],
                'salary' => ['required', 'min:2'],
                'employer_id' => ['required'],
                'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,svg,webp', 'max:20000']
            ]);

            $imagePath = null;
            if (request()->hasFile('image')) {
                $imagePath = request()->file('image')->store('jobs', 'public');
            }

            $job = Job::create([
                'title' => $validated['title'],
                'salary' => $validated['salary'],
                'employer_id' => $validated['employer_id'],
                'image' => $imagePath
            ]);

//            Mail::to('juan@gmail.com')->queue(          //instead of send we can use queue, and make sure you use php artisan queue work
//                new JobPosted($job)
//            );

            Mail::to('juan@gmail.com')->send(new JobPosted($job));

            return response()->json([
                'message' => 'Job created successfully',
                'job' => $job
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server Error: ' . $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Job $job)
    {
        $job->load('employer');
        return response()->json([
            'job' => $job,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Job $job)
    {
        request()->validate([
            'title'  => ['required', 'min:3'],
            'salary' => ['required'],
            'employer_id' => ['exists:employers,id']
        ]);

        $job->update([
            'title'  => request('title'),
            'salary' => request('salary'),
            'employer_id' => request('employer_id')
        ]);

        return response()->json([
            'message' => 'Job updated successfully!',
            'job'     => $job->load('employer')
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return void
     */

    public function destroy(Job $job)
    {
        $job->delete();
    }
}
