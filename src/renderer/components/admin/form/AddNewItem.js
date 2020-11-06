import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button,Modal,Affix} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddForm from './AddForm'
import styles from '../admin.less'
export default class AddNewItem extends Component {
  static propTypes = {

  }
  state = {
    visible: false,
  };
  onRef = (ref) => {
    this.child = ref
}

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
      this.setState({  visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.child.formRef.current.resetFields()
  };

  render() {
    const { visible } = this.state;
    const { addInDb,loading,categories,admincrud,products } = this.props;
    return (
      <div style={{margin:'10px auto 10px auto',textAlign:'center'}}>
         <Affix offsetTop={10}>
           <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={this.showModal}/>
          </Affix>
        <Modal
          className={styles.modalOneButton}
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading.effects['admincrud/add']===true} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
            <AddForm addInDb={addInDb} loading={loading} admincrud ={admincrud} categories={categories} onRef={this.onRef} products={products}/>
        </Modal>
      </div>
    )
  }
}
