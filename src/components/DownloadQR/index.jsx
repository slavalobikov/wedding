import React, { useRef } from 'react';
import classes from './downloadQR.module.scss';
import { QRCodeSVG } from 'qrcode.react';
import { downloadSvg } from '../../utils/svg';

const DownloadQR = ({ groupId }) => {
  const qrRef = useRef(null);

  const generatePDF = () => {
    downloadSvg(qrRef.current.firstChild, groupId);
  };

  return (
    <div>
      <div className={classes.qr} ref={qrRef}>
        <QRCodeSVG value={`https://wedding-invitation2.vercel.app/${groupId}`} id={groupId} />
      </div>
      <button onClick={generatePDF}>Download svg</button>
    </div>
  );
};

export default DownloadQR;
