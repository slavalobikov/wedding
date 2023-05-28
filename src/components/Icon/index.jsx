import React from 'react';
import spriteIcons from './sprite-icons.svg';
import styles from '../../style/_common.scss';

const Icon = ({ iconName, iconWidth, iconHeight, fill }) => {
  return (
    <svg className={styles.icons} width={iconWidth} height={iconHeight} fill={fill}>
      <use xlinkHref={`${spriteIcons}#${iconName}`} />
    </svg>
  );
}

export default Icon;
