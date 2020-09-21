import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
const io = require('socket.io-client');
// const {namespace}=require('../../../../shared/gegevens')
const namespace = localStorage.getItem('namespace');
const socket = io(
  process.env.NODE_ENV === 'production'
    ? `http://136.144.214.133:5001${namespace}`
    : `http://127.0.0.1:5001${namespace}`,
);
function WebsocketNotification(props) {
  const { listenOrders, listenReservations } = props;
  // const  initWebSocket  =  ( )  =>  {
  //   io.on ( 'getMessage' ,  message  =>  {
  //         console . log ( message )
  //         const audioFile="https://www.mboxdrive.com/beyond-doubt-2.mp3"
  //           var audio = new Audio(audioFile);
  //           audio.play();
  //           notification.open({
  //             message: 'EEN NIEUWE BESTELLING!',
  //             content:'Refresh',
  //             duration:4,
  //             style:{height:'120px',cursor:'pointer'},
  //             icon:<SmileOutlined style={{color: '#108ee9'}}/>,
  //             onClick: () => {
  //                 window.location.reload();
  //             },
  //           });
  //     } )
  // }

  const audioFile = 'https://www.mboxdrive.com/beyond-doubt-2.mp3';
  var audio = new Audio(audioFile);

  socket.on(`${namespace}/print`, (data) => {
    console.log(data.data);
    if (data.data.cus_orderId) {
      listenOrders(data.data);
    }
    if (!data.data.cus_orderId) {
      listenReservations(data.data);
    }
    audio.play();
  });
  return <div></div>;
}
export default WebsocketNotification;
