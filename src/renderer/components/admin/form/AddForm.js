import React from "react";
import { Form, Input, Select, Button, Spin, Result, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
      message: "Vul ID in!",
    },
  ],
  title: [
    {
      required: true,
      message: "Vul title in!",
    },
  ],
  price: [
    {
      required: true,
      message: "Vul prijs in!",
    },
  ],
  chi_cha: [
    {
      message: "Vul artikelnummer in!",
    },
  ],

  discription: [
    {
      message: "Vul omschrijving in!",
    },
  ],
  img_url: [
    {
      message: "Vul Image URL in!",
    },
  ],
  extra: [{ required: false, message: "Vul extra in!" }],
  menukind: [
    {
      required: true,
      message: "Vul menusoort in!",
    },
  ],
  categorie: [
    {
      required: true,
      message: "Vul menusoort in!",
    },
  ],
};
let discountArr = [];
for (var i = 0; i <= 20; i++) {
  const discount = {};
  discount.value = Number((0.05 * i).toFixed(2));
  discount.label = Number((discount.value * 100).toFixed(2)) + "%";
  discountArr.push({ ...discount });
}
class AddForm extends React.Component {
  formRef = React.createRef();
  state = {
    confirmDirty: false,
    duplicatedId: false,
    showResult: true,
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  onChange = ({ target }) => {};
  reset = () => {
    this.formRef.current.resetFields();
    this.setState({ showResult: false });
  };
  handleSubmit = (values) => {
    const { products } = this.props.products;
    values.price = Number(values.price);
    values.id = Number(values.id);
    values.restaurant_id = restaurant_id;
    const foundIndex = products.findIndex(
      (product) => product.id === values.id
    );
    if (foundIndex === -1) {
      if (this.state.duplicatedId) {
        this.setState({ duplicatedId: false });
      }
      this.props.addInDb(values);
      this.setState({ showResult: true });
    }
    if (foundIndex > -1) {
      if (!this.state.duplicatedId) {
        this.setState({ duplicatedId: true });
      }
    }
  };

  onDelete = (e) => {
    e.preventDefault();
    this.props.deleteInDb({ id: this.props.item.id });
  };
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { admincrud, products } = this.props;
    const { duplicatedId, showResult } = this.state;
    const { options } = admincrud;
    const initialId =
      products.products.length > 0
        ? Math.max(...products.products.map((product) => product.id)) + 1
        : 1;
    let optionsArr = (arr) => {
      if (Array.isArray(arr)) {
        const newarr = [...arr];
        newarr.unshift({ title: "withoutOption" });
        return newarr;
      }
      if (!Array.isArray(arr)) {
        const newarr = [];
        newarr.unshift({ title: "withoutOption" });
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
    const categories = this.props.categories.categories;
    let catOptions =
      Array.isArray(categories) !== true
        ? []
        : categories.map((cat, i) => {
            return (
              <Option key={i} value={cat.cat_code}>
                {cat.cat_name}
              </Option>
            );
          });

    return (
      <Form
        {...formItemLayout}
        ref={this.formRef}
        initialValues={{
          menukind: [],
          categorie: [],
          id: initialId,
        }}
        onFinish={this.handleSubmit}
      >
        <Form.Item name="id" label="Product Id" rules={rules.id}>
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Artikelsnaam" rules={rules.title}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Prijs" rules={rules.price}>
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
          <Select mode="multiple" placeholder="Selecteer een of meer groeps">
            {optionsArr}
          </Select>
        </Form.Item>
        <Form.Item name="categorie" label="Categorie" rules={rules.categorie}>
          <Select
            mode="multiple"
            placeholder="Selecteer een of meer categories"
          >
            {catOptions}
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Toevoegen
          </Button>
        </Form.Item>
        {duplicatedId ? (
          <div>
            <Result
              status="error"
              title="Deze product id bestaat al. Gebruik een andere product id svp."
            />
          </div>
        ) : this.props.loading.effects["products/addProduct"] === true ? (
          <Spin indicator={antIcon} />
        ) : this.formRef.current === null ||!showResult ? (
          ""
        ) : products.succeedId === parseFloat(this.formRef.current.getFieldValue("id")) &&
          showResult ? (
          <div style={{ textAlign: "center" }}>
            <Result status="success" title="Add gelukt!" />
            <Button onClick={this.reset}> Naar de volgende </Button>
          </div>
        ) : (
          <div>
            <Result
              status="error"
              title="Add niet gelukt.."
              subTitle={
                "Er is fout opgetreden."
              }
            />
          </div>
        )}
      </Form>
    );
  }
}

export default AddForm;
