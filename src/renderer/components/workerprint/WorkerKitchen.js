const React = require('react');
import styles from './worker.css';
const queryString = require('query-string');
const { changeFormat } = require('../../../shared/gegevens');
const restaurantType = localStorage.getItem('restaurantType');
const search = global.location.search.replace(/&/gi, '*');
let { data } = queryString.parse(search);
data = JSON.parse(data);

console.log(data);
const {
  orderType,
  cus_orderId,
  takeTime,
  customerName,
  bedrijfsnaam,
  email,
  telefoon,
  adres,
  postcode,
  cityname,
  deliveryFee,
  notes,
  cartProducts,
  totalPrice,
  paymethod,
} = data;
const WorkerKitchen = () => {
  return (
    <div className={styles.content}>
      <table style={{ width: '100%' }}>
        <tbody className={styles.orderInfo}>
          <tr>
            <td>{cus_orderId}</td>

            {paymethod !== 'cash' ? (
              <td></td>
            ) : (
              <td
                style={{ borderStyle: 'solid', borderWidth: '3px' }}
                className={styles.rightAlign}
              >
                未付款
              </td>
            )}
          </tr>
          <tr>
            <td>
              {orderType === 'bezorgen'
                ? restaurantType !== 'chinees'
                  ? 'Bezorgen'
                  : '送餐'
                : restaurantType !== 'chinees'
                ? 'Afhalen'
                : '外卖'}
            </td>
            <td className={styles.rightAlign}>{takeTime}</td>
          </tr>
          <tr>
            <td>{restaurantType !== 'chinees' ? 'Totaal' : '总计:'}</td>
            <td className={styles.rightAlign}>{changeFormat(totalPrice)}</td>
          </tr>
          {!notes ? null : (
            <tr>
              <td>{restaurantType !== 'chinees' ? 'Opmerking:' : '备注:'}</td>
              <td className={styles.rightAlign}>{notes}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.dottedLine}></div>

      {cartProducts.map((cartProduct) => {
        const { quantity, title, chi_cha, option } = cartProduct;
        return (
          <div className={styles.productText}>
            <p>
              {quantity} {restaurantType !== 'chinees' ? title : chi_cha}{' '}
              {!option
                ? ''
                : restaurantType !== 'chinees'
                ? option.title
                : option.chi_cha}
            </p>
          </div>
        );
      })}

      <div className={styles.dottedLine}></div>
      <div style={{ paddingTop: '40px', color: 'white' }}>
        <p>end </p>
      </div>
    </div>
  );
};
export default WorkerKitchen;
