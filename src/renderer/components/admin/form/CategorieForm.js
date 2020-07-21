import React, { useEffect } from 'react'
import { Form, Button,Input } from 'antd';
import axios from 'axios'
const {target} =require('../../../utils/gegevens')

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CategorieForm = props => {

  const {categorie} = props
  const [form]=Form.useForm()
  // const onDelete=(e)=>{
  //   console.log(e)
  //   axios.post('/api/admincrud/deletecategorie',x)
  // }
  const onFinish = async values => {
    console.log(values)
    const {data}=await axios.post(`${target}/api/admincrud/updatecategorie`,values)
    console.log(data)
    window.location.reload()
  };

  if(categorie){
    form.setFieldsValue({cat_code:categorie.cat_code,cat_name:categorie.cat_name})
  }
  return (
    <div>

    <Form
      {...layout}
      name="basic"
      form={form}
      onFinish={onFinish}

    >
      <Form.Item
        name="cat_code"
        label='Categorie Code'
        rules={[
          {
            required: true,
            message: 'Vul Product ID in!',
          },
          {type:'string'}
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name="cat_name"
        label='Categorie Naam'

        rules={[
          {
            required: true,
            message: 'Vul Omschrijving in!',
          },

        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {/* <Button type="danger" onClick={(e)=>onDelete(e)}>
          Delete
        </Button> */}
      </Form.Item>
    </Form>
    </div>
  );
};

export default CategorieForm
