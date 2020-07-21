
import React from 'react';

import {Form,Select,Button,Spin,Result} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />
const { Option } = Select;

class SmsForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };


  onFinish = values => {
        values.number = this.props.number
        values.orderId = this.props.orderId
        values.orderType = this.props.orderType
        console.log("Received values of form: ", values);
        this.props.smsSend(values)
    }


  render() {
    const {orderId} = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return (
      <Form
        {...formItemLayout}
        onFinish={this.onFinish}
        initialValues={{
          wait_time:"10"
        }}>

        <Form.Item name ='wait_time' label="Wacht tijd" rules={[
              {  required: true, message: 'Kies een wachttijd!' },
            ]}>
          <Select>
            <Option value="10">10 minuten</Option>
            <Option value="15">15 minuten</Option>
            <Option value="20">20 minuten</Option>
            <Option value="25">25 minuten</Option>
            <Option value="30">30 minuten</Option>
            <Option value="35">35 minuten</Option>
            <Option value="40">40 minuten</Option>
            <Option value="45">45 minuten</Option>
            <Option value="50">50 minuten</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Verzenden
          </Button>
        </Form.Item>
        {this.props.loading.effects['admincrud/sms_send'] ===true? <Spin indicator={antIcon} />
        :(this.props.admincrud['sms'+orderId]===undefined?''
          :(this.props.admincrud['sms'+orderId].isSucceeded===true?
            (<div>
              <Result
                status='success'
                title='Verzending gelukt!'/>
            </div>)
            :<div>
              <Result
                status='error'
                title='Niet gelukt..'
                subTitle={this.props.admincrud['sms'+orderId].error}/>
              </div>
          ))}
      </Form>
    );
  }
}


export default  SmsForm
