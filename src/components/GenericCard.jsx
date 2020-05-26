import React from 'react';
// Import of andt
import { Card, Col, Menu, Dropdown } from 'antd';
// import of icons 
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// import of navigation 
import {Link} from 'react-router-dom';

const { Meta } = Card;


const GenericCard = ({ idCard, showCover, urlImg, altImg, title, description, onClickSetting, onClickEdit, actionsOptions }) => {

  const menu = (
    <Menu>
      {actionsOptions.map(action => (
        action.title === 'Detalles' ?
          <Menu.Item key={action.id}>
            <Link to={"/usuarioDetalle/" + action.usuario.id}>
              <p className={action.className} style={{ margin: '0px' }} onClick={action.onClick}>{action.title}</p>
            </Link>
          </Menu.Item>
          :
          <Menu.Item key={action.id}>
            <p className={action.className} style={{ margin: '0px' }} onClick={action.onClick}>{action.title}</p>
          </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Col key={idCard} span={5.5}>
      <Card
        hoverable
        style={{ width: 280 }}
        cover={
          showCover === true ? <img alt={altImg} src={urlImg} /> : null
        }

        actions={[
          <EditOutlined key="edit" onClick={onClickEdit} />,
          <Dropdown overlay={menu} trigger={['click']}>
            <EllipsisOutlined key="ellipsis" />
          </Dropdown>,
        ]}
      >
        <Meta
          title={title}
          description={description}
        />
      </Card>
    </Col>
  );
}

GenericCard.defaultProps = {
  actionsOptions: [{ id: 0, title: 'Sin Acciones', onClick: () => { console.log('default on click') } }]
}
export default GenericCard;