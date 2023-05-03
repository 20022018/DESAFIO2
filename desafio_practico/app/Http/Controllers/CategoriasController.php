<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\categorias;

class CategoriasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoria = categorias::all();
        return $categoria;
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
        $categoria = new categorias();
        $categoria->nombre_categoria = $request->nombre_categoria;
        $categoria->descripcion = $request->descripcion;

        $categoria->save();
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
        $categoria = categorias::findOrFail ($request->id);
        $categoria->nombre_categoria = $request->nombre_categoria;
        $categoria->descripcion = $request->descripcion;

        $categoria->save();

        return $categoria;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(request $request)
    {
        $categoria = categorias::destroy($request->id);
        return $categoria;
    }
}
