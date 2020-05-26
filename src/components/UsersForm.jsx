import React, { Component } from 'react';
// Import of antd 
import { Modal } from 'antd';
// Import of styles
import '../styles/UserFormStyles.css';

export default class UsersForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: '', apePaterno: '', apeMaterno: '',
      usuario: '', contraseña: '', contraseñaVerifiacion: '', correo: '',
      errorStylesNombre: { visibleMessage: true, message: '' },
      errorStylesApePaterno: { visibleMessage: true, message: '' },
      errorStylesApeMaterno: { visibleMessage: true, message: '' },
      errorStylesUser: { visibleMessage: true, message: '' },
      errorStylesContraseña: { visibleMessage: true, message: '' },
      errorStylesContraseñaVerificacion: { visibleMessage: true, message: '' },
      errorStylesCorreo: { visibleMessage: true, message: '' }
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(props) {
    this.handleResetUsuario(props);
  }

  // SetStateSincrono 
  setStateAsync = (state) => {
    return new Promise((resolver, reject) => {
      this.setState(state, () => {
        resolver(true)
      });
    });
  }

  // Funcion para enviar datos del formularip
  handleSubmit = () => {
    let { id, nombre, apePaterno, apeMaterno, usuario, contraseña, correo } = this.state;

    let isValid = this.handleValidarFormulario();

    if (isValid) {
      let userStruct = {
        id, nombre, apePaterno, apeMaterno, usuario, contrasena: contraseña, correo
      }
      // Ejecutamos la funcion de guardar del componente padre
      this.props.onCreate(userStruct);
    }
  }

  // Funcion para resetear objecto
  handleResetUsuario = (props) => {
    if (props.actionForm === 1) {
      this.setStateAsync({
        id: '',
        nombre: '',
        apePaterno: '',
        apeMaterno: '',
        usuario: '',
        contraseña: '',
        contraseñaVerifiacion: '',
        correo: ''
      });

    } else {
      this.setStateAsync({
        id: props.user.id,
        nombre: props.user.nombre,
        apePaterno: props.user.apePaterno,
        apeMaterno: props.user.apeMaterno,
        usuario: props.user.usuario,
        contraseña: props.user.contrasena,
        contraseñaVerifiacion: props.user.contrasena,
        correo: props.user.correo
      });
    }
  }

  // Fucnion para obtener nombre de usuario del formulario 
  handleChangeNombre = async e => {
    // Set value of user 
    await this.setStateAsync({ nombre: e.target.value });

    if (this.state.nombre === null || this.state.nombre === undefined || this.state.nombre === '') {
      this.setStateAsync({ errorStylesNombre: { borderColor: 'red', visibleMessage: false, message: 'El campo nombre es requerido' } })
    } else {
      if (this.state.nombre.length < 3) {
        this.setStateAsync({ errorStylesNombre: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        this.setStateAsync({ errorStylesNombre: { borderColor: '', visibleMessage: true, message: '' } })
      }
    }
  }


  // Fucnion para obtener nombre de usuario del formulario 
  handleChangeApePaterno = async e => {
    // Set value of user 
    await this.setStateAsync({ apePaterno: e.target.value });

    if (this.state.apePaterno === null || this.state.apePaterno === undefined || this.state.apePaterno === '') {
      this.setStateAsync({ errorStylesApePaterno: { borderColor: 'red', visibleMessage: false, message: 'El campo apellido paterno es requerido' } })
    } else {
      if (this.state.apePaterno.length < 3) {
        this.setStateAsync({ errorStylesApePaterno: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        this.setStateAsync({ errorStylesApePaterno: { borderColor: '', visibleMessage: true, message: '' } })
      }
    }
  }

  // Fucnion para obtener apellido materno de usuario del formulario 
  handleChangeApeMaterno = async e => {
    // Set value of user 
    await this.setStateAsync({ apeMaterno: e.target.value });

    if (this.state.apeMaterno === null || this.state.apeMaterno === undefined || this.state.apeMaterno === '') {
      this.setStateAsync({ errorStylesApeMaterno: { borderColor: 'red', visibleMessage: false, message: 'El campo apellido materno es requerido' } })
    } else {
      if (this.state.apeMaterno.length < 3) {
        this.setStateAsync({ errorStylesApeMaterno: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        this.setStateAsync({ errorStylesApeMaterno: { borderColor: '', visibleMessage: true, message: '' } })
      }
    }
  }

  // Fucnion para obtener usuario del formulario 
  handleChangeUsusario = async e => {
    // Set value of user 
    await this.setStateAsync({ usuario: e.target.value });

    if (this.state.usuario === null || this.state.usuario === undefined || this.state.usuario === '') {
      this.setStateAsync({ errorStylesUser: { borderColor: 'red', visibleMessage: false, message: 'El campo usuario es requerido' } })
    } else {
      if (this.state.usuario.length < 3) {
        this.setStateAsync({ errorStylesUser: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        this.setStateAsync({ errorStylesUser: { borderColor: '', visibleMessage: true, message: '' } })
      }
    }
  }

  // Funcion para obtener contraseña
  handleeChangePassword = async e => {

    // Set password in state
    await this.setStateAsync({ contraseña: e.target.value });

    if (this.state.contraseña === null || this.state.contraseña === undefined || this.state.contraseña === '') {
      this.setStateAsync({ errorStylesContraseña: { borderColor: 'red', visibleMessage: false, message: 'El campo contraseña es requerido' } })
    } else {
      if (this.state.contraseña.length < 3) {
        this.setStateAsync({ errorStylesContraseña: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        this.setStateAsync({ errorStylesContraseña: { borderColor: '', visibleMessage: true, message: '' } })
      }
    }
  }

  // Funcion para comparar contraseñas 
  handleChangeVerifiacionContraseña = async e => {
    await this.setStateAsync({ contraseñaVerifiacion: e.target.value });

    let contraseña = this.state.contraseña;

    if (this.state.contraseñaVerifiacion === null || this.state.contraseñaVerifiacion === undefined || this.state.contraseñaVerifiacion === '') {
      this.setStateAsync({
        errorStylesContraseñaVerificacion:
        {
          borderColor: 'red', visibleMessage: false,
          message: 'El campo confirmación de contraseña es requerido'
        }
      });
    } else {
      if (contraseña === this.state.contraseñaVerifiacion) {
        this.setStateAsync({
          errorStylesContraseñaVerificacion:
          {
            borderColor: '', visibleMessage: true,
            message: ''
          }
        });
      } else {
        this.setStateAsync({
          errorStylesContraseñaVerificacion:
          {
            borderColor: 'red', visibleMessage: false,
            message: 'Las contraseñas no coinciden'
          }
        });
      }
    }

  }

  // funcion para obtener correo
  handleChangeCorreo = async  e => {
    let rulesEmail = new RegExp("[a-z A-Z]{0,25}@(yahoo|hotmail|gmail|outlook).com(\w|$)");

    // Set correo in state
    await this.setStateAsync({ correo: e.target.value });

    if (this.state.correo === null || this.state.correo === undefined || this.state.correo === '') {
      this.setStateAsync({ errorStylesCorreo: { borderColor: 'red', visibleMessage: false, message: 'El campo correo es requerido' } })
    } else {
      if (this.state.correo.length < 3) {
        this.setStateAsync({ errorStylesCorreo: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else if(!rulesEmail.test(this.state.correo)){
        this.setStateAsync({ errorStylesCorreo: { borderColor: 'red', visibleMessage: false, message: 'El correo no tiene un formato valido' } })
      }else{
        this.setStateAsync({ errorStylesCorreo: { borderColor: '', visibleMessage: true, message: '' } })
      }
    }
  }

  // Funcion para resetear las validaciones 
  handleResetFormulario = async () => {
    await this.setStateAsync({
      nombre: '', apePaterno: '', apeMaterno: '',
      usuario: '', contraseña: '', contraseñaVerifiacion: '', correo: '',
      errorStylesNombre: { visibleMessage: true, message: '' },
      errorStylesApePaterno: { visibleMessage: true, message: '' },
      errorStylesApeMaterno: { visibleMessage: true, message: '' },
      errorStylesUser: { visibleMessage: true, message: '' },
      errorStylesContraseña: { visibleMessage: true, message: '' },
      errorStylesContraseñaVerificacion: { visibleMessage: true, message: '' },
      errorStylesCorreo: { visibleMessage: true, message: '' }
    });

    // Cerramos el modal
    this.props.onCancel();
  }

  // Funcion para validar los campos antes de guardar 
  handleValidarFormulario = () => {
    let { nombre, apePaterno, apeMaterno, usuario, contraseña, contraseñaVerifiacion, correo } = this.state;
    let contador = 0;
    let rulesEmail = new RegExp("[a-z A-Z]{0,25}@(yahoo|hotmail|gmail|outlook).com(\w|$)");

    if (nombre === null || nombre === undefined || nombre === '') {
      this.setStateAsync({ errorStylesNombre: { borderColor: 'red', visibleMessage: false, message: 'El campo nombre es requerido' } })
    } else {
      if (nombre < 3) {
        this.setStateAsync({ errorStylesNombre: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        contador++;
      }
    }

    if (apePaterno === null || apePaterno === undefined || apePaterno === '') {
      this.setStateAsync({ errorStylesApePaterno: { borderColor: 'red', visibleMessage: false, message: 'El campo apellido paterno es requerido' } })
    } else {
      if (nombre < 3) {
        this.setStateAsync({ errorStylesApePaterno: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        contador++;
      }
    }

    if (apeMaterno === null || apeMaterno === undefined || apeMaterno === '') {
      this.setStateAsync({ errorStylesApeMaterno: { borderColor: 'red', visibleMessage: false, message: 'El campo apellido materno es requerido' } })
    } else {
      if (nombre < 3) {
        this.setStateAsync({ errorStylesApeMaterno: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        contador++;
      }
    }

    if (usuario === null || usuario === undefined || usuario === '') {
      this.setStateAsync({ errorStylesUser: { borderColor: 'red', visibleMessage: false, message: 'El campo usuario es requerido' } })
    } else {
      if (usuario < 3) {
        this.setStateAsync({ errorStylesUser: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        contador++;
      }
    }

    if (contraseña === null || contraseña === undefined || contraseña === '') {
      this.setStateAsync({ errorStylesContraseña: { borderColor: 'red', visibleMessage: false, message: 'El campo contraseña es requerido' } })
    } else {
      if (contraseña < 3) {
        this.setStateAsync({ errorStylesContraseña: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else {
        contador++;
      }
    }

    if (contraseñaVerifiacion === null || contraseñaVerifiacion === undefined || contraseñaVerifiacion === '') {
      this.setStateAsync({
        errorStylesContraseñaVerificacion:
        {
          borderColor: 'red', visibleMessage: false,
          message: 'El campo confirmación de contraseña es requerido'
        }
      });
    } else {
      if (contraseñaVerifiacion < 3) {
        this.setStateAsync({ errorStylesContraseñaVerificacion: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } });
      } else {
        contador++;
      }
    }

    if (correo === null || correo === undefined || correo === '') {
      this.setStateAsync({ errorStylesCorreo: { borderColor: 'red', visibleMessage: false, message: 'El campo correo es requerido' } })
    } else {
      if (correo < 3) {
        this.setStateAsync({ errorStylesCorreo: { borderColor: 'red', visibleMessage: false, message: 'Minimo 3 caracteres' } })
      } else if(!rulesEmail.test(correo)){
        this.setStateAsync({ errorStylesCorreo: { borderColor: 'red', visibleMessage: false, message: 'El correo no tiene un formato valido' } })
      }else{
        contador++;
      }
    }

    console.log(contador);

    if (contador === 7) {
      return true;
    } else {
      return false;
    }
  }


  render() {
    return (
      <Modal
        visible={this.props.visible}
        title={this.props.titulo}
        okText="Guardar"
        cancelText="Cancelar"
        onCancel={() => this.handleResetFormulario()}
        onOk={() => this.handleSubmit()}
      >
        <div>
          <form >
            {/* Main div form */}
            <div className="columnas-c">
              {/* Primer Columna  */}
              <div style={{ marginRight: '20px' }}>
                {/* Inicio de Campo de texto de nombre */}
                <div>
                  <label htmlFor="nombre" className="ant-form-item-label">Nombre</label><span className="text-danger">*</span>
                  <input id="nombre" name="nombre" type="text" placeholder="Nombre" className="ant-input-affix-wrapper"
                    style={this.state.errorStylesNombre}
                    value={this.state.nombre}
                    onChange={this.handleChangeNombre}
                  />

                  { /* Inicio de mensaje de validacion */}
                  <label id="errorMessage"
                    hidden={this.state.errorStylesNombre.visibleMessage}
                    className="text-danger"
                  >
                    {this.state.errorStylesNombre.message}
                  </label>
                  { /* Fin de mensaje de validacion */}
                </div>
                {/* Fin de Campo de texto de usuarinombreo */}


                {/* Inicio de Campo de texto de apellido paterno */}
                <div>
                  <label htmlFor="apePaterno" className="ant-form-item-label">Apelido paterno</label><span className="text-danger">*</span>
                  <input id="apePaterno" name="apePaterno" type="text" placeholder="Apellido paterno" className="ant-input-affix-wrapper"
                    style={this.state.errorStylesApePaterno}
                    value={this.state.apePaterno}
                    onChange={this.handleChangeApePaterno}
                  />

                  { /* Inicio de mensaje de validacion */}
                  <label id="errorMessage"
                    hidden={this.state.errorStylesApePaterno.visibleMessage}
                    className="text-danger"
                  >
                    {this.state.errorStylesApePaterno.message}
                  </label>
                  { /* Fin de mensaje de validacion */}
                </div>
                {/* Fin de Campo de texto de apellido paterno */}


                {/* Inicio de Campo de texto de apellido materno */}
                <div>
                  <label htmlFor="apeMaterno" className="ant-form-item-label">Apelido materno</label><span className="text-danger">*</span>
                  <input id="apeMaterno" name="apeMaterno" type="text" placeholder="Apellido materno" className="ant-input-affix-wrapper"
                    style={this.state.errorStylesApeMaterno}
                    value={this.state.apeMaterno}
                    onChange={this.handleChangeApeMaterno}
                  />

                  { /* Inicio de mensaje de validacion */}
                  <label id="errorMessage"
                    hidden={this.state.errorStylesApeMaterno.visibleMessage}
                    className="text-danger"
                  >
                    {this.state.errorStylesApeMaterno.message}
                  </label>
                  { /* Fin de mensaje de validacion */}
                </div>
                {/* Fin de Campo de texto de apellido materno */}


              </div>
              {/* Primer Columna  */}

              {/* Segunda Columna  */}
              <div>
                {/* Inicio de Campo de texto de usuario */}
                <div>
                  <label htmlFor="user" className="ant-form-item-label">Usuario</label><span className="text-danger">*</span>
                  <input id="user" name="user" type="text" placeholder="Usuario" className="ant-input-affix-wrapper"
                    style={this.state.errorStylesUser}
                    value={this.state.usuario}
                    onChange={this.handleChangeUsusario}
                  />

                  { /* Inicio de mensaje de validacion */}
                  <label id="errorMessage"
                    hidden={this.state.errorStylesUser.visibleMessage}
                    className="text-danger"
                  >
                    {this.state.errorStylesUser.message}
                  </label>
                  { /* Fin de mensaje de validacion */}
                </div>
                {/* Fin de Campo de texto de usuario */}

                {/* Inicio de Campo de texto de contraseña  */}
                <div>
                  <label htmlFor="password" className="ant-form-item-label">Contraseña</label><span className="text-danger">*</span>
                  <input id="password" name="password" type="password" placeholder="Contraseña" className="ant-input-affix-wrapper"
                    style={this.state.errorStylesContraseña}
                    value={this.state.contraseña}
                    onChange={this.handleeChangePassword}
                  />
                  { /* Inicio de mensaje de validacion */}
                  <label id="errorMessage"
                    hidden={this.state.errorStylesContraseña.visibleMessage}
                    className="text-danger"
                  >
                    {this.state.errorStylesContraseña.message}
                  </label>
                  { /* Fin de mensaje de validacion */}
                </div>
                {/* Fin de Campo de texto de contraseña  */}

                {/* Inicio de Campo de texto de confirmacion de contraseña */}
                <div>
                  <label htmlFor="passwordVerify" className="ant-form-item-label">Confirme Contraseña</label><span className="text-danger">*</span>
                  <input id="passwordVerify" name="passwordVerify" type="password" placeholder="Contraseña" className="ant-input-affix-wrapper"
                    style={this.state.errorStylesContraseñaVerificacion}
                    value={this.state.contraseñaVerifiacion}
                    onChange={this.handleChangeVerifiacionContraseña}
                  />
                  { /* Inicio de mensaje de validacion */}
                  <label id="errorMessage"
                    hidden={this.state.errorStylesContraseñaVerificacion.visibleMessage}
                    className="text-danger"
                  >
                    {this.state.errorStylesContraseñaVerificacion.message}
                  </label>
                  { /* Fin de mensaje de validacion */}
                </div>
                {/* Fin de Campo de texto de confirmacion de contraseña */}

              </div>
              {/* Segunda Columna  */}

            </div>
            {/* Main div form */}



            {/* Inicio de Campo de texto de correo */}
            <div style={{ width: '100%' }}>
              <label htmlFor="email" className="ant-form-item-label">Correo</label><span className="text-danger">*</span>
              <input id="email" name="email" type="text" placeholder="Correo" className="ant-input-affix-wrapper"
                style={this.state.errorStylesCorreo}
                value={this.state.correo}
                onChange={this.handleChangeCorreo}
              />
              { /* Inicio de mensaje de validacion */}
              <label id="errorMessage"
                hidden={this.state.errorStylesCorreo.visibleMessage}
                className="text-danger"
              >
                {this.state.errorStylesCorreo.message}
              </label>
              { /* Fin de mensaje de validacion */}
            </div>
            {/* Fin de Campo de texto de correo */}

          </form>
        </div>
      </Modal>
    );
  }
}

