import React, { useState } from 'react';
import { Form, Input, Select, Button, Spin, Result, Radio } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const restaurant_id = localStorage.getItem('restaurant_id');

const { Option } = Select;

const antIcon = (
  <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />
);
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const rules = {
  id: [
    {
      required: true,
      message: 'Vul ID in!',
    },
  ],
  title: [
    {
      required: true,
      message: 'Vul title in!',
    },
  ],
  price: [
    {
      required: true,
      message: 'Vul prijs in!',
    },
  ],
  chi_cha: [
    {
      message: 'Vul artikelnummer in!',
    },
  ],
  discription: [
    {
      message: 'Vul omschrijving in!',
    },
  ],
  img_url: [
    {
      message: 'Vul Image URL in!',
    },
  ],
  extra: [{ required: false, message: 'Vul extra in!' }],
  menukind: [
    {
      required: true,
      message: 'Vul menusoort in!',
    },
  ],
  categorie: [
    {
      required: true,
      message: 'Vul menusoort in!',
    },
  ],
};
let discountArr = [];
for (var i = 0; i <= 20; i++) {
  const discount = {};
  discount.value = Number((0.05 * i).toFixed(2));
  discount.label = Number((discount.value * 100).toFixed(2)) + '%';
  discountArr.push({ ...discount });
}
const UpdateForm = (props) => {
  const { item, options, products } = props;
  const [duplicatedId, setDuplicatedId] = useState(false);
  const [errText, setErrText] = useState('');
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.id = Number(values.id);
    values.price = Number(values.price);
    values.oldId = props.item.id;
    values.restaurant_id = restaurant_id;
    console.log('Received values of form: ', values);
    props.updateInDb(values).then((res) => {
      if (res.err) {
        setDuplicatedId(true);
        setErrText(res.err);
        return;
      } else {
        setDuplicatedId(false);
        setErrText('');
      }
    });
  };
  const onChange = (value) => {
    console.log(value);
  };
  const onDelete = (e) => {
    const { id, categorie } = props.item;

    e.preventDefault();
    props.deleteInDb({ id, categorie, restaurant_id });
  };
  let optionsArr = (arr) => {
    if (Array.isArray(arr)) {
      const newarr = [...arr];
      newarr.unshift({ title: 'withoutOption' });
      return newarr;
    }
    if (!Array.isArray(arr)) {
      const newarr = [];
      newarr.unshift({ title: 'withoutOption' });
      return newarr;
    }
  };
  optionsArr = optionsArr(options).map((item, i) => (
    <option key={i} value={item.title}>
      {item.title}
    </option>
  ));
  const discountOptions = discountArr.map((item, i) => (
    <Option key={i} value={item.value}>
      {item.label}
    </Option>
  ));
  const categories = props.categories.categories;
  let catOptions =
    Array.isArray(categories) !== true
      ? []
      : categories.map((cat) => {
          return <Option value={cat.cat_code}>{cat.cat_name}</Option>;
        });

  form.setFieldsValue({
    chi_cha: undefined,
    discription: undefined,
    img_url: undefined,
    extra: undefined,
    discount: undefined,
    ...item,
  });
  return (
    <Form form={form} {...formItemLayout} onFinish={onFinish}>
      <Form.Item name="id" label="Product Id" rules={rules.id}>
        <Input />
      </Form.Item>
      <Form.Item name="title" label="Title" rules={rules.title}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={rules.price}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="chi_cha" label="Artikelnummer" rules={rules.chi_cha}>
        <Input />
      </Form.Item>

      <Form.Item
        name="discription"
        label="Omschrijving"
        rules={rules.discription}
      >
        <Input />
      </Form.Item>
      <Form.Item name="img_url" label="Image URL" rules={rules.img_url}>
        <Input />
      </Form.Item>
      <Form.Item name="extra" label="Extra's" rules={rules.extra}>
        <Radio.Group>
          <Radio value={true}>Weergeven</Radio>
          <Radio value={false}>Niet Weergeven</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="discount" label="Korting">
        <Select placeholder="Selecteer een optie">{discountOptions}</Select>
      </Form.Item>
      <Form.Item name="menukind" label="Groep" rules={rules.menukind}>
        <Select mode="multiple" onChange={onChange}>
          {optionsArr}
        </Select>
      </Form.Item>
      <Form.Item name="categorie" label="Categorie" rules={rules.categorie}>
        <Select mode="multiple" value={item.categorie}>
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
      {duplicatedId ? (
        <div>
          <Result status="error" title={errText} />
        </div>
      ) : props.loading.effects['products/updateProduct'] === true ||
        props.loading.effects['products/deleteProduct'] === true ? (
        <Spin indicator={antIcon} />
      ) : products.deleteSucceed ? (
        <div>
          <Result status="success" title="Verwijderen gelukt!" />
        </div>
      ) : products.updateSucceed ? (
        <div>
          <Result status="success" title="Update gelukt!" />
        </div>
      ) : (
        ''
      )}
    </Form>
  );
};

export default UpdateForm;
