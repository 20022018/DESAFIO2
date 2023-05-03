<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ventas extends Model
{
    use HasFactory;
    protected $fillable = ['fecha_venta', 'cantidad', 'total_venta','metodo_pago','producto_id','cliente_id'];
}
