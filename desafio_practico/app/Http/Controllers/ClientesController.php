<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\clientes;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = clientes::all();
        return $clientes;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $clientes = new Clientes();
        $clientes->codigo_cliente = $request->codigo_cliente;
        $clientes->nombre = $request->nombre;
        $clientes->apellido = $request->apellido;
        $clientes->telefono = $request->telefono;
        $clientes->email = $request->email;
        $clientes->DUI = $request->DUI;
        $clientes->user = $request->user;
        $clientes->password = $request->password;

        $clientes->save();
    
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
        
       $clientes = Clientes::findOrFail ($request->id);
       $clientes->codigo_cliente = $request->codigo_cliente;
        $clientes->nombre = $request->nombre;
        $clientes->apellido = $request->apellido;
        $clientes->telefono = $request->telefono;
        $clientes->email = $request->email;
        $clientes->DUI = $request->DUI;
        $clientes->user = $request->user;
        $clientes->password = $request->password;

        $clientes->save();
        
        return $clientes;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(request $request)
    {
        
        $clientes = Clientes::destroy($request->id);
        return $clientes;
    }
}
