import React, { Component } from 'react';
// import of axios
import axios from 'axios';
// import of enviroments 
import { enviroment } from '../enviroments/enviroment';
// import of antd
import { Row } from 'antd';
// import of components
import GenericCard from './GenericCard';
import FloatButton from './FloatButton';
import UsersForm from './UsersForm';
// import of sweetalert
import Swal from 'sweetalert2';

export default class UsersMain extends Component {
  constructor(props) {
    super(props);

    this.state = { usersList: [], modalVisible: false, titulo: 'Nuevo Usuario', actionForm: 1, user: null };
  }

  componentDidMount() {
    this.handleGetUsuarios();
  }

  setStateAsync = (state) => {
    return new Promise((resolver, reject) => {
      this.setState(state, () => {
        resolver(true)
      });
    });
  }

  // Funcion para obtener usuarios
  handleGetUsuarios = () => {
    axios.get(`${enviroment.baseUrl}usuario/all`).then(response => {
      console.log(response.data);

      this.setState({ usersList: response.data });
      console.log(this.state, 'soy el state');
    });
  }

  // funcion para renderizar usuarios
  handleRenderUsuarios() {
    return this.state.usersList.map(user => (
      <GenericCard
        key={user.id}
        idCard={user.id}
        showCover={true}
        urlImg={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
        altImg={'alt'}
        title={`${user.nombre} ${user.apePaterno} ${user.apeMaterno}`}
        description={user.correo}
        onClickEdit={() => this.abrirFormulario(2, user)}
        actionsOptions={[
          { id: 1, title: 'Eliminar', className: 'text-danger', onClick: () => this.onDelete(user) },
          { id: 2, title: 'Detalles', usuario: user, className: 'text-primary', onClick: () => console.log('action 2 click') }
        ]}
      />
    ));
  }

  // Funcion para abrir modal 
  abrirFormulario = async (accion, user) => {

    if (accion === 1) {
      await this.setStateAsync({ modalVisible: true, titulo: 'Nuevo Usuario', actionForm: accion, user: user });
    } else if (accion === 2) {
      await this.setStateAsync({ modalVisible: true, titulo: 'Editar Usuario', actionForm: accion, user: user });
    }

    console.log(this.state.user);
  }

  // Funcion para cerrar el modal 
  onCancel = value => {
    this.setState({ modalVisible: value });
  }

  // funcion para guardar usuario
  onCreate = usuario => {

    // Agregamos extra data en el objeto usuario 
    usuario['fechaCreacion'] = new Date();
    usuario['fechaModificacion'] = new Date();

    console.log('Received values of form: ', usuario);

    if (this.state.actionForm === 1) {
      axios.post(`${enviroment.baseUrl}usuario/create`, usuario).then(response => {
        if (response.data.ok === true) {
          Swal.fire('', 'Guardado Correctamente', 'success');

          this.handleGetUsuarios();
          console.log(response.data);
          this.setState({ modalVisible: false });
        } else {
          Swal.fire('', 'Ha ocurrido un error al guardar', 'success');

          this.handleGetUsuarios();
          this.setState({ modalVisible: false });
        }
      });
    } else if (this.state.actionForm === 2) {
      axios.put(`${enviroment.baseUrl}usuario/edit`, usuario).then(response => {
        if (response.data.ok === true) {
          Swal.fire('', 'Actualizado Correctamente', 'success');

          this.handleGetUsuarios();
          this.setState({ modalVisible: false });
        } else {
          Swal.fire('', 'Ha ocurrido un error al actualizar', 'success');

          this.handleGetUsuarios();
          this.setState({ modalVisible: false });
        }
      });
    }

  };

  // Funcion para eliminar a un usuario 
  onDelete = (usuario) => {
    Swal.fire({
      title: '',
      text: '¿Estas seguro de eliminar a el usuario '+ usuario.usuario + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        axios.delete(`${enviroment.baseUrl}usuario/delete?id=${usuario.id}`).then(response => {
          if (response.data.ok === true) {
            Swal.fire('', 'Eliminado Correctamente', 'success');

            this.handleGetUsuarios();
            this.setState({ modalVisible: false });
          } else {
            Swal.fire('', 'Ha ocurrido un error al eliminar', 'success');

            this.handleGetUsuarios();
            this.setState({ modalVisible: false });
          }
        });
      }else{
        Swal.fire('', 'Cancelado', 'info');
      }
    })
  }

  render() {
    return (
      <div style={{ minHeight: 660 }}>
        {/* Inicio Secicon de titulo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <h1>Usuarios</h1>
        </div>
        {/* Fin Secicon de titulo */}


        {/* Inicio Secicon de cards */}
        <Row gutter={[32, 24]} justify="center">
          {this.state.usersList.length > 0 ? this.handleRenderUsuarios() : 'Sin datos'}
        </Row>
        {/* Fin Secicon de cards */}

        {/* Inicio de seccion de componente de formulario de usuario */}

        <UsersForm
          titulo={this.state.titulo}
          visible={this.state.modalVisible}
          onCreate={this.onCreate}
          onCancel={this.onCancel}
          actionForm={this.state.actionForm}
          user={this.state.user}
        />
        {/* Fin de seccion de componente de formulario de usuario */}


        {/* Inicion de seccion de componente de boton flotante */}
        <FloatButton onClickButton={() => this.abrirFormulario(1, null)} />
        {/* Fin de seccion de componente de boton flotante */}

      </div>
    );
  }
}