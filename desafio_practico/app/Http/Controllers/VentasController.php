<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ventas;

class VentasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $venta= ventas::all();
        return $venta;
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
        $venta = new ventas();
        $venta->fecha_venta = $request->fecha_venta;
        $venta->cantidad = $request->cantidad;
        $venta->total_venta = $request->total_venta;
        $venta->metodo_pago = $request->metodo_pago;
        $venta->producto_id = $request->producto_id;
        $venta->cliente_id = $request->cliente_id;

        $venta->save();
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
        $venta = ventas::findOrFail ($request->id);
        $venta->fecha_venta = $request->fecha_venta;
        $venta->cantidad = $request->cantidad;
        $venta->total_venta = $request->total_venta;
        $venta->metodo_pago = $request->metodo_pago;
        $venta->producto_id = $request->producto_id;
        $venta->cliente_id = $request->cliente_id;

        $venta->save();
        return $venta;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(request $request)
    {
        $venta = ventas::destroy($request->id);
        return $venta;
    }
}
