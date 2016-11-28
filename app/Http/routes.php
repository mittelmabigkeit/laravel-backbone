<?php
use App\Http\Controllers;

//Route::get('/', 'PostController@index');

Route::get('/', ['as' => 'test', 'uses' => 'PostController@index']);

//Route::get('/tasks', function () {
  //  return json_encode(app\Models\Mission::all() );
//});

?>