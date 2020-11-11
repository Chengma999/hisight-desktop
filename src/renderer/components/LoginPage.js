import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
const { ipcRenderer } = require('electron');
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

ipcRenderer.on('message', function (event, text) {

 console.log(text)

});

class LoginPage extends React.Component {
  onFinish = (values) => {
    const { logIn } = this.props;
    logIn(values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      const { logIn } = this.props;
      if (!err) {
        // console.log('Received values of form: ', values);
        logIn(values);
      }
    });
  };

  render() {
    return (
      <div className={styles.form}>
        <h1>Inloggen </h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
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
              Login 0.0
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
