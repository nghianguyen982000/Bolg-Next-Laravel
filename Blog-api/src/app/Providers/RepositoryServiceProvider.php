<?php

namespace App\Providers;


class RepositoryServiceProvider extends AppServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->bind(\App\Repositories\ConversationRepository::class, \App\Repositories\ConversationRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\MessageRepository::class, \App\Repositories\MessageRepositoryEloquent::class);
        //:end-bindings:
    }
}
