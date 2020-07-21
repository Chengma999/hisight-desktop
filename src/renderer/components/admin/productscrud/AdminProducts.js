import React, { Component } from 'react';
import { List, Card, Modal, Typography } from 'antd';
import { connect } from 'dva';
import UpdateForm from '../form/UpdateForm';
import AddNewItem from '../form/AddNewItem';
import styles from '../admin.less';
import { updateInDb, deleteInDb, addInDb } from '../../../actions/index';
import AdminPage from '../AdminPage';
import CheckboxTable from './CheckboxTable';
import CategoriesTable from './CategoriesTable';
const { Title } = Typography;

const convertInEuro = (totalPrice) => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
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
  };

  static propTypes = {};
  render() {
    const {
      products,
      categories,
      loading,
      updateInDb,
      deleteInDb,
      addInDb,
      admincrud,
      checkbox,
    } = this.props;
    const { current } = this.state;
    const productsLoading = loading.effects['products/fetch'];
    return (
      <div>
        <AdminPage page="products" />
        <AddNewItem
          addInDb={addInDb}
          loading={loading}
          admincrud={admincrud}
          categories={categories}
        />

        <div style={{ paddingLeft: '10%' }}>
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
                    {item.menukind === 'withoutOption'
                      ? 'Soep/Voorgerecht/Geen bijgerecht nodig'
                      : item.menukind === 'menu'
                      ? 'Bijgerechten voor 2'
                      : 'Bijgerechten voor 1'}
                    <br />
                    {item.chi_cha}
                  </Card>
                </List.Item>
              );
            }}
          />
        ) : (
          ''
        )}
        <div style={{ paddingLeft: '10%' }}>
          <Title level={2}>Categories</Title>
        </div>
        <CategoriesTable categories={categories} />

        <div style={{ paddingLeft: '10%' }}>
          <Title level={2}>Extra's</Title>
        </div>

        <CheckboxTable checkbox={checkbox} />

        <Modal //producten
          className={styles.modalOneButton}
          title={
            current.title !== undefined
              ? current.id.toString().concat(' ', current.title)
              : ''
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
            admincrud={admincrud}
            categories={categories}
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
}) => ({
  products,
  loading,
  admincrud,
  categories,
  checkbox,
});

export default connect(mapStateToProps, { updateInDb, deleteInDb, addInDb })(
  AdminProducts,
);
