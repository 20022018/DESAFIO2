import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";

const Ventas = ()=>{
    const url = 'http://127.0.0.1:8000/api/ventas';
    const url1 ='http://127.0.0.1:8000/api/ventas/create';
    const url2='http://127.0.0.1:8000/api/ventas/delete/';
    const url3 ='http://127.0.0.1:8000/api/ventas/update/';

    const [ventas, setVentas] = useState([]);
    const [id,setId] = useState('');
    const [fecha_venta,setFechaVenta] = useState('');
    const [cantidad,setCantidad] = useState('');
    const [total_venta,setTotal_Venta] = useState ('');
    const [metodo_pago,setMetodo_Pago] = useState ('');
    const [producto_id,setProductoId] = useState('');
    const [cliente_id,setClienteId] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getVentas();
    }, []);


    const getVentas= async () => {
        const respuesta = await axios.get(url);
        setVentas(respuesta.data);
    }

    const openModal = (op,id,fecha_venta,cantidad,total_venta,metodo_pago,producto_id,cliente_id)=>{
        setId('');
        setFechaVenta('');
        setCantidad('');
        setTotal_Venta('');
        setMetodo_Pago('');
        setClienteId('');
        setProductoId('');
        setOperacion(op);

   if (op === 1){
         setTitle('Registrar Venta');
   }else if (op ===2){
     setTitle('Editar Venta');
     setId(id);
     setFechaVenta(fecha_venta);
     setCantidad(cantidad);
     setTotal_Venta(total_venta);
     setMetodo_Pago(metodo_pago);
     setClienteId(cliente_id);
     setProductoId(producto_id);
   }
    }

    const validar = () => {
        var parametros;
        var metodo;
         if(fecha_venta.trim() === ''){
            show_alerta('Ingresa fecha venta','warning');
        }
        else if(cantidad === ''){
            show_alerta('Ingresa Cantidad','warning');
        }
        else if (total_venta===''){
            show_alerta('Ingrese total venta','warning');
        }
        else if (metodo_pago.trim()===''){
            show_alerta('ingrese Metodo Pago','warning');
        }
        else if (cliente_id===''){
            show_alerta('Escribe id cliente','warning');
        }
        else if (producto_id===''){
            show_alerta('Escribe id producto','warning');
     }else{
            if(operacion === 1){
                parametros= {fecha_venta:fecha_venta.trim(),cantidad:cantidad,total_venta:total_venta,metodo_pago:metodo_pago.trim(),
                    cliente_id:cliente_id,producto_id:producto_id
                };
                metodo= 'POST';
                console.log(parametros);
                enviarSolicitud(metodo,parametros);
            }
            else{
                parametros={id:id,fecha_venta:fecha_venta.trim(),cantidad:cantidad,total_venta:total_venta,metodo_pago:metodo_pago.trim(),
                    cliente_id:cliente_id,producto_id:producto_id};
                metodo= 'PUT';
                enviarSolicitud3(metodo,parametros);
            }
            
        }
    }

    const enviarSolicitud = async(metodo,parametros) => {
        await axios({ method:metodo, url:url1, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj,tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
              getVentas();
            }
        })
        .catch(function(error){
            show_alerta('Error en la solicitud','error');
            console.log(error);
        });
    }

    const enviarSolicitud2 = async(metodo,parametros) => {

        console.log(parametros.id);

        const urlDelete = (url2+parametros.id);
     await axios({ method:metodo, url:urlDelete, data:parametros}).then(function(respuesta){
         var tipo = respuesta.data[0];
         var msj = respuesta.data[1];
         show_alerta(msj,tipo);
         if(tipo === 'success'){
             document.getElementById('btnCerrar').click();
           getVentas();
         }
     })
     .catch(function(error){
         show_alerta('Error en la solicitud','error');
         console.log(error);
     });
 }

 const enviarSolicitud3= async(metodo,parametros) => {

    const urlUpdate = (url3+parametros.id);
    console.log(urlUpdate);
    await axios({ method:metodo, url:urlUpdate, data:parametros}).then(function(respuesta){
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_alerta(msj,tipo);
        if(tipo === 'success'){
            document.getElementById('btnCerrar').click();
          getVentas();
        }
    })
    .catch(function(error){
        show_alerta('Error en la solicitud','error');
        console.log(error);
    });
}
const deleteVentas= (id,fecha_venta) =>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:'¿Estas Seguro de eliminar la venta con fecha'+fecha_venta+' ?' + 'con id    '+ id,
        icon: 'question',text:'No se podrá dar marcha atrás',
        showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result) =>{
        if(result.isConfirmed){
            setId(id);
            enviarSolicitud2('DELETE',{id});
            getVentas();
        }
        else{
            show_alerta('La Venta NO fue eliminada','info');
            getVentas();
        }
    });
}

return (
    <div className='App'>
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-md-4'>
                <div className='d-grid mx-auto'>
                    <button onClick={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalVentas'>
                        <i className='fa-solid fa-circle-plus'></i> Añadir
                    </button>
                </div>
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                        <tr><th>Fecha Venta</th><th>Cantidad Producto</th><th>Total Venta</th><th>Metodo Pago</th>
                        <th>Producto</th><th>Cliente</th>
                        </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                        {ventas.map((venta,i) => (
                            <tr key={venta.id}>
                                <td>{venta.fecha_venta}</td>
                                <td>{venta.cantidad}</td>
                                <td>{venta.total_venta}</td>
                                <td>{venta.metodo_pago}</td>
                                <td>{venta.producto_id}</td> 
                                <td>{venta.cliente_id}</td>                               
                                <td>
                                    <button onClick={() => openModal(2,venta.id,venta.fecha_venta,venta.cantidad,venta.total_venta,
                                    venta.metodo_pago,venta.producto_id,venta.cliente_id
                                    )}className='btn btn-warning'
                                     data-bs-toggle='modal' data-bs-target='#modalVentas'>
                                        <i className='fa-solid fa-edit'></i>
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={()=>deleteVentas(venta.id,venta.fecha_venta)}>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                </td>
                            </tr>
                       ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id='modalVentas' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <label className='h5'>{title}</label>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                    <input type='hidden' id='id'></input>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='date' placeholder='yyyy-mm-dd' id='fecha_venta' className='form-control' value={fecha_venta}
                        onChange={(e)=> setFechaVenta(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='cantidad' className='form-control' placeholder='Cantidad Producto' value={cantidad}
                        onChange={(e)=> setCantidad(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='total_venta' className='form-control' placeholder='total venta' value={total_venta}
                        onChange={(e)=> setTotal_Venta(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='metodo_pago' className='form-control' placeholder='Metodo Pago' value={metodo_pago}
                        onChange={(e)=> setMetodo_Pago(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='producto_id' className='form-control' placeholder='ID PRODUCTO' value={producto_id}
                        onChange={(e)=> setProductoId(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='cliente_id' className='form-control' placeholder='ID CLIENTE' value={cliente_id}
                        onChange={(e)=> setClienteId(e.target.value)}></input>
                    </div>
                    <div className='d-grid col-6 mx-auto'>
                    <button onClick={() => validar()} className='btn btn-success'>
                            <i className='fa-solid fa-floppy-disk'></i> Guardar
                        </button>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
)

}

export default Ventas