import React from "react";
import { Form, Switch, Button } from "antd";
const restaurant_id = localStorage.getItem('restaurant_id');


const PaybycashForm = ({ paybycash, updatePaybycash }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updatePaybycash(values);
  };
  form.setFieldsValue({ paybycash });
  return (
    <div>
      <b>{paybycash ? "AAN" : "UIT"}</b>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item name="paybycash" label="" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PaybycashForm;
