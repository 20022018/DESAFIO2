<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return "hola prueba 1";
});

Route::get('/clientes','App\Http\Controllers\ClientesController@index');
Route::post('/clientes/create','App\Http\Controllers\ClientesController@store');
Route::put('/clientes/update/{id}','App\Http\Controllers\ClientesController@update');
Route::delete('/clientes/delete/{id}','App\Http\Controllers\ClientesController@destroy');

Route::get('/categorias','App\Http\Controllers\CategoriasController@index');
Route::post('/categorias/create','App\Http\Controllers\CategoriasController@store');
Route::put('/categorias/update/{id}','App\Http\Controllers\CategoriasController@update');
Route::delete('/categorias/delete/{id}','App\Http\Controllers\CategoriasController@destroy');

Route::get('/roles','App\Http\Controllers\RolesController@index');
Route::post('/roles/create','App\Http\Controllers\RolesController@store');
Route::put('/roles/update/{id}','App\Http\Controllers\RolesController@update');
Route::delete('/roles/delete/{id}','App\Http\Controllers\RolesController@destroy');

Route::get('/usuarios','App\Http\Controllers\UsuarioController@index');
Route::post('/usuarios/create','App\Http\Controllers\UsuarioController@store');
Route::put('/usuarios/update/{id}','App\Http\Controllers\UsuarioController@update');
Route::delete('/usuarios/delete/{id}','App\Http\Controllers\UsuarioController@destroy');

Route::get('/productos','App\Http\Controllers\ProductosController@index');
Route::post('/productos/create','App\Http\Controllers\ProductosController@store');
Route::put('/productos/update/{id}','App\Http\Controllers\ProductosController@update');
Route::delete('/productos/delete/{id}','App\Http\Controllers\ProductosController@destroy');

Route::get('/ventas','App\Http\Controllers\VentasController@index');
Route::post('/ventas/create','App\Http\Controllers\VentasController@store');
Route::put('/ventas/update/{id}','App\Http\Controllers\VentasController@update');
Route::delete('/ventas/delete/{id}','App\Http\Controllers\VentasController@destroy');

Route::get('/facturas','App\Http\Controllers\FacturasController@index');
Route::post('/facturas/create','App\Http\Controllers\FacturasController@store');
Route::put('/facturas/update/{id}','App\Http\Controllers\FacturasController@update');
Route::delete('/facturas/delete/{id}','App\Http\Controllers\FacturasController@destroy');