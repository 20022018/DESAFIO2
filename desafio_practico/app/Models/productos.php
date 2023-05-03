<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class productos extends Model
{
    use HasFactory;

    protected $fillable = ['codigo_producto', 'nombre_producto','descripcion', 'imagen_producto',
    'existencias','precio','categoria_id'];
}
