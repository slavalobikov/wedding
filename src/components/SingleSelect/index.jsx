import Select from "react-select";


const SingleSelect = ({question, changeCallback, options, defaultValue}) => {
    const changeValue = (e) => {
        changeCallback(e)
    }

    return <div>
        <div>{question}</div>
        <Select placeholder='Выберите один вариант' defaultValue={defaultValue} onChange={changeValue} options={options} />
    </div>
}

export default SingleSelect;