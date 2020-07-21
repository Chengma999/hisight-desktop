
import {Menu,} from 'antd'

import React, { Component } from 'react'
import {Link} from 'dva/router'

export default class AdminPage extends Component {

  state = {
    current: '',
  };
  componentDidMount(){
    if (this.props.page==="orders"){
      this.setState({current:"orders"})
    }else if (this.props.page==="products"){
      this.setState({current:"products"})
    }else if( this.props.page==="overige"){
      this.setState({current:"overige"})
    }
  }


   handleButtonClick(e) {
    // message.info('Click on left button.');
    console.log('click left button', e);
  }

   handleMenuClick(e) {
    console.log('click', e);
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render() {

    return (

    <div>

        <Menu
          theme='dark'
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          >

        <Menu.Item key="orders">
          <Link to='/admin/orders'>
            Bestellingen beheren
          </Link>
        </Menu.Item>
        <Menu.Item key="products" >
          <Link to='/admin/products'>
            Producten beheren
          </Link>
        </Menu.Item>
        <Menu.Item key="overige" >
          <Link to='/admin/overige'>
            Overige instellingen
          </Link>
        </Menu.Item>
      </Menu>
    </div>


    )
  }
}






