import Icon from '../Icon';
import styles from './Button.module.scss';

const Button = ({ style, text, onClick, icon, iconSize = '12px', disabled }) => {
  return (
    <button className={`${style} ${styles.button}`} onClick={onClick} disabled={disabled}>
      {icon && <Icon style={styles.icon} iconName={icon} iconHeight={iconSize} iconWidth={iconSize} />}
      {text}
    </button>
  );
};

export default Button;
