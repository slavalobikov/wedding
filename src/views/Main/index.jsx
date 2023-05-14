import React, { useState } from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import SingleSelect from '../../components/SingleSelect'
import MultySelect from '../../components/MultySelect'
import { ID } from 'appwrite'
import AppwriteService from '../../services/AppwriteService.js'

const Main = () => {
  const params = useParams()
  console.log('params', params['*'])

  const [name, setName] = useState('')
  const [welcomeText, setWelcomeText] = useState('')
  const [priority, setPiority] = useState('')

  const onNameChange = ({ target: { value } }) => {
    setName(value)
  }

  const onWelcomeChange = ({ target: { value } }) => {
    setWelcomeText(value)
  }

  const onPriorityChange = ({ target: { value } }) => {
    setPiority(value)
  }

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
      <Header />
      <input type='text' value={name} onChange={onNameChange} placeholder='name' />
      <input type='text' value={welcomeText} onChange={onWelcomeChange} placeholder='welcome' />
      <input type='text' value={priority} onChange={onPriorityChange} placeholder='priority' />
      <button onClick={onNameSubmit}>submit</button>
      <button onClick={() => AppwriteService.deleteSession()}>delete session</button>
      <div>
        В верхней части страницы находится индивидуальное обращение. Если его нет, то вместо него выводится
        “Дорогой/ая/ие” и имя/имена гостя/гостей. Первая часть обращения выводится в зависимости от пола гостя
        (“дорогой” для мужского, “дорогая” для женского) или для группы гостей (“дорогие”).
      </div>
      <div>Далее размещена подробная информация о дате, месте проведения и остальных деталях мероприятия</div>
      <div>
        <SingleSelect
          question='Ваше самое любимое блюдо?'
          changeCallback={(e) => console.log(e)}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ]}
        />
        <MultySelect
          question='Какие ваши любимые пары года?'
          changeCallback={(e) => console.log(e)}
          options={[
            { value: 'Spring', label: 'Spring' },
            { value: 'Summer', label: 'Summer' },
            { value: 'Autumn', label: 'Autumn' },
            { value: 'Autumn1', label: 'Autumn' },
            { value: 'Autumn2', label: 'Autumn' },
            { value: 'Autumn3', label: 'Autumn' },
            { value: 'Autumn4', label: 'Autumn' },
            { value: 'Autumn5', label: 'Autumn' },
            { value: 'Autumn6', label: 'Autumn' },
            { value: 'Autumn7', label: 'Autumn' },
            { value: 'Autumn8', label: 'Autumn' },
            { value: 'Autumn9', label: 'Autumn' },
            { value: 'Autumn10', label: 'Autumn' },
            { value: 'Autumn11', label: 'Autumn' },
            { value: 'Autumn12', label: 'Autumn' },
            { value: 'Autumn13', label: 'Autumn' },
            { value: 'Autumn14', label: 'Autumn' },
            { value: 'Autumn15', label: 'Autumn' },
            { value: 'Autumn16', label: 'Autumn' },
            { value: 'Autumn17', label: 'Autumn' },
            { value: 'Autumn18', label: 'Autumn' },
            { value: 'Autumn19', label: 'Autumn' },
            { value: 'Autumn20', label: 'Autumn' },
            { value: 'Autumn21', label: 'Autumn' },
            { value: 'Autumn22', label: 'Autumn' },
            { value: 'Autumn23', label: 'Autumn' },
            { value: 'Autumn24', label: 'Autumn' },
            { value: 'Autumn25', label: 'Autumn' },
            { value: 'Autumn26', label: 'Autumn' },
            { value: 'Autumn27', label: 'Autumn' },
            { value: 'Autumn28', label: 'Autumn' },
            { value: 'Autumn29', label: 'Autumn' },
            { value: 'Autumn30', label: 'Autumn' },
            { value: 'Autumn31', label: 'Autumn' },
            { value: 'Autumn32', label: 'Autumn' },
            { value: 'Autumn33', label: 'Autumn' },
            { value: 'Autumn34', label: 'Autumn' },
            { value: 'Autumn35', label: 'Autumn' },
            { value: 'Autumn36', label: 'Autumn' },
            { value: 'Autumn37', label: 'Autumn' },
            { value: 'Autumn38', label: 'Autumn' },
            { value: 'Autumn39NH', label: 'Autumn' },
            { value: 'Winter', label: 'Winter' },
          ]}
        />
      </div>
    </>
  )
}

export default Main
