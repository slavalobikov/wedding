import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import Input from '../Input';
import styles from './SelectInput.module.scss';

const SelectInput = ({
  style,
  options,
  question,
  // defaultValues,
  canUpdated,
  onSelectChange,
  onQuestionChange,
  isMulty,
  ...selectProps
}) => {
  const RenderComponent = canUpdated ? CreatableSelect : Select;
  return (
    <div className={`${style} ${styles.container}`}>
      <div className={styles.question}>
        {canUpdated ? <Input defaultValue={question} onChange={onQuestionChange} /> : question}
      </div>
      <RenderComponent
        theme={(theme) => ({
          ...theme,
          borderRadius: 16,
          colors: {
            ...theme.colors,
            primary25: '#D8E2DC',
            neutral20: '#D8E2DC',
            neutral50: '#9D8189',
            neutral60: '#D8E2DC',
          },
        })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            boxShadow: 'none',
          }),
        }}
        onChange={onSelectChange}
        hideSelectedOptions={isMulty}
        closeMenuOnSelect={!isMulty}
        blurInputOnSelect={!isMulty}
        // defaultValue={defaultValues}
        placeholder={isMulty ? 'Выберите несколько вариантов' : 'Выберите один вариант ответа'}
        isMulti={isMulty}
        options={options}
        {...selectProps}
      />
    </div>
  );
};

export default SelectInput;
