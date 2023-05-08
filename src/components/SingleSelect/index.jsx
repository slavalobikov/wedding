import Select from "react-select";


const SingleSelect = ({question, changeCallback, options, value}) => {
    const changeValue = (e) => {
        changeCallback(e)
    }

    return <div>
        <div>{question}</div>
        <Select placeholder='Выберите один вариант' value={value} onChange={changeValue} options={options} />
    </div>
}

export default SingleSelect;