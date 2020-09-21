import React from 'react'
import { Form, Button,Input } from 'antd';
import axios from 'axios'
// const {target} =require('../../../utils/gegevens')
const target = localStorage.getItem('target');
const changeFormat=(p)=> new Intl.NumberFormat('nl-NL',{ style: 'currency', currency: 'EUR' }).format(p)

const BezorgkostenForm = props => {

  const {kosten} = props
  const [form]=Form.useForm()
  const onFinish = async values => {
    const {data}=await axios.post(`${target}/api/bezorgkosten`,values)
    console.log(data)
    window.location.reload()
  };
  form.setFieldsValue({kosten:kosten})
  return (
    <div>

    <b>{changeFormat(kosten)}</b>
    <Form
      name="basic"
      form={form}
      onFinish={onFinish}

    >
      <Form.Item
        name="kosten"
        rules={[
          {
            required: true,
            message: 'Vul kosten in!',
          },
        ]}
      >
        <Input type='number'/>
      </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>

    </Form>
    </div>
  );
};

export default BezorgkostenForm
