import React from "react";
import { Form, Switch, Button, Input } from "antd";
const restaurant_id = localStorage.getItem('restaurant_id');


const PrintMethodForm = ({ printMethod, updatePrintMethod }) => {
  const { printWithoutSoftware,targetIp } = printMethod;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updatePrintMethod(values);
  };
  form.setFieldsValue({ printWithoutSoftware,targetIp });
  return (
    <div>
      <b>{printWithoutSoftware ? "AAN" : "UIT"}</b>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item name="printWithoutSoftware" label="" valuePropName="checked">
          <Switch />
        </Form.Item>
        {printWithoutSoftware ? (
          <Form.Item
            name="targetIp"
            label="Ipadres"
            rules={[
              {
                required: true,
                message: "Vul Ipadres in!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : null}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PrintMethodForm;
