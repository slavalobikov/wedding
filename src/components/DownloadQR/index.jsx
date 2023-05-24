import React, { useRef } from 'react';
import classes from './downloadQR.module.scss';
import QRcode from 'qrcode.react';
import { jsPDF } from 'jspdf';

const DownloadQR = ({ id }) => {
  const qr = useRef(null);

  const generatePDF = () => {
    let pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [20, 20],
    });

    let base64Image = qr?.current?.children?.[0]?.toDataURL();
    pdf.addImage(base64Image, 'png', 0, 0, 20, 20);
    pdf.save(`QR_${id}.pdf`);
  };

  return (
    <div>
      <div className={classes.qr} ref={qr}>
        <QRcode value={`${window.origin}/${id}`} id={id} />
      </div>
      <button onClick={generatePDF}>Download pdf</button>
    </div>
  );
};

export default DownloadQR;
