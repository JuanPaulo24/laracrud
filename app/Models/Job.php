<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
//If you have a Table named comments, your eloquent model should be named Comment.
// You can test using Tinker in Creation:  App\Models\Job::create(['title' =>  'Acme  Director', 'salary' => '$50,000,000']);
// In Finding using Tinker command: App\Models\Job::find(5);
// To delete job if its only one row, you can use example: App\Models\Job::delete;
class Job extends Model {
    use HasFactory, SoftDeletes;


    protected $table = 'job_listings';
    // protected $fillable = ['employer_id','title', 'salary'];
    protected $guarded = [];



    public function employer() {
        /*To test it using php artisan tinker you can try assign $job = App\Models\Job::first(), then $job-> employer or $job -> employer -> name to show their relationship. */
        return $this->belongsTo(Employer::class);
    }

}
