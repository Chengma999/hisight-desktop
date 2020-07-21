import React from 'react'
import { Form, Switch, Button, } from 'antd';
import axios from 'axios'
const {target} =require('../../../utils/gegevens')

const BezorgstatusForm = props => {

  const {status} = props
  const [form]=Form.useForm()
  const onFinish = async values => {
    const {data}=await axios.post(`${target}/api/bezorgstatus`,values)
    console.log(data)
    window.location.reload()
  };
  form.setFieldsValue({switch:status==='aan'?true:false})
  return (
    <div>

    <b>{status}</b>
    <Form
      name="basic"
      form={form}
      onFinish={onFinish}

    >
      <Form.Item name="switch" label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>

    </Form>
    </div>
  );
};

export default BezorgstatusForm
