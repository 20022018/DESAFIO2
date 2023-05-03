import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";


const Clientes=()=>{

    const url = 'http://127.0.0.1:8000/api/clientes';
    const url1 ='http://127.0.0.1:8000/api/clientes/create';
    const url2='http://127.0.0.1:8000/api/clientes/delete/';
    const url3 ='http://127.0.0.1:8000/api/clientes/update/';
    const [clientes, setClientes] = useState([]);
    const [id, setId] = useState('');
    const [codigo_cliente , setCodigo_cliente] = useState('');
    const [nombre,setNombre] = useState('');
    const [apellido,setApellido] = useState('');
    const [telefono,setTelefono] = useState('');
    const [email,setEmail] = useState('');
    const [DUI,setDUI] = useState('');
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [title, setTitle] = useState('');


    useEffect(() => {
        getClientes();
    }, []);


    const getClientes= async () => {
        const respuesta = await axios.get(url);
        setClientes(respuesta.data);
    }

    const openModal = (op,id,codigo_cliente,nombre,apellido,telefono,email,DUI,user,password)=>{
        setId('');
        setCodigo_cliente('');
        setNombre('');
        setApellido('');
        setTelefono('');
        setEmail('');
        setDUI('');
        setUser('')
        setPassword('');
        setOperacion(op);

   if (op === 1){
         setTitle('Registrar Cliente');
   }else if (op ===2){
     setTitle('Editar Cliente');
     setId(id);
        setCodigo_cliente(codigo_cliente);
        setNombre(nombre);
        setApellido(apellido);
        setTelefono(telefono);
        setEmail(email);
        setDUI(DUI);
        setUser(user)
        setPassword(password);
   }
    }

    const validar = () => {
        var parametros;
        var metodo;
         if(nombre.trim() === ''){
            show_alerta('Escribe el nombre del cliente','warning');
        }
        else if(apellido.trim() === ''){
            show_alerta('Escribe Apellido del cliente','warning');
        }
        else if (telefono.trim()===''){
            show_alerta('Escribe telefono del cliente','warning');
        }
        else if (email.trim()===''){
            show_alerta('Escribe email del cliente','warning');
        }
        else if (DUI.trim()===''){
            show_alerta('Escribe DUI del cliente','warning');
        }
        else if(user.trim()=== ''){
            show_alerta('Escriba user del cliente','warning');
        }
        else if (password.trim()===''){
            show_alerta('Escribe password del cliente','warning');
        }
        else{
            if(operacion === 1){
                parametros= {codigo_cliente:codigo_cliente.trim(),nombre:nombre.trim(),apellido:apellido.trim(),
                    telefono:telefono.trim(),email:email.trim(),DUI:DUI.trim(),user:user.trim(),password:password.trim()};
                metodo= 'POST';
                console.log(parametros);
                enviarSolicitud(metodo,parametros);
            }
            else{
                parametros={id:id,codigo_cliente:codigo_cliente.trim(),nombre:nombre.trim(),apellido:apellido.trim(),
                    telefono:telefono.trim(),email:email.trim(),DUI:DUI.trim(),user:user.trim(),password:password.trim()};
                metodo= 'PUT';
                enviarSolicitud3(metodo,parametros);
            }
            
        }
    }

    const enviarSolicitud = async(metodo,parametros) => {
        await axios({ method:metodo, url:url1, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            console.log(parametros);
            show_alerta(msj,tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
              getClientes();
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
           getClientes();
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
          getClientes();
        }
    })
    .catch(function(error){
        show_alerta('Error en la solicitud','error');
        console.log(error);
    });
}

const deleteClientes= (id,nombre) =>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:'¿Estas Seguro de eliminar el Cliente '+nombre+' ?' + 'con id    '+ id,
        icon: 'question',text:'No se podrá dar marcha atrás',
        showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result) =>{
        if(result.isConfirmed){
            setId(id);
            enviarSolicitud2('DELETE',{id});
            getClientes();
        }
        else{
            show_alerta('El Cliente NO fue eliminado','info');
            getClientes();
        }
    });
}

return (
    <div className='App'>
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-md-4'>
                <div className='d-grid mx-auto'>
                    <button onClick={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalClientes'>
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
                        <tr><th>Codigo Cliente</th><th>Nombre</th><th>Apellido</th>
                        <th>Telefono</th><th>email</th>
                        </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                        {clientes.map((cliente, i) => (
                            <tr key={cliente.id}>
                                <td>{cliente.codigo_cliente}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.DUI}</td>                              
                                <td>
                                    <button onClick={() => openModal(2,cliente.id,cliente.codigo_cliente,cliente.nombre,cliente.apellido,
                                    cliente.telefono,cliente.email,cliente.DUI,cliente.user,cliente.password
                                    )}className='btn btn-warning'
                                     data-bs-toggle='modal' data-bs-target='#modalClientes'>
                                        <i className='fa-solid fa-edit'></i>
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={()=>deleteClientes(cliente.id,cliente.nombre)}>
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
    <div id='modalClientes' className='modal fade' aria-hidden='true'>
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
                        <input type='text' id='codigo_cliente' className='form-control' placeholder='Codigo Cliente' value={codigo_cliente}
                        onChange={(e)=> setCodigo_cliente(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='apellido' className='form-control' placeholder='Apellido' value={apellido}
                        onChange={(e)=> setApellido(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='telefono' className='form-control' placeholder='Telefono' value={telefono}
                        onChange={(e)=> setTelefono(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='email' className='form-control' placeholder='email' value={email}
                        onChange={(e)=> setEmail(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='dui' className='form-control' placeholder='DUI' value={DUI}
                        onChange={(e)=> setDUI(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='text' id='user' className='form-control' placeholder='Username' value={user}
                        onChange={(e)=> setUser(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'></span>
                        <input type='password' id='password' className='form-control' placeholder='password' value={password}
                        onChange={(e)=> setPassword(e.target.value)}></input>
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

export default Clientes