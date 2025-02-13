<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // For OAuth grant tokens
        Passport::tokensExpireIn(now()->addMinutes(3));

        // For personal access tokens (the $user->createToken('mytoken') type)
        Passport::personalAccessTokensExpireIn(now()->addMinutes(3));

        // (Optional) For refresh tokens
        Passport::refreshTokensExpireIn(now()->addDays(30));
    }
}
