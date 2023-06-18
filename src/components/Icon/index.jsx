import React from 'react';
import spriteIcons from './sprite-icons.svg';
import styles from '../../style/_common.scss';

const Icon = ({ style, iconName, iconWidth, iconHeight, fill }) => {
  return (
    <svg className={`${style} ${styles.icons}`} width={iconWidth} height={iconHeight} fill={fill}>
      <use xlinkHref={`${spriteIcons}#${iconName}`} />
    </svg>
  );
};

export default Icon;
