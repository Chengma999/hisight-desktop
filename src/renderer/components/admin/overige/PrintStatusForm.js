import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, } from 'antd';
import axios from 'axios'
import { printStatusSet,printStatusGet } from '../../../services/print';
const target = localStorage.getItem('target');

const PrintStatusForm = props => {

  const [status, setStatus] = useState(undefined);
  useEffect(()=>{
    setStatus(printStatusGet())
  },[])
  const [form]=Form.useForm()
  const onFinish = values => {
    console.log(values)
      printStatusSet(values.switch)
      setStatus(values.switch)
  };
  form.setFieldsValue({switch:status||false})
  return (
    <div>

    <h3>Status: {!status?"uit":"aan"}</h3>
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

export default PrintStatusForm
