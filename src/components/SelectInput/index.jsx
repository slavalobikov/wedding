import Select from 'react-select'

const SelectInput = ({ options, question, changeCallback, isMulty}) => {
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
      />
    </div>
  )
}

export default SelectInput;
