import React from "react";
import { Form, Input, Select, Button } from "antd";
const restaurant_id = localStorage.getItem('restaurant_id');
import moment from "moment";
const { Option } = Select;

const arr = [];
const a = 8;
const n = 23.75;
const index = (n - a) / 0.25;
for (let i = 0; i < index + 1; i++) {
  arr.push(a + i * 0.25);
}

const BezorgtijdenForm = ({ bezorgtijden, updateBezorgtijden }) => {
  const { begin, end } = bezorgtijden;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updateBezorgtijden(values);
  };
  const optionsArr = arr.map((time) => {
    const label = moment(
      (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toString(),
      "hmm"
    ).format("HH:mm");
    return <Option value={time}>{label}</Option>;
  });
  form.setFieldsValue({ begin, end });

  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="begin"
          rules={[
            {
              required: true,
              message: "Vul beginbezorgtijd in!",
            },
          ]}
        >
          <Select>{optionsArr}</Select>
        </Form.Item>
        <Form.Item
          name="end"
          rules={[
            {
              required: true,
              message: "Vul eindbezorgtijd in!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("begin") < value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "Eindtijd moet later zijn dan begintijd!"
                );
              },
            }),
          ]}
        >
          <Select>{optionsArr}</Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BezorgtijdenForm;
