import React from 'react';
import spriteIcons from './sprite-icons.svg';
import styles from '../../style/_common.scss';

const Icon = ({ iconName, iconWidth, iconHeight }) => {
  return (
    <svg className={styles.icons} width={iconWidth} height={iconHeight}>
      <use xlinkHref={`${spriteIcons}#${iconName}`} />
    </svg>
  );
};

export default Icon;
