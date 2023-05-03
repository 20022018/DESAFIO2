<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class clientes extends Model
{
    use HasFactory;

    protected $fillable = ['codigo_cliente', 'nombre', 'apellido','telefono','email','DUI','user','password'];
}
