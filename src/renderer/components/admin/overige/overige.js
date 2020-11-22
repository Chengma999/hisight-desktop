import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import AdminPage from '../AdminPage';
import BezorgstatusForm from './BezorgstatusForm';
import BezorgtijdenForm from './BezorgtijdenForm';
import PaybycashForm from './PaybycashForm';
import ClosedayForm from './ClosedayForm';
import AfhaaltextForm from './AfhaaltextForm';
import PrintStatusForm from './PrintStatusForm';
import PrinterForm from './PrinterForm';
import BezorggebiedAddForm from './bezorggebied/BezorggebiedAddForm';
import BezorggebiedTable from './bezorggebied/BezorggebiedTable';
import OpeningstijdenAddForm from './openingstijden/OpeningstijdenAddForm';
import OpeningstijdenTable from './openingstijden/OpeningstijdenTable';
import BackgroundImagesForm from './BackgroundImagesForm';
import CarouselAddForm from './carousel/CarouselAddForm';
import CarouselTable from './carousel/CarouselTable';
import MenulijstAddForm from './menulijst/MenulijstAddForm';
import MenulijstTable from './menulijst/MenulijstTable';
import PrintMethodForm from './PrintMethodForm';
import styles from '../admin.less';
import {
  updateKvknr,
  updateLiveKey,
  updateFacebookUrl,
  updateEmailLogoUrl,
  updateText_1,
  updateText_2,
  updateBezorgstatus,
  updatePaybycash,
  addBezorggebied,
  updateBezorggebied,
  deleteBezorggebied,
  addOpeningstijden,
  updateOpeningstijden,
  deleteOpeningstijden,
  updateBezorgtijden,
  updateCloseday,
  updateBackgroundImages,
  addCarouselImage,
  updateCarouselImage,
  deleteCarouselImage,
  updatePrintMethod,
  addMenulijst,
  updateMenulijst,
  deleteMenulijst,
} from '../../../actions';

const columns = [
  {
    title: 'KEYS',
    dataIndex: 'keys',
    width: 50,
    render: (text) => <div style={{ fontWeight: '600' }}>{text}</div>,
  },
  {
    title: 'VALUES',
    dataIndex: 'values',
    width: 150,
  },
];

function Overige(props) {
  const {
    factors,
    basicinfo,
    updateKvknr,
    updateLiveKey,
    updateFacebookUrl,
    updateEmailLogoUrl,
    updateText_1,
    updateText_2,
    updateBezorgstatus,
    updatePaybycash,
    addBezorggebied,
    updateBezorggebied,
    deleteBezorggebied,
    addOpeningstijden,
    updateOpeningstijden,
    deleteOpeningstijden,
    updateBezorgtijden,
    updateCloseday,
    updateBackgroundImages,
    addCarouselImage,
    updateCarouselImage,
    deleteCarouselImage,
    updatePrintMethod,
    addMenulijst,
    updateMenulijst,
    deleteMenulijst,
  } = props;
  const data = [
    {
      key: 'bezorgstatus',
      keys: 'Bezorging aan en uit',
      values: (
        <BezorgstatusForm
          bezorgstatus={basicinfo.bezorgstatus}
          updateBezorgstatus={updateBezorgstatus}
        />
      ),
    },
    {
      key: 'paybycash',
      keys: 'Betalen met contant en pin',
      values: (
        <PaybycashForm
          paybycash={basicinfo.paybycash}
          updatePaybycash={updatePaybycash}
        />
      ),
    },

    {
      key: 'bezorgtijden',
      keys: 'Bezorgtijden',
      values: (
        <BezorgtijdenForm
          bezorgtijden={basicinfo.bezorgtijden}
          updateBezorgtijden={updateBezorgtijden}
        />
      ),
    },
    {
      key: 'gesloten dagen',
      keys: 'Sluitdag(en)',
      values: (
        <ClosedayForm
          closeday={basicinfo.closeday}
          updateCloseday={updateCloseday}
        />
      ),
    },
    {
      key: 'text_1',
      keys: 'tekst 1',
      values: (
        <AfhaaltextForm text={basicinfo.text_1} updateText={updateText_1} />
      ),
    },
    {
      key: 'text_2',
      keys: 'tekst 2',
      values: (
        <AfhaaltextForm text={basicinfo.text_2} updateText={updateText_2} />
      ),
    },
    {
      key: 'background_imgs',
      keys: 'Background Images',
      values: (
        <BackgroundImagesForm
          backgroundImages={basicinfo.backgroundImages}
          updateBackgroundImages={updateBackgroundImages}
        />
      ),
    },
    {
      key: 'kvknr',
      keys: 'KVK nummer',
      values: (
        <AfhaaltextForm text={basicinfo.kvknr} updateText={updateKvknr} />
      ),
    },
    {
      key: 'liveKey',
      keys: 'Mollie Live Key',
      values: (
        <AfhaaltextForm text={basicinfo.liveKey} updateText={updateLiveKey} />
      ),
    },
    {
      key: 'facebookUrl',
      keys: 'Facebook Url',
      values: (
        <AfhaaltextForm
          text={basicinfo.facebookUrl}
          updateText={updateFacebookUrl}
        />
      ),
    },
    {
      key: 'emailLogoUrl',
      keys: 'Email Logo Url',
      values: (
        <AfhaaltextForm
          text={basicinfo.emailLogoUrl}
          updateText={updateEmailLogoUrl}
        />
      ),
    },
    {
      key: 'printMethod',
      keys: 'Raw Print (zonder Software)',
      values: (
        <PrintMethodForm
          printMethod={basicinfo.printMethod}
          updatePrintMethod={updatePrintMethod}
        />
      ),
    },
    {
      key: 'autoprint',
      keys: 'Auto Print',
      values: <PrintStatusForm factors={factors} />,
    },
    {
      key: 'printerconfig',
      keys: 'Printer Config',
      values: <PrinterForm factors={factors} />,
    },
  ];
  return (
    <div>
      <AdminPage page="overige" />
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </div>
      <BezorggebiedAddForm
        bezorggebied={basicinfo.bezorggebied}
        addBezorggebied={addBezorggebied}
      />
      <BezorggebiedTable
        bezorggebied={basicinfo.bezorggebied}
        updateBezorggebied={updateBezorggebied}
        deleteBezorggebied={deleteBezorggebied}
      />
      <OpeningstijdenAddForm
        openingstijden={basicinfo.openingstijden}
        addOpeningstijden={addOpeningstijden}
      />
      <OpeningstijdenTable
        openingstijden={basicinfo.openingstijden}
        updateOpeningstijden={updateOpeningstijden}
        deleteOpeningstijden={deleteOpeningstijden}
      />
      <CarouselAddForm
        carouselImages={basicinfo.carouselImages}
        addCarouselImage={addCarouselImage}
      />
      <CarouselTable
        carouselImages={basicinfo.carouselImages}
        updateCarouselImage={updateCarouselImage}
        deleteCarouselImage={deleteCarouselImage}
      />
      <MenulijstAddForm
        menulijsts={basicinfo.menulijsts}
        addMenulijst={addMenulijst}
      />
      <MenulijstTable
        menulijsts={basicinfo.menulijsts}
        updateMenulijst={updateMenulijst}
        deleteMenulijst={deleteMenulijst}
      />
    </div>
  );
}

const mapStateToProps = ({
  basicinfo,
  bezorgkosten,
  bezorgstatus,
  factors,
  overige,
}) => ({
  basicinfo,
  bezorgkosten,
  bezorgstatus,
  factors,
  overige,
});

export default connect(mapStateToProps, {
  updateKvknr,
  updateLiveKey,
  updateFacebookUrl,
  updateEmailLogoUrl,
  updateText_1,
  updateText_2,
  updateBezorgstatus,
  updatePaybycash,
  addBezorggebied,
  updateBezorggebied,
  deleteBezorggebied,
  addOpeningstijden,
  updateOpeningstijden,
  deleteOpeningstijden,
  updateBezorgtijden,
  updateCloseday,
  updateBackgroundImages,
  addCarouselImage,
  updateCarouselImage,
  deleteCarouselImage,
  updatePrintMethod,
  addMenulijst,
  updateMenulijst,
  deleteMenulijst,
})(Overige);
