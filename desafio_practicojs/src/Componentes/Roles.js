import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";



const Roles =()=>{

    const url = 'http://127.0.0.1:8000/api/roles';
    const url1 ='http://127.0.0.1:8000/api/roles/create';
    const url2='http://127.0.0.1:8000/api/roles/delete/';
    const url3 ='http://127.0.0.1:8000/api/roles/update/';
    const [id, setId] = useState('');
    const [roles, setRoles] = useState([]);
    const [rol, setRol] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [title, setTitle] = useState('');


    useEffect(() => {
        getRoles();
    }, []);

    const getRoles= async () => {
        const respuesta = await axios.get(url);
        setRoles(respuesta.data);
    }

    const openModal = (op,id,rol,descripcion)=>{
        setId('');
        setRol('');
        setDescripcion('');
        setOperacion(op);

   if (op === 1){
         setTitle('Registrar Rol');
   }else if (op ===2){
     setTitle('Editar Rol');
     setId(id);
     setRol(rol);
     setDescripcion(descripcion);
   }
    }

    const validar = () => {
        var parametros;
        var metodo;
        if(rol.trim() === ''){
            show_alerta('Escribe el Rol','warning');
        }
        else if(descripcion.trim() === ''){
            show_alerta('Escribe descripcion','warning');
        }
        else{
            if(operacion === 1){
                parametros= {rol:rol.trim(),descripcion:descripcion.trim()};
                metodo= 'POST';
                enviarSolicitud(metodo,parametros);
            }
            else{
                parametros={id:id,rol:rol.trim(),descripcion:descripcion.trim()};
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
              getRoles();
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
           getRoles();
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
          getRoles();
        }
    })
    .catch(function(error){
        show_alerta('Error en la solicitud','error');
        console.log(error);
    });
}

const deleteRoles= (id,rol) =>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:'¿Estas Seguro de eliminar el Rol '+rol+' ?' + 'con id    '+ id,
        icon: 'question',text:'No se podrá dar marcha atrás',
        showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result) =>{
        if(result.isConfirmed){
            setId(id);
            enviarSolicitud2('DELETE',{id});
            getRoles();
        }
        else{
            show_alerta('El Rol NO fue eliminado','info');
            getRoles();
        }
    });
}

return (
    <div className='App'>
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-md-4'>
                <div className='d-grid mx-auto'>
                    <button onClick={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalRoles'>
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
                        <tr><th>Id Rol</th><th>Rol</th><th>descripcion</th></tr>
                        </thead>
                        <tbody className='table-group-divider'>
                        {roles.map((rol, i) => (
                            <tr key={rol.id}>
                                <td>{rol.id}</td>
                                <td>{rol.rol}</td>
                                <td>{rol.descripcion}</td>
                                <td>
                                    <button onClick={() => openModal(2,rol.id,rol.rol,rol.descripcion)}className='btn btn-warning'
                                     data-bs-toggle='modal' data-bs-target='#modalRoles'>
                                        <i className='fa-solid fa-edit'></i>
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={()=>deleteRoles(rol.id,rol.rol)}>
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
    <div id='modalRoles' className='modal fade' aria-hidden='true'>
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
                        <input type='text' id='rol' className='form-control' placeholder='ROL' value={rol}
                        onChange={(e)=> setRol(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion}
                        onChange={(e)=> setDescripcion(e.target.value)}></input>
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
      export default Roles