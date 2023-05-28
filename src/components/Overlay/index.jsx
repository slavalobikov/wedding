import styles from './Overlay.module.scss';

const Overlay = ({ overlayText, onClick, style }) => {
  return (
    <div className={`${style} ${styles.overlay}`} onClick={onClick}>
      {overlayText}
    </div>
  );
};

export default Overlay;
