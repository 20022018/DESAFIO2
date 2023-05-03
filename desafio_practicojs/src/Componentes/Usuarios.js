import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";



const Usuarios =()=>{

    const url = 'http://127.0.0.1:8000/api/usuarios';
    const url1 ='http://127.0.0.1:8000/api/usuarios/create';
    const url2='http://127.0.0.1:8000/api/usuarios/delete/';
    const url3 ='http://127.0.0.1:8000/api/usuarios/update/';
    const [usuarios, setUsuarios] = useState([]);
    const [id, setId] = useState('');
    const [nombre,setNombre] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [password,setPassword] = useState('');
    const [rol_id,setRol_id] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [title, setTitle] = useState('');

useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios= async () => {
        const respuesta = await axios.get(url);
        setUsuarios(respuesta.data);
    }

    const openModal = (op,id,nombre,descripcion,password,rol_id)=>{
        setId('');
        setNombre('');
        setDescripcion('');
        setPassword('');
        setRol_id('');
        setOperacion(op);

   if (op === 1){
         setTitle('Registrar Usuario');
   }else if (op ===2){
     setTitle('Editar Usuario');
     setId(id);
     setNombre(nombre);
     setPassword(password);
     setDescripcion(descripcion);
     setRol_id(rol_id);
   }
    }


    const validar = () => {
        var parametros;
        var metodo;
        if(nombre.trim() === ''){
            show_alerta('Escribe el nombre del usuario','warning');
        }
        else if(descripcion.trim() === ''){
            show_alerta('Escribe descripcion del usuario','warning');
        }
        else if(rol_id=== ''){
            show_alerta('Selecciona el rol del id','warning');
        }
        else{
            if(operacion === 1){
                parametros= {nombre:nombre.trim(),descripcion:descripcion.trim(),password:password.trim(),rol_id:rol_id};
                metodo= 'POST';
                enviarSolicitud(metodo,parametros);
            }
            else{
                parametros={id:id,nombre:nombre.trim(),descripcion:descripcion.trim(),password:password.trim(),rol_id:rol_id};
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
              getUsuarios();
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
           getUsuarios();
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
          getUsuarios();
        }
    })
    .catch(function(error){
        show_alerta('Error en la solicitud','error');
        console.log(error);
    });
}

const deleteUsuario= (id,nombre) =>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:'¿Estas Seguro de eliminar el usuario '+nombre+' ?' + 'con id    '+ id,
        icon: 'question',text:'No se podrá dar marcha atrás',
        showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result) =>{
        if(result.isConfirmed){
            setId(id);
            enviarSolicitud2('DELETE',{id});
            getUsuarios();
        }
        else{
            show_alerta('El Usuario NO fue eliminado','info');
            getUsuarios();
        }
    });
}

return (
    <div className='App'>
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-md-4'>
                <div className='d-grid mx-auto'>
                    <button onClick={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
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
                        <tr><th>Id Usuario</th><th>nombre</th><th>descripcion</th><th>Rol</th></tr>
                        </thead>
                        <tbody className='table-group-divider'>
                        {usuarios.map((usuario, i) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.descripcion}</td>
                                <td>{usuario.rol_id}</td>
                                <td>
                                    <button onClick={() => openModal(2,usuario.id,usuario.nombre,usuario.descripcion,usuario.password,usuario.rol_id)}className='btn btn-warning'
                                     data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                                        <i className='fa-solid fa-edit'></i>
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={()=>deleteUsuario(usuario.id,usuario.nombre)}>
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
    <div id='modalUsuarios' className='modal fade' aria-hidden='true'>
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
                        <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion}
                        onChange={(e)=> setDescripcion(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='password' id='password' className='form-control' placeholder='password' value={password}
                        onChange={(e)=> setPassword(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='rol_id' className='form-control' placeholder='rol' value={rol_id}
                        onChange={(e)=> setRol_id(e.target.value)}></input>
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
export default Usuarios