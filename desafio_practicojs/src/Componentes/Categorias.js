import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";


const Categorias =()=>{
    const url = 'http://127.0.0.1:8000/api/categorias';
    const url1 ='http://127.0.0.1:8000/api/categorias/create';
    const url2='http://127.0.0.1:8000/api/categorias/delete/';
    const url3 ='http://127.0.0.1:8000/api/categorias/update/';
    const [id, setId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [nombre_categorias, setNombre_categorias] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getCategorias();
    }, []);


    const getCategorias= async () => {
        const respuesta = await axios.get(url);
        setCategorias(respuesta.data);
    }

    const openModal = (op,id,nombre_categorias,descripcion)=>{
        setId('');
        setNombre_categorias('');
        setDescripcion('');
        setOperacion(op);

   if (op === 1){
         setTitle('Registrar Categoria');
   }else if (op ===2){
     setTitle('Editar Categoria');
     setId(id);
     setNombre_categorias(nombre_categorias);
     setDescripcion(descripcion);
   }
    }


    const validar = () => {
        var parametros;
        var metodo;
        if(nombre_categorias.trim() === ''){
            show_alerta('Escribe el nombre de categoria','warning');
        }
        else if(descripcion.trim() === ''){
            show_alerta('Escribe descripcion de categoria','warning');
        }else{
            if(operacion === 1){
                parametros= {nombre_categoria:nombre_categorias.trim(),descripcion:descripcion.trim()};
                metodo= 'POST';
                enviarSolicitud(metodo,parametros);
                getCategorias();
            }
            else{
                parametros={id:id,nombre_categoria:nombre_categorias.trim(),descripcion:descripcion.trim()};
                metodo= 'PUT';
                enviarSolicitud3(metodo,parametros);
                getCategorias();
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
              getCategorias();
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
           getCategorias();
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
              getCategorias();
            }
        })
        .catch(function(error){
            show_alerta('Error en la solicitud','error');
            console.log(error);
        });
    }

    const deleteCategoria= (id,nombre_categorias) =>{
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Estas Seguro de eliminar esta categoria '+nombre_categorias+' ?' + 'con id    '+ id,
            icon: 'question',text:'No se podrá dar marcha atrás',
            showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
        }).then((result) =>{
            if(result.isConfirmed){
                setId(id);
                enviarSolicitud2('DELETE',{id});
                getCategorias();
            }
            else{
                show_alerta('La categoria NO fue eliminada','info');
                getCategorias();
            }
        });
    }

    return (
         <div className='App'>
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div>
                        <button onClick={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalCategorias'>
                            <i className='fa-solid fa-circle-plus'></i> Añadir
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                            <tr><th>Id Categoria</th><th>nombre Categoria</th><th>Descripcion</th></tr>
                            </thead>
                            <tbody className='table-group-divider'>
                            {categorias.map((categoria, i) => (
                                <tr key={categoria.id}>
                                    <td>{categoria.id}</td>
                                    <td>{categoria.nombre_categoria}</td>
                                    <td>{categoria.descripcion}</td>
                                    <td>
                                        <button onClick={() => openModal(2,categoria.id,categoria.nombre_categoria,categoria.descripcion)}className='btn btn-warning'
                                         data-bs-toggle='modal' data-bs-target='#modalCategorias'>
                                            <i className='fa-solid fa-edit'></i>
                                        </button>
                                        &nbsp;
                                        <button className='btn btn-danger' onClick={()=>deleteCategoria(categoria.id,categoria.nombre_categoria)}>
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
        <div id='modalCategorias' className='modal fade' aria-hidden='true'>
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
                            <input type='text' id='nombre_categoria' className='form-control' placeholder='Nombre' value={nombre_categorias}
                            onChange={(e)=> setNombre_categorias(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <div>
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

export default Categorias