import React, { Component } from 'react';
// import of images
import coverProfile from '../assets/svg/undraw_profile_pic_ic5t.svg';
// import of styles
import '../styles/MyPrifileStyles.css';
// import of antd 
import { Card } from 'antd';
// import of axios 
import axios from 'axios';
// import of enviroment
import { enviroment } from '../enviroments/enviroment';
// import of componnets 
import MainMenu from './MainMenu';

export default class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {nombre: '', apePaterno: '', apeMaterno: '', usuario: '', correo: '', fechaCreacion: new Date()}, readyRender: false }
  }

  componentDidMount() {

    this.handleGetUsuario();
  }

  componentWillMount(){
    
  }

   // SetStateSincrono 
   setStateAsync = (state) => {
    return new Promise((resolver, reject) => {
      this.setState(state, () => {
        resolver(true)
      });
    });
  }

  // Fucntion para cargar detalles del usuario 
  handleGetUsuario = async () => {
    let response = await axios.get(`${enviroment.baseUrl}usuario/byId?id=${this.props.usuario}`);

    await this.setStateAsync({ user: response.data, readyRender: true });
  }

  render() {
      return (
        <div style={{ minHeight: 660, marginTop: '5%' }} className="div-cover-profile delay">
          {/* Primera columna */}
          <div className="cuenta" style={{ height: '100%' }}>
            <Card hoverable style={{ height: '100%' }}>
              {/* Seccion de imagen de perfil del usuario*/}
              <div className="div-cover-profile">
                <img className="cover-profile" src={coverProfile} alt="Foto" />
              </div>

              {/* Seccion de informacion de perfil del usuario */}
              <div>
                <div className="div-cover-profile">
                  <h3>Información del usuario</h3>
                </div>

                <div style={{ borderTop: '1px solid gray', marginTop: '10px', paddingTop: '10px' }} >
                  <div className="div-cover-profile">
                    <span><strong>Usuario: </strong> {this.state.user.usuario}</span>
                  </div>

                  <div className="div-cover-profile">
                    <span><strong>Nombre: </strong> {this.state.user.nombre}</span>
                  </div>

                  <div className="div-cover-profile">
                    <span><strong>Apellido Paterno: </strong> {this.state.user.apePaterno}</span>
                  </div>

                  <div className="div-cover-profile">
                    <span><strong>Apellido Materno: </strong> {this.state.user.apeMaterno}</span>
                  </div>

                  <div className="div-cover-profile">
                    <span><strong>Correo: </strong> {this.state.user.correo}</span>
                  </div>

                  <div className="div-cover-profile">
                    <span><strong>Fecha Creación: </strong> {new Date(this.state.user.fechaCreacion).toISOString().split('T')[0]}</span>
                  </div>
                </div>

              </div>
            </Card>
          </div>
          {/* Primera columna */}
        </div>
      );

  }
} 