<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;

    protected $table = 'employers';
    protected $guarded = [];
    public function jobs() {
        /*To test it using php artisan tinker you can try assign $employer = App\Models\Employer::first(); , then  $employer->jobs to show their relationship.

        To access first job again, you can use the command $employer->jobs[0];
        */
        return $this->hasMany(Job::class);
    }

}
