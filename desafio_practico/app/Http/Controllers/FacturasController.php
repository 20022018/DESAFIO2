<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\facturas;

class FacturasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $factura = facturas::all();
       return $factura;
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
        $factura = new facturas();
        $factura->fecha_factura = $request->fecha_factura;
        $factura->metodo_pago = $request->metodo_pago;
        $factura->venta_id = $request->venta_id;
        $factura->cliente_id = $request->cliente_id;

        $factura->save();
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
        $factura = facturas::findOrFail ($request->id);
        $factura->fecha_factura = $request->fecha_factura;
        $factura->metodo_pago = $request->metodo_pago;
        $factura->venta_id = $request->venta_id;
        $factura->cliente_id = $request->cliente_id;

        $factura->save();

        return $factura;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(request $request)
    {
        $factura = facturas::destroy($request->id);
        return $factura;
    }
}
