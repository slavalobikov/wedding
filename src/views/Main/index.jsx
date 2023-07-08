import { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import AppwriteService from '../../services/AppwriteService.js';
import styles from './main.module.scss';
import { ColorSchema, Overlay, Questionire, SelectInput } from '../../components';

const Main = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [guestId, setGuestId] = useState('');

  const [questionireLoading, setQuestionireLoading] = useState(true);

  const options = useMemo(
    () => group?.guests.map((guest) => ({ value: guest.guestId, label: guest.guestName })),
    [group],
  );

  useEffect(() => {
    if (id) {
      AppwriteService.getGuestGroups({ groupIds: [id] }, (res) => setGroup(res[0]));
    }
  }, [id]);

  useEffect(() => {
    AppwriteService.getQuestions(setQuestions);
  }, []);

  useEffect(() => {
    if (options) {
      setGuestId(options[0].value);
    }
  }, [options]);

  const onSelectChange = (value) => {
    setQuestionireLoading(true);
    setGuestId(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header />
        <h3 className={styles.welcomeText}>{group?.welcomeText}</h3>
        <br />
        <div>
          <b>25 августа</b> в нашей жизни произойдет важное событие - <b>СВАДЬБА!</b>
          <br />
          <br />В этот день мы бы очень хотели видеть {group?.appeal?.[1] || 'вас'} среди гостей нашего праздника ❤️
          <br />
          <br />
          Сбор гостей - <b>15:00</b>
          <br />
          Выездная регистрация - <b>15:30</b>
          <br />
          📍
          <a
            rel='noreferrer'
            target='_blank'
            href='https://www.google.com/maps/place/%D0%97%D0%B0%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BD%D0%BE-%D0%B3%D0%BE%D1%81%D1%82%D0%B8%D0%BD%D0%B8%D1%87%D0%BD%D1%8B%D0%B9+%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81+Royal+Park/@53.814876,30.2287464,17z/data=!4m6!3m5!1s0x46d05696af267bc9:0x3900a0ef58241428!8m2!3d53.814876!4d30.2309351!16s%2Fg%2F1pp2wwzvp?entry=ttu'
            style={{ textDecoration: 'underline', color: '#9D8189' }}
          >
            Загородно-гостиничный комплекс Royal Park
          </a>
          <br />
          <br />
          Ниже {group?.appeal?.[1] || 'вас'} ждут все подробности, а также несколько вопросов, чтобы сделать{' '}
          {group?.appeal?.[3] || 'ваше'} пребывание на свадьбе максимально комфортным 🥰
        </div>
        <br />
        <div className={styles.questionire}>
          {options?.length > 1 && (
            <SelectInput
              style={styles.guestSelect}
              question='Пожалуйста, не забудьте выбрать гостя, который отвечает на вопросы'
              options={options}
              onSelectChange={({ value }) => onSelectChange(value)}
              value={options && (options.find(({ value }) => value === guestId) || options[0])}
              disabledOptions={[guestId]}
            />
          )}
          {!options && !group && <Overlay style={styles.overlay} overlayText='Подождите...' />}
        </div>
        <div className={styles.questionire}>
          <Questionire questions={questions} guestId={guestId} overlayCallback={setQuestionireLoading} />
          {(!guestId || questionireLoading) && <Overlay style={styles.overlay} overlayText='Подождите...' />}
        </div>
        <br />
        <div>
          Для гостей свадьбы будет организован трансфер Минск - Могилев (25.08) и Могилев - Минск (26.08)
          <br />
          <br />
          Вся информация о трансфере и размещении будет предоставлена индивидуально не позднее 7 дней до свадьбы
          <br />
          <br />
          <ColorSchema />
          <br />
          Дресс-код для мужчин: ✨классический✨
          <br />
          <br />
          Просим {group?.appeal?.[1] || 'вас'} не дарить нам цветы, поскольку мы не успеем насладиться их красотой.
          <br />
          Вместо этого мы будем рады бутылочке алкогольного напитка на {group?.appeal?.[4] || 'ваш'} вкус, которая позже
          будет задействована в интерактиве 😉
          <br />
          <br />
          Просим подтвердить {group?.appeal?.[3] || 'ваше'} присутствие любым удобным {group?.appeal?.[2] || 'вам'}{' '}
          способом <b>не позднее 05.08.2023</b>
          <br />
          <br />
          Наш координатор с удовольствием ответит на любые вопросы, которые могут возникнуть в день свадьбы 😊
          <br />
          <br />
          <a href='tel:+375293130356' style={{ textDecoration: 'underline', color: '#9D8189' }}>
            +375293130356
          </a>{' '}
          <b>Ольга</b>
        </div>
      </div>
    </div>
  );
};

export default Main;
