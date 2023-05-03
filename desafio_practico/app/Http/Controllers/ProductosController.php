<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\productos;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $producto = productos::all();
       return $producto;
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
    $producto = new productos();
    $producto->codigo_producto = $request->codigo_producto;
    $producto->nombre_producto =$request->nombre_producto;
    $producto->descripcion = $request->descripcion;
    $producto->imagen_producto = $request->imagen_producto;
    $producto->existencias = $request->existencias;
    $producto->precio = $request->precio;
    $producto->categoria_id = $request->categoria_id;

    $producto->save();
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

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
    $producto = productos::findOrFail ($request->id);
    $producto->codigo_producto = $request->codigo_producto;
    $producto->nombre_producto =$request->nombre_producto;
    $producto->descripcion = $request->descripcion;
    $producto->imagen_producto = $request->imagen_producto;
    $producto->existencias = $request->existencias;
    $producto->precio = $request->precio;
    $producto->categoria_id = $request->categoria_id;

    $producto->save();

    return $producto;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(request $request)
    {
        $producto = productos::destroy($request->id);
        return $producto;
    }
}
