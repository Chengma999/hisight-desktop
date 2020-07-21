const React = require('react');
import styles from './worker.css';
const queryString = require('query-string');
const { changeFormat } = require('../../utils/gegevens');
let { data } = queryString.parse(global.location.search);
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
} = data;
const WorkerKitchen = () => {
  return (
    <div className={styles.content}>
      <table style={{ width: '100%' }}>
        <tbody className={styles.orderInfo}>
          <tr>
            <td>{cus_orderId}</td>
            <td></td>
          </tr>
          <tr>
            <td>{orderType === 'bezorgen' ? '送餐' : '外卖'}</td>
            <td className={styles.rightAlign}>{takeTime}</td>
          </tr>
          <tr>
            <td>总计:</td>
            <td className={styles.rightAlign}>{changeFormat(totalPrice)}</td>
          </tr>
          {!notes?null
            :
          <tr>
            <td>备注:</td>
            <td className={styles.rightAlign}>{notes}</td>
          </tr>
        }
        </tbody>
      </table>
      <div className={styles.dottedLine}></div>

      {cartProducts.map((cartProduct) => {
        const {quantity,title,option}=cartProduct
        return (
          <div className={styles.productText}>
            <p>
              {quantity} {title} {option?option.title:""}
            </p>
          </div>
        );
      })}

      <div className={styles.dottedLine}></div>
      <div style={{paddingTop:"40px",color:"white"}}><p>end </p></div>
    </div>
  );
};
export default WorkerKitchen;
