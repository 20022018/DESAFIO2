import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";


const Facturas = ()=>{
    const url = 'http://127.0.0.1:8000/api/facturas';
    const url1 ='http://127.0.0.1:8000/api/facturas/create';
    const url2='http://127.0.0.1:8000/api/facturas/delete/';
    const url3 ='http://127.0.0.1:8000/api/facturas/update/';
    const [facturas, setFacturas] = useState([]);
    const [id, setId] = useState('');
    const [fecha_factura , setfechaFactura] = useState('');
    const [metodo_pago,setmetodoPago] = useState('');
    const [venta_id,setventaId] = useState('');
    const [cliente_id,setclienteId] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [title, setTitle] = useState('');


    useEffect(() => {
        getFacturas();
    }, []);


    const getFacturas= async () => {
        const respuesta = await axios.get(url);
        setFacturas(respuesta.data);
    }

    const openModal = (op,id,fecha_factura,metodo_pago,venta_id,cliente_id)=>{
        setId('');
        setfechaFactura('');
        setmetodoPago('');
        setventaId('');
        setclienteId('');
        setOperacion(op);

   if (op === 1){
         setTitle('Registrar Factura');
   }else if (op ===2){
     setTitle('Editar Factura');
     setId(id);
     setfechaFactura(fecha_factura);
     setmetodoPago(metodo_pago);
     setventaId(venta_id);
     setclienteId(cliente_id);
   }
    }

    const validar = () => {
        var parametros;
        var metodo;
         if(fecha_factura.trim() === ''){
            show_alerta('Ingresa fecha factura','warning');
        }
        else if(metodo_pago.trim() === ''){
            show_alerta('Escribe Metodo Pago','warning');
        }
        else if (venta_id===''){
            show_alerta('Escribe id venta','warning');
        }
        else if (cliente_id===''){
            show_alerta('Escribe id cliente','warning');
     }else{
            if(operacion === 1){
                parametros= {fecha_factura:fecha_factura.trim(),metodo_pago:metodo_pago.trim(),venta_id:venta_id,cliente_id:cliente_id};
                metodo= 'POST';
                console.log(parametros);
                enviarSolicitud(metodo,parametros);
            }
            else{
                parametros={id:id,fecha_factura:fecha_factura.trim(),metodo_pago:metodo_pago.trim(),venta_id:venta_id,cliente_id:cliente_id};
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
              getFacturas();
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
           getFacturas();
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
          getFacturas();
        }
    })
    .catch(function(error){
        show_alerta('Error en la solicitud','error');
        console.log(error);
    });
}

const deleteFacturas= (id,nombre) =>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:'¿Estas Seguro de eliminar la Factura con fecha'+fecha_factura+' ?' + 'con id    '+ id,
        icon: 'question',text:'No se podrá dar marcha atrás',
        showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result) =>{
        if(result.isConfirmed){
            setId(id);
            enviarSolicitud2('DELETE',{id});
            getFacturas();
        }
        else{
            show_alerta('La factura NO fue eliminada','info');
            getFacturas();
        }
    });
}

return (
    <div className='App'>
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-md-4'>
                <div className='d-grid mx-auto'>
                    <button onClick={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalFacturas'>
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
                        <tr><th>Fecha de factura</th><th>Metodo de pago</th><th>VENTA</th><th>CLIENTE</th>
                        </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                        {facturas.map((factura,i) => (
                            <tr key={factura.id}>
                                <td>{factura.fecha_factura}</td>
                                <td>{factura.metodo_pago}</td>
                                <td>{factura.venta_id}</td>
                                <td>{factura.cliente_id}</td>                              
                                <td>
                                    <button onClick={() => openModal(2,factura.id,factura.fecha_factura,factura.metodo_pago,
                                    factura.venta_id,factura.cliente_id
                                    )}className='btn btn-warning'
                                     data-bs-toggle='modal' data-bs-target='#modalFacturas'>
                                        <i className='fa-solid fa-edit'></i>
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={()=>deleteFacturas(factura.id,factura.fecha_factura)}>
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
    <div id='modalFacturas' className='modal fade' aria-hidden='true'>
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
                        <input type='date' placeholder='yyyy-mm-dd' id='fecha_factura' className='form-control' value={fecha_factura}
                        onChange={(e)=> setfechaFactura(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='metodo_pago' className='form-control' placeholder='metodo de Pago' value={metodo_pago}
                        onChange={(e)=> setmetodoPago(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='venta_id' className='form-control' placeholder='ID VENTA' value={venta_id}
                        onChange={(e)=> setventaId(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='cliente_id' className='form-control' placeholder='ID CLIENTE' value={cliente_id}
                        onChange={(e)=> setclienteId(e.target.value)}></input>
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

export default Facturas