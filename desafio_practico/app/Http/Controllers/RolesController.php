<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\roles;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rol = roles::all();
        return $rol;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rol = new roles();
        $rol->rol = $request->rol;
        $rol->descripcion = $request->descripcion;

        $rol->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rol = roles::findOrFail ($request->id);
        $rol->rol = $request->rol;
        $rol->descripcion = $request->descripcion;

        $rol->save();

        return $rol;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(request $request)
    {
        $rol = roles::destroy($request->id);
        return $rol;
    }
}
