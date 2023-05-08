import Header from "../../components/Header";
import {useParams} from "react-router-dom";
import SingleSelect from "../../components/SingleSelect";
import MultySelect from "../../components/MultySelect";
import {useDispatch, useSelector} from "react-redux";
import {selectors} from "../../store/selectors";
import {changeAnswer} from "../../store/slices/date";

const Main = () => {
    const dispatch = useDispatch();
    const params = useParams()
    console.log('params', params['*'])
    const questionnaire = useSelector(selectors.questionnaire)

    console.log('questionnaire', questionnaire)
    return <>
        <Header/>
        <div>
            В верхней части страницы находится индивидуальное обращение. Если его нет, то вместо него выводится
            “Дорогой/ая/ие” и имя/имена гостя/гостей. Первая часть обращения выводится в зависимости от пола гостя
            (“дорогой” для мужского, “дорогая” для женского) или для группы гостей (“дорогие”).
        </div>
        <div>
            Далее размещена подробная информация о дате, месте проведения и остальных деталях мероприятия
        </div>
        <div>
            {questionnaire.map((el, index) => {
                return <div key={el.id}>
                    {el.isMulti
                        ? <MultySelect
                            value={el.answer}
                            question={el.question}
                            changeCallback={(e) => dispatch(changeAnswer({index, answer: e}))}
                            options={el.options}
                        />
                        : <SingleSelect
                            question={el.question}
                            changeCallback={(e) => dispatch(changeAnswer({index, answer: e}))}
                            options={el.options}
                            value={el.answer}
                    />}
                </div>

            })}
        </div>
    </>
};

export default Main;