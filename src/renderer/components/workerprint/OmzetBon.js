import React from 'react';
import styles from './worker.css';
import moment from 'moment';
const queryString = require('query-string');
const { changeFormat } = require('../../utils/gegevens');
let { data } = queryString.parse(global.location.search);
data = JSON.parse(data);

console.log(data);
const {
  totalSalesRevenue,
  totalAfhaalRevenue,
  totalBezorgenRevenue,
  aantal,
  date,
} = data;
const OmzetBon = () => {
  const splited = date.split(',');
  return (
    <div
      className={styles.content}
      style={{ marginTop: '50px', lineHeight: 2 }}
    >
      <b> Dagelijks financieel rapport</b>
      <div>
        {splited[0]} {splited[1]}
      </div>
      <div className={styles.dottedLine}></div>
      <table style={{ width: '100%' }}>
        <tr>
          <td>Totale omzet:</td>
          <td className={styles.rightAlign}>
            {changeFormat(totalSalesRevenue)}
          </td>
        </tr>
        <tr>
          <td>Totale aantal bonnen:</td>
          <td className={styles.rightAlign}>{aantal}</td>
        </tr>
      </table>
      <div className={styles.dottedLine}></div>

      <table style={{ width: '100%' }}>
        <tr>
          <td>Omzet Afhalen:</td>
          <td className={styles.rightAlign}>
            {changeFormat(totalAfhaalRevenue)}
          </td>
        </tr>
        <tr>
          <td>Omzet Bezorgen:</td>
          <td className={styles.rightAlign}>
            {changeFormat(totalBezorgenRevenue)}
          </td>
        </tr>
      </table>
      <div className={styles.dottedLine}></div>
      <div>BTW 9,00%</div>
      <table style={{ width: '100%' }}>
        <tr>
          <td>BTW-Bedrag:</td>
          <td className={styles.rightAlign}>
            {changeFormat((totalSalesRevenue / (1 + 0.09)) * 0.09)}
          </td>
        </tr>
        <tr>
          <td>Incl.BTW:</td>
          <td className={styles.rightAlign}>
            {changeFormat(totalSalesRevenue)}
          </td>
        </tr>
        <tr>
          <td>Excl.BTW:</td>
          <td className={styles.rightAlign}>
            {changeFormat(totalSalesRevenue / (1 + 0.09))}
          </td>
        </tr>
      </table>
      <div className={styles.dottedLine}></div>
      <div style={{paddingTop:"40px",color:"white"}}><p>end </p></div>
      {
        //   <table style={{ width: '100%' }}>
        //   <tbody>
        //     <tr>
        //       <td>
        //         <b>{cus_orderId}</b>
        //       </td>
        //       <td className={styles.rightAlign}>
        //         <b>
        //           {orderType.toUpperCase()} {takeTime}
        //         </b>
        //       </td>
        //     </tr>
        //   </tbody>
        // </table>
        // <div className={styles.dottedLine}></div>
        // <table
        //   style={{ width: '100%', wordBreak: 'break-all', wordWrap: 'break-all' }}
        // >
        //   <tbody>
        //     <tr>
        //       <td>Naam:</td>
        //       <td className={styles.rightAlign}> {customerName}</td>
        //     </tr>
        //     {!bedrijfsnaam ? null : (
        //       <tr>
        //         <td>Bedrijfsnaam:</td>
        //         <td className={styles.rightAlign}> {bedrijfsnaam}</td>
        //       </tr>
        //     )}
        //     <tr>
        //       <td>E-mailadres:</td>
        //       <td className={styles.rightAlign}>{email}</td>
        //     </tr>
        //     <tr>
        //       <td>Telefoon:</td>
        //       <td className={styles.rightAlign}>{telefoon}</td>
        //     </tr>
        //   </tbody>
        //   {orderType === 'afhalen' ? null : (
        //     <tbody style={{ width: '100%' }}>
        //       <tr>
        //         <td>Adres:</td>
        //         <td className={styles.rightAlign}>{adres}</td>
        //       </tr>
        //       <tr>
        //         <td>postcode:</td>
        //         <td className={styles.rightAlign}> {postcode}</td>
        //       </tr>
        //       {!cityname ? null : (
        //         <tr>
        //           <td>Plaatsnaam:</td>
        //           <td className={styles.rightAlign}>{cityname}</td>
        //         </tr>
        //       )}
        //     </tbody>
        //   )}
        //   {!notes ? null : (
        //     <tbody style={{ width: '100%' }}>
        //       <tr>
        //         <td>Opmerking:</td>
        //         <td className={styles.rightAlign}> {notes}</td>
        //       </tr>
        //     </tbody>
        //   )}
        // </table>
        // <div className={styles.dottedLine}></div>
        // <table style={{ width: '100%', wordBreak: 'normal', wordWrap: 'break-all' }}>
        //   <tbody>
        //     {cartProducts.map((cartProduct) => {
        //       const { quantity, title, option } = cartProduct;
        //       return (
        //         <tr>
        //           <td>
        //             {quantity} {title} {option ? option.title : ''}
        //           </td>
        //           <td className={styles.rightAlign}>
        //             {changeFormat(cartProduct.subTotal)}
        //           </td>
        //         </tr>
        //       );
        //     })}
        //     {orderType === 'afhalen' ? null : (
        //       <tr>
        //         <td>Bezorgkosten:</td>
        //         <td className={styles.rightAlign}>{changeFormat(deliveryFee)}</td>
        //       </tr>
        //     )}
        //   </tbody>
        // </table>
        // <div className={styles.dottedLine}></div>
        // <table style={{ width: '100%' }}>
        //   <tbody>
        //     <tr>
        //       <td>
        //         <b>Totaalprijs:</b>
        //       </td>
        //       <td className={styles.rightAlign}>
        //         <b>{changeFormat(totalPrice)}</b>
        //       </td>
        //     </tr>
        //   </tbody>
        // </table>
        // <br/>
        // <div className={styles.dottedLine}></div>
        // <table style={{ width: '100%', wordBreak: 'break-all', wordWrap: 'break-all',fontSize:"12px" }}>
        //   <tbody>
        //     <tr>
        //       <td>BTW-CODE</td>
        //       <td className={styles.centerAlign}>EXCL.BTW</td>
        //       <td className={styles.rightAlign}>BTW</td>
        //     </tr>
        //     <tr>
        //       <td>9,00%</td>
        //       <td className={styles.centerAlign}>{changeFormat(totalPrice/(1+0.09))}</td>
        //       <td className={styles.rightAlign}>{changeFormat(totalPrice/(1+0.09)*0.09)}</td>
        //     </tr>
        //     <tr>
        //       <td>TOT.EXCL.BTW</td>
        //       <td className={styles.centerAlign}>TOT.BTW</td>
        //       <td className={styles.rightAlign}>TOT.INCL.BTW</td>
        //     </tr>
        //     <tr>
        //       <td>{changeFormat(totalPrice/(1+0.09))}</td>
        //       <td className={styles.centerAlign}>{changeFormat(totalPrice/(1+0.09)*0.09)}</td>
        //       <td className={styles.rightAlign}>{changeFormat(totalPrice)}</td>
        //     </tr>
        //   </tbody>
        // </table>
        // <div style={{ paddingTop: '40px', color: 'white' }}>
        //   <p>end</p>
        // </div>
      }
    </div>
  );
};
export default OmzetBon;
