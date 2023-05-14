import {useEffect, useState} from 'react'
import Header from '../../components/Header'
import {useParams} from 'react-router-dom'
import AppwriteService from '../../services/AppwriteService.js'
import SelectInput from "../../components/SelectInput";

const Main = () => {
    const params = useParams()
    console.log('params', params['*'])
    const [question, setQuestion] = useState([])

    const [name, setName] = useState('')
    const [welcomeText, setWelcomeText] = useState('')
    const [priority, setPiority] = useState('')

    const onNameChange = ({target: {value}}) => {
        setName(value)
    }

    const onWelcomeChange = ({target: {value}}) => {
        setWelcomeText(value)
    }

    const onPriorityChange = ({target: {value}}) => {
        setPiority(value)
    }

    useEffect(() => {
        AppwriteService.getQuestions(setQuestion)
    }, [])
    const onNameSubmit = () => {
        // AppwriteService.addGuest(name, welcomeText)
        AppwriteService.createGuest({
            welcomeText,
            priority,
            guestName: name,
            // groupId: '4297dc53-606d-4155-b849-6af5ee813216',
        })
    }

    return (
        <>
            <Header/>
            <input type='text' value={name} onChange={onNameChange} placeholder='name'/>
            <input type='text' value={welcomeText} onChange={onWelcomeChange} placeholder='welcome'/>
            <input type='text' value={priority} onChange={onPriorityChange} placeholder='priority'/>
            <button onClick={onNameSubmit}>submit</button>
            <button onClick={() => AppwriteService.deleteSession()}>delete session</button>
            <div>
                В верхней части страницы находится индивидуальное обращение. Если его нет, то вместо него выводится
                “Дорогой/ая/ие” и имя/имена гостя/гостей. Первая часть обращения выводится в зависимости от пола гостя
                (“дорогой” для мужского, “дорогая” для женского) или для группы гостей (“дорогие”).
            </div>
            <div>Далее размещена подробная информация о дате, месте проведения и остальных деталях мероприятия</div>
            <div>
                <div>
                    {question?.map(el => <SelectInput
                        key={1}
                        isMulty={el?.allowMiltyAnswer}
                        question={el?.questionTitle}
                        changeCallback={(e) => console.log(e)}
                        options={el?.answers?.map(an => {
                            return {
                                value: an,
                                label: an,
                            }
                        })}
                        /*                        options={[
                                                    {value: 'chocolate', label: 'Chocolate'},
                                                    {value: 'strawberry', label: 'Strawberry'},
                                                    {value: 'vanilla', label: 'Vanilla'},
                                                ]}*/
                    />)}
                </div>
            </div>
        </>
    )
}

export default Main
