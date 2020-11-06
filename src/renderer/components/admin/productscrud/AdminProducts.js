import React, { Component } from "react";
import { List, Card, Modal, Typography } from "antd";
import { connect } from "dva";
import UpdateForm from "../form/UpdateForm";
import AddNewItem from "../form/AddNewItem";
import styles from "../admin.less";
import {
  updateInDb,
  deleteInDb,
  addInDb,
  fetchCategories,
  addCategorie,
  updateCategorie,
  deleteCategorie,
  updateCheckbox,
  cancelProductModal,
  addGroup,
  updateGroup,
  deleteGroup,
  addGroupOption,
  updateGroupOption,
  deleteGroupOption,
} from "../../../actions/index";
import AdminPage from "../AdminPage";
import CheckboxTable from "./CheckboxTable";
import CategoriesComponent from "./CategoriesComponent";
import OptionsComponent from "./OptionsComponent";

const { Title } = Typography;

const convertInEuro = (totalPrice) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrice);
};

class AdminProducts extends Component {
  formRef = React.createRef();
  state = {
    visible: false,
    current: {},
  };
  showModal = (item) => {
    this.setState({
      visible: true,
      current: item,
    });
  };
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      current: {},
    });
    this.props.cancelProductModal();
  };

  static propTypes = {};
  componentDidUpdate(prevProps) {
    const { products } = this.props.products;
    const prevProducts = prevProps.products.products;
    if (
      Array.isArray(products) &&
      Array.isArray(prevProducts) &&
      products.length === prevProducts.length &&
      JSON.stringify(products) !== JSON.stringify(prevProducts)
    ) {
      const { current } = this.state;
      const index = products.findIndex((product) => product.id === current.id);

      this.setState({ current: products[index] });
    }
  }

  render() {
    const {
      products,
      categories,
      loading,
      updateInDb,
      deleteInDb,
      addInDb,
      fetchCategories,
      admincrud,
      basicinfo,
      addCategorie,
      updateCategorie,
      deleteCategorie,
      updateCheckbox,
      addGroup,
      updateGroup,
      deleteGroup,
      addGroupOption,
      updateGroupOption,
      deleteGroupOption,
    } = this.props;
    const { current } = this.state;
    const productsLoading = loading.effects["products/fetch"];
    return (
      <div>
        <AdminPage page="products" />
        <AddNewItem
          addInDb={addInDb}
          loading={loading}
          admincrud={admincrud}
          categories={categories}
          products={products}
        />

        <div style={{ paddingLeft: "5%" }}>
          <Title level={2}>Producten</Title>
        </div>
        {productsLoading === false ? (
          <List
            className={styles.lists}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={products.products}
            renderItem={(item) => {
              const title = `${item.id} - ${item.title}`;
              return (
                <List.Item onClick={() => this.showModal(item)}>
                  <Card title={title}>
                    {convertInEuro(item.price)}
                    <br />
                    {item.chi_cha} - {item.discription} - {item.menukind}
                    <br />
                  </Card>
                </List.Item>
              );
            }}
          />
        ) : (
          ""
        )}
        <div style={{ paddingLeft: "10%" }}>
          <Title level={2}>Categories</Title>
        </div>
        <CategoriesComponent
          categories={basicinfo.categories}
          fetchCategories={fetchCategories}
          addCategorie={addCategorie}
          updateCategorie={updateCategorie}
          deleteCategorie={deleteCategorie}
        />
        <div style={{ paddingLeft: "10%" }}>
          <Title level={2}>Checkboxes</Title>
        </div>

        <CheckboxTable
          checkbox={basicinfo.checkbox}
          updateCheckbox={updateCheckbox}
        />

        <div style={{ paddingLeft: "10%" }}>
          <Title level={2}>Groepen & Opties</Title>
        </div>
        <OptionsComponent
          options={basicinfo.options}
          addGroup={addGroup}
          updateGroup={updateGroup}
          deleteGroup={deleteGroup}
          addGroupOption={addGroupOption}
          updateGroupOption={updateGroupOption}
          deleteGroupOption={deleteGroupOption}
        />

        <Modal //producten
          className={styles.modalOneButton}
          title={
            current.title !== undefined
              ? current.id.toString().concat(" ", current.title)
              : ""
          }
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          cancelText="Return"
        >
          <UpdateForm
            item={current}
            updateInDb={updateInDb}
            deleteInDb={deleteInDb}
            loading={loading}
            options ={basicinfo.options}
            categories={categories}
            products={products}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({
  products,
  loading,
  admincrud,
  categories,
  checkbox,
  basicinfo,
}) => ({
  products,
  loading,
  admincrud,
  categories,
  checkbox,
  basicinfo,
});

export default connect(mapStateToProps, {
  updateInDb,
  deleteInDb,
  addInDb,
  fetchCategories,
  addCategorie,
  updateCategorie,
  deleteCategorie,
  updateCheckbox,
  cancelProductModal,
  addGroup,
  updateGroup,
  deleteGroup,
  addGroupOption,
  updateGroupOption,
  deleteGroupOption,
})(AdminProducts);
