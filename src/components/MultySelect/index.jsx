import Select from 'react-select'

const MultySelect = ({ options, question, changeCallback }) => {
  return (
    <div>
      {question} (выберите несколько вариантов)
      <Select
        onChange={changeCallback}
        //closeMenuOnSelect={false}
        //blurInputOnSelect={true}
        hideSelectedOptions={true}
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        placeholder='Выберите несколько вариантов'
        isMulti
        options={options}
      />
    </div>
  )
}

export default MultySelect
