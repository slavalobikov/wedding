import styles from './Button.module.scss';

const Button = ({ style, text, onClick, icon, disabled }) => {
  return (
    <button className={`${style} ${styles.button}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
