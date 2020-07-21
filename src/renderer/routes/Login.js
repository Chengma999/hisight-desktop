
import React from 'react';
import { connect } from 'dva';
import {logIn} from '../actions/index'
import LoginPage from '../components/LoginPage'
import { Link } from 'dva/router';
import styles from './IndexPage.css';


function Login(props) {

  return (
    <div >
      <LoginPage {...props}/>
    </div>
  );
}
const mapStateToProps = ({login}) => {
  return {
    login
  };
};

export default connect(mapStateToProps,{logIn})(Login);
