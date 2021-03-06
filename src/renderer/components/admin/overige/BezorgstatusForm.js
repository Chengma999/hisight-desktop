import React from "react";
import { Form, Switch, Button } from "antd";
const restaurant_id = localStorage.getItem('restaurant_id');


const BezorgstatusForm = ({ bezorgstatus, updateBezorgstatus }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updateBezorgstatus(values);
  };
  form.setFieldsValue({ bezorgstatus });
  return (
    <div>
      <b>{bezorgstatus ? "AAN" : "UIT"}</b>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item name="bezorgstatus" label="" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BezorgstatusForm;
