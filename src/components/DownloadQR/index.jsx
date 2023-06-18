import React, { useEffect, useRef, useState } from 'react';
import classes from './downloadQR.module.scss';
import QRcode from 'qrcode.react';
import { jsPDF } from 'jspdf';
import Icon from '../Icon';

const DownloadQR = ({ id, groupName }) => {
  const qr = useRef(null);

  const [shortenedUrl, setShortenedUrl] = useState('');

  useEffect(() => {
    const shortenUrl = async () => {
      try {
        const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${window.origin}/${id}`);
        const data = await response.json();
        setShortenedUrl(data.result.full_short_link);
      } catch (e) {
        console.log('e', e);
      }
    };

    shortenUrl();
  }, [id]);

  const generatePDF = () => {
    let pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [20, 20],
    });

    let base64Image = qr?.current?.children?.[0]?.toDataURL();
    pdf.addImage(base64Image, 'png', 0, 0, 20, 20);
    pdf.save(`QR_${groupName}_${id}.pdf`);
  };

  return (
    <div>
      <div className={classes.qr} ref={qr}>
        <QRcode value={shortenedUrl} id={id} />
      </div>
      <div onClick={generatePDF}>
        <Icon iconName='download' iconHeight={12} iconWidth={15} />
      </div>
    </div>
  );
};

export default DownloadQR;
