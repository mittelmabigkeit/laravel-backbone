<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class HomeController extends Controller
{
    public function index()
    {

        $data = [
            'title' => 'Гостевая книга на Laravel',
        ];

        return view ('pages.messages.index', $data);
    }

    public function edit($id){

        $data = [
            'title' => 'Редактирование: Гостевая книга на Laravel',
            'pagetitle' => 'Редактирование: Гостевая книга на Laravel',
        ];

        return view ('pages.messages.edit', $data);
    }
}
