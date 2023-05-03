import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";


const Productos = ()=>{

    const url = 'http://127.0.0.1:8000/api/productos';
    const url1 ='http://127.0.0.1:8000/api/productos/create';
    const url2='http://127.0.0.1:8000/api/productos/delete/';
    const url3 ='http://127.0.0.1:8000/api/productos/update/';

    const [productos, setProductos] = useState([]);
    const [codigo_producto,setcodigo_producto] = useState('');
    const [id,setId]=useState('');
    const [nombre_producto,setnombre_producto] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [existencias,setExistencias] = useState('');
    const [precio,setPrecio] = useState('');
    const [categoria_id,setcategoria_id] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [title, setTitle] = useState('');


    useEffect(() => {
        getProductos();
    }, []);


    const getProductos= async () => {
        const respuesta = await axios.get(url);
        setProductos(respuesta.data);
    }

    const openModal = (op,id,codigo_producto,nombre_producto,descripcion,existencias,precio,categoria_id)=>{
        setId('');
        setcodigo_producto('');
        setnombre_producto('');
        setDescripcion('');
        setExistencias('');
        setPrecio('');
        setcategoria_id('');
        setOperacion(op);

   if (op === 1){
         setTitle('Registrar Producto');
   }else if (op ===2){
     setTitle('Editar Producto');
     setId(id);
     setcodigo_producto(codigo_producto);
        setnombre_producto(nombre_producto);
        setDescripcion(descripcion);
        setExistencias(existencias);
        setPrecio(precio);
        setcategoria_id(categoria_id);
   }
    }



    const validar = () => {
        var parametros;
        var metodo;
         if(codigo_producto.trim() === ''){
            show_alerta('Ingresa codigo producto','warning');
        }
        else if(nombre_producto.trim() === ''){
            show_alerta('Escribe Nombre de producto','warning');
        }
        else if (descripcion.trim()===''){
            show_alerta('Ingrese descripcion','warning');
        }
        else if (existencias===''){
            show_alerta('Ingrese numero de existencias','warning');
        }
        else if (precio===''){
            show_alerta('Ingrese precio','warning');
        }
        else if (categoria_id===''){
            show_alerta('Ingrese Id de categoria','warning');
        
     }else{
            if(operacion === 1){
                parametros= {codigo_producto:codigo_producto.trim(),nombre_producto:nombre_producto.trim(),descripcion:descripcion.trim(),
                existencias:existencias,precio:precio,categoria_id:categoria_id};
                metodo= 'POST';
                console.log(parametros);
                enviarSolicitud(metodo,parametros);
            }
            else{
                parametros={id:id,codigo_producto:codigo_producto.trim(),nombre_producto:nombre_producto.trim(),descripcion:descripcion.trim(),
                    existencias:existencias,precio:precio,categoria_id:categoria_id};
                    console.log(parametros);
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
              getProductos();
            }
        })
        .catch(function(error){
            show_alerta('Error en la solicitud','error');
            console.log(error);
        });
    }


    const enviarSolicitud2 = async(metodo,parametros) => {

        const urlDelete = (url2+parametros.id);
     await axios({ method:metodo, url:urlDelete, data:parametros}).then(function(respuesta){
         var tipo = respuesta.data[0];
         var msj = respuesta.data[1];
         show_alerta(msj,tipo);
         if(tipo === 'success'){
             document.getElementById('btnCerrar').click();
           getProductos();
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
          getProductos();
        }
    })
    .catch(function(error){
        show_alerta('Error en la solicitud','error');
        console.log(error);
    });
}

const deleteProductos= (id,nombre_producto) =>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:'¿Estas Seguro de eliminar el producto'+nombre_producto+' ?' + 'con id    '+ id,
        icon: 'question',text:'No se podrá dar marcha atrás',
        showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result) =>{
        if(result.isConfirmed){
            setId(id);
            enviarSolicitud2('DELETE',{id});
            getProductos();
        }
        else{
            show_alerta('El producto no fue eliminado','info');
            getProductos();
        }
    });
}

return (
    <div className='App'>
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-md-4'>
                <div className='d-grid mx-auto'>
                    <button onClick={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProductos'>
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
                        <tr><th>codigo producto</th><th>nombre producto</th><th>descripcion</th><th>existencias</th>
                        <th>precio</th><th>categoria</th>
                        </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                        {productos.map((producto,i) => (
                            <tr key={producto.id}>
                                <td>{producto.codigo_producto}</td>
                                <td>{producto.nombre_producto}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.existencias}</td>  
                                <td>{producto.precio}</td>
                                <td>{producto.categoria_id}</td>                            
                                <td>
                                    <button onClick={() => openModal(2,producto.id,producto.codigo_producto,producto.nombre_producto
                                    ,producto.descripcion,producto.existencias,producto.precio,producto.categoria_id
                                    )}className='btn btn-warning'
                                     data-bs-toggle='modal' data-bs-target='#modalProductos'>
                                        <i className='fa-solid fa-edit'></i>
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={()=>deleteProductos(producto.id,producto.nombre_producto)}>
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
    <div id='modalProductos' className='modal fade' aria-hidden='true'>
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
                        <input type='text' id='codigo_producto' className='form-control' placeholder='Codigo Producto' value={codigo_producto}
                        onChange={(e)=> setcodigo_producto(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='nombre_producto' className='form-control' placeholder='Nombre Producto' value={nombre_producto}
                        onChange={(e)=> setnombre_producto(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion}
                        onChange={(e)=> setDescripcion(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='existencias' className='form-control' placeholder='Existencias' value={existencias}
                        onChange={(e)=> setExistencias(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='precio' className='form-control' placeholder='Precio' value={precio}
                        onChange={(e)=> setPrecio(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='categoria_id' className='form-control' placeholder='categoria' value={categoria_id}
                        onChange={(e)=> setcategoria_id(e.target.value)}></input>
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

export default Productos