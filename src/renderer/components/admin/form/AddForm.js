import React, { useCallback } from "react";
import {Form,Input,Select,Button,Spin,Result } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const {Option } = Select

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



class AddForm extends React.Component {

  formRef = React.createRef();

  state = {
    confirmDirty: false,

  };
  componentDidMount(){
    this.props.onRef(this)
  }

  handleSubmit = (values) => {
        values.price = Number(values.price)
        values.id = Number(values.id)
        // console.log("Received values of form: ", values);
        this.props.addInDb(values)
  };
 onDelete = e =>{
  e.preventDefault();
  this.props.deleteInDb({id:this.props.item.id})
 }
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };







  render() {

    const categories=this.props.categories.categories
    let catOptions= (Array.isArray(categories)!==true?[]
      :
        categories.map(cat=>{
          return <Option value={cat.cat_code}>{cat.cat_name}</Option>
        }))

    return (
      <Form {...formItemLayout}
            ref={this.formRef}
            initialValues={{
              menukind:'withoutOption',
              categorie:['cat1']
            }}
            onFinish={this.handleSubmit} >
        <Form.Item name='id' label="Product Id" rules={rules.id}>
            <Input />
        </Form.Item>
        <Form.Item name='title'label="Artikelsnaam" rules={rules.title}>
            <Input />
        </Form.Item>
        <Form.Item name='price'label="Prijs" rules={rules.price}>
          <Input type='number' />
        </Form.Item>
        <Form.Item name='chi_cha'label="Chinese characters" rules={rules.chi_cha}>
          <Input />
        </Form.Item>
        <Form.Item name='discription'label="Omschrijving" rules={rules.discription}>
          <Input />
        </Form.Item>

        <Form.Item name='menukind'label="Menu Soort" rules={rules.menukind}>
            <Select>
              <Option value="withoutOption">Soep/Voorgerecht/Geen bijgerecht nodig</Option>
              <Option value="menu">Bijgerechten voor 2</Option>
              <Option value="gerecht">Bijgerecht voor 1</Option>
              <Option value="keuzemenu">Keuzemenu Bijgerecht</Option>
            </Select>
        </Form.Item>
        <Form.Item name='categorie'label="Categorie" rules={rules.categorie}>
            <Select
              mode='multiple'>
              {catOptions}
            </Select>

        </Form.Item>


        <Form.Item  {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
        {this.props.loading.effects['admincrud/add'] ===true? <Spin indicator={antIcon} />
          :(this.formRef.current===null?''
            :(this.props.admincrud['add_'+this.formRef.current.getFieldValue('id')]===undefined?''

              :(this.props.admincrud['add_'+this.formRef.current.getFieldValue('id')].isSucceeded===true?
                (<div>
                  <Result
                    status='success'
                    title='Add gelukt!'/>
                </div>)
                :<div>
                  <Result
                    status='error'
                    title='Add niet gelukt..'
                    subTitle={this.props.admincrud['add_'+this.formRef.current.getFieldValue('id')].error}/>
                  </div>
                )))
              }

      </Form>
    );
  }
}



export default AddForm
