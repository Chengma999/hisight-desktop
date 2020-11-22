import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { accountSet, accountGet } from '../services/print';
import styles from '../css/login.css';

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { offset: 6, span: 12 },
  },
};

const LoginPage = (props) => {
  const [form] = Form.useForm();
  if (accountGet() instanceof Object) {
    const { username, pass } = accountGet();
    form.setFieldsValue({ username, password: pass });
  }

  const onFinish = (values) => {
    const { username, password } = values;
    const { logIn } = props;
    logIn(values).then(accountSet(username, password));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   props.form.validateFields((err, values) => {
  //     const { logIn } = props;
  //     if (!err) {
  //       // console.log('Received values of form: ', values);
  //       logIn(values);
  //     }
  //   });
  // };

  return (
    <div className={styles.form}>
      <h1>Inloggen </h1>
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Gebruikersnaam"
          name="username"
          rules={[
            {
              required: true,
              message: 'Vul je gebruikersnaam in!',
            },
          ]}
        >
          <Input placeholder="gebruikersnaam" />
        </Form.Item>

        <Form.Item
          label="Wachtwoord"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vul je wachtwoord in!',
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" block htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
