<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        //$this->call(UsersTableSeeder::class);
        $this->call('PostsSeeder');
    }
}

class PostsSeeder extends Seeder {

    public function run()
    {
        DB::table('Posts')->delete();
        Post::create([
            'title' => 'First Post',
            'slug' => 'first-post',
            'excerpt' => '<b>First Post body</b>',
            'content' => '<b>Content First Post body</b>',
            'published' => true,
            //'published_at' => DB::raw('NOW()'), //for DateTime
            'published_at' => DB::raw('CURRENT_TIMESTAMP'), //for timestamp
        ]);

        Post::create([
            'title' => 'Second Post',
            'slug' => 'second-post',
            'excerpt' => '<b>Second Post body</b>',
            'content' => '<b>Content Second Post body</b>',
            'published' => false,
            'published_at' => DB::raw('CURRENT_TIMESTAMP'),
        ]);

        Post::create([
            'title' => 'Third Post',
            'slug' => 'third-post',
            'excerpt' => '<b>Third Post body</b>',
            'content' => '<b>Content Third Post body</b>',
            'published' => false,
            'published_at' => DB::raw('CURRENT_TIMESTAMP'),
        ]);
    }
}
