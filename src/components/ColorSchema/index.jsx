import styles from './ColorSchema.module.css';

const ColorSchema = () => {
  return (
    <div>
      <p>Для облегчения выбора нарядов ниже представлена цветовая палитра свадьбы</p>
      <div className={styles.colorSchema}>
        {['#f3dcd4', '#ecc9c7', '#d9e3da', '#d1cfc0', '#c2c2b4'].map((color) => (
          <div key={color} style={{ backgroundColor: color }} className={styles.colorSchemaElement} />
        ))}
      </div>
    </div>
  );
};

export default ColorSchema;
