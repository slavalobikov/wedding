import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './downloadQR.module.scss';
import QRcode from 'qrcode.react';
import { jsPDF } from 'jspdf';
import Icon from '../Icon';

const DownloadQR = ({ id, groupName }) => {
  const qr = useRef(null);

  const [shortenedUrl, setShortenedUrl] = useState('');

  const shortenUrl = useCallback(() => {
    fetch(`https://api.shrtco.de/v2/shorten?url=https://wedding-invitation2.vercel.app/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setShortenedUrl(data.result.full_short_link);
      });
  }, [id]);

  useEffect(() => {
    !shortenedUrl && shortenUrl();
  }, [shortenUrl, shortenedUrl]);

  const generatePDF = () => {
    let pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [20, 20],
    });

    let base64Image = qr?.current?.children?.[0]?.toDataURL();
    pdf.addImage(base64Image, 'jpeg', 0, 0, 20, 20);
    pdf.save(`QR_${groupName}_${id}.pdf`);
  };

  return (
    <div>
      <div className={classes.qr} ref={qr}>
        <QRcode value={"https://shrtco.de/aAqRMH"} />
      </div>
      <div onClick={generatePDF}>
        <Icon iconName='download' iconHeight={12} iconWidth={15} />
      </div>
    </div>
  );
};

export default DownloadQR;
