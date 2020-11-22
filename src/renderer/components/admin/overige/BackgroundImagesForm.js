import React from "react";
import { Form, Button, Input } from "antd";
const restaurant_id = localStorage.getItem('restaurant_id');


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const BackgroundImagesForm = ({ backgroundImages, updateBackgroundImages }) => {
  const { top, middle, bottom } = backgroundImages;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    values.restaurant_id = restaurant_id;
    updateBackgroundImages(values);
  };
  form.setFieldsValue({ top, middle, bottom });

  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish} {...layout}>
        <Form.Item
          label="Boven"
          name="top"
          rules={[
            {
              required: true,
              message: "Vul een URL in!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Middel"
          name="middle"
          rules={[
            {
              required: true,
              message: "Vul een URL in!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Beneden"
          name="bottom"
          rules={[
            {
              required: true,
              message: "Vul een URL in!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BackgroundImagesForm;
