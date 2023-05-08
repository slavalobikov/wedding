import Select from "react-select";

const MultySelect = ({options, question, changeCallback, value}) => {
    return <div>
        {question} (выберите несколько вариантов)
        <Select
            onChange={changeCallback}
            hideSelectedOptions={true}
            closeMenuOnSelect={false}
            blurInputOnSelect={false}
            placeholder='Выберите несколько вариантов'
            isMulti
            options={options}
            value={value}
        />
    </div>
}

export default MultySelect;