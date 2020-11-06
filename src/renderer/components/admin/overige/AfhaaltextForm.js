import React from 'react';
import { Form, Button, Input } from 'antd';
import moment from 'moment';
const restaurant_id = localStorage.getItem('restaurant_id');
const AfhaaltextForm = (props) => {
  const { text, updateText } = props;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    values.restaurant_id = restaurant_id;
    updateText(values);
  };
  form.setFieldsValue({ text });

  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="text"
          rules={[
            {
              required: true,
              message: 'Vul een tekst in!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AfhaaltextForm;
