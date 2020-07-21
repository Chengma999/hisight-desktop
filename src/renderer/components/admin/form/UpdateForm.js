import React, { useState, useEffect } from "react";
import {Form,Input,Select,Button,Spin ,Result} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
const {Option} = Select

const antIcon = <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const rules={
  id: [
  {
    required: true,
    message: "Vul ID in!"
  }
],
  title:[
  {
    required: true,
    message: "Vul title in!"
  }
],
price:[
  {
    required: true,
    message: "Vul prijs in!"
  }
],
chi_cha:[
  {
    required: true,
    message: "Vul Chinese karakters in!"
  }
],
discription:[
  {
    message: "Vul omschrijving in!"
  }
],
menukind:[
  {
    required: true,
    message: "Vul menusoort in!"
  }
],
categorie:[
  {
    required: true,
    message: "Vul menusoort in!"
  }
],
}


const  UpdateForm= props=>{
  const {item}=props
  const [form] = Form.useForm()



  // state = {
  //   confirmDirty: false,
  // };

  const onFinish = values => {
        values.price = Number(values.price)
        values.id = props.item.id
        console.log("Received values of form: ", values);
        props.updateInDb(values)
      }


  const onDelete = e =>{
  const {id,categorie}=props.item
  e.preventDefault();
  props.deleteInDb({id,categorie,})
 }




    const categories=props.categories.categories
    let catOptions= (Array.isArray(categories)!==true?[]
    :
      categories.map(cat=>{
        return <Option value={cat.cat_code}>{cat.cat_name}</Option>
      }))

      if(item.discription){
        form.setFieldsValue(item)
      }else{
       form.setFieldsValue({...item,discription:undefined})
      }
    return (
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        >
        <Form.Item name='title' label="Title" rules={rules.title} >
          <Input />
        </Form.Item>
        <Form.Item name= 'price' label="Price" rules={rules.price}>
          <Input type='number'/>
        </Form.Item>
        <Form.Item name='chi_cha' label= "Chinese characters" rules={rules.chi_cha}>
          <Input />
        </Form.Item>
        <Form.Item name='discription' label="Omschrijving" rules={rules.discription}>
        <Input />
        </Form.Item>

        <Form.Item name='menukind' label="Menu kind" rules= {rules.menukind}>
          <Select >
              <Option value="withoutOption">Soep/Voorgerecht/Geen bijgerecht nodig</Option>
              <Option value="menu">Bijgerechten voor 2</Option>
              <Option value="gerecht">Bijgerecht voor 1</Option>
              <Option value="keuzemenu">Keuzemenu Bijgerecht</Option>
            </Select>
        </Form.Item>
        <Form.Item name = 'categorie' label="Categorie" rules={rules.categorie}>
            <Select mode='multiple' value={item.categorie}>
              {catOptions}
            </Select>

        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="danger" htmlType="button" onClick={onDelete}>
            Delete Item
          </Button>
        </Form.Item>
        {props.loading.effects['admincrud/update'] ===true? <Spin indicator={antIcon} />
        :(props.admincrud['update_'+item.id]===undefined?''
          :(props.admincrud['update_'+item.id].isSucceeded===true?
            (<div>
              <Result
                status='success'
                title='Update gelukt!'/>
            </div>)
            :<div>
              <Result
                status='error'
                title='Update niet gelukt..'
                subTitle={props.admincrud['update_'+item.id].error}/>
              </div>
          ))
        // (props.loading.effects['admincrud/update'] ===false? (<div> update succeed!</div>):'')
        }
        {props.loading.effects['admincrud/delete'] ===true? <Spin indicator={antIcon} />
        :(props.admincrud['delete_'+item.id]===undefined?''
          :(props.admincrud['delete_'+item.id].isSucceeded===true?
            (<div>
              <Result
                status='success'
                title='Verwijderen gelukt!'/>
            </div>)
            :<div>
              <Result
                status='error'
                title=' Verwijderen niet gelukt..'
                subTitle={props.admincrud['delete_'+item.id].error}/>
              </div>
          ))
        // (props.loading.effects['admincrud/delete'] ===false? (<div>delete succeed!</div>):'')

        }
      </Form>
    );
  }




export default UpdateForm
