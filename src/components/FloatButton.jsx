import React from 'react';
import {  Button,  Affix } from 'antd';
// import of styles
import '../styles/UserMainStyles.css';

const FloatButton = ({props, onClickButton}) => (
  < Affix className="button-float-c" offsetBottom={0} onChange={affixed => console.log(affixed)}>
    <Button className="float-btn" type="primary" shape="circle" size={'large'} onClick={onClickButton} >+</Button>
  </Affix >
);

export default FloatButton;