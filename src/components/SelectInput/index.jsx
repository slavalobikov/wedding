import Select from 'react-select';

const SelectInput = ({ options, question, changeCallback, isMulty, ...selectProps }) => {
  return (
    <div>
      {question}
      <Select
        onChange={changeCallback}
        hideSelectedOptions={isMulty}
        closeMenuOnSelect={!isMulty}
        blurInputOnSelect={!isMulty}
        placeholder={isMulty ? 'Выберите несколько вариантов' : 'Выберите один вариант ответа'}
        isMulti={isMulty}
        options={options}
        {...selectProps}
      />
    </div>
  );
};

export default SelectInput;
