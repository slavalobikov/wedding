import { useCallback, useEffect, useState } from 'react';
import SelectInput from '../SelectInput';
import Icon from '../Icon';
import styles from './Questionire.module.scss';
import AppwriteService from '../../services/AppwriteService';
import Input from '../Input';
import Overlay from '../Overlay';

const Questionire = ({ questions: initQuestions, guestId }) => {
  const [submitData, setSubmitData] = useState([]);

  const [guestValues, setGuestValues] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [toRemove, setToRemove] = useState([]);

  useEffect(() => {
    setQuestions([...initQuestions]);
  }, [initQuestions]);

  useEffect(() => {
    if (guestId) {
      setGuestValues([]);
      setSubmitData([]);
      AppwriteService.getGuest(guestId, (guest) =>
        guest.answers.forEach((answer) => {
          const { questionId, questionTitle, answers } = JSON.parse(answer);
          const allowMultyAnswer = initQuestions.find((question) => question.$id === questionId)?.allowMultyAnswer;

          setGuestValues((prev) => [...prev, { questionId, options: answers.map((el) => ({ value: el, label: el })) }]);
          setSubmitData((prev) => [
            ...prev.filter((el) => el.questionId !== questionId),
            { questionId, questionTitle, answers, allowMultyAnswer },
          ]);
        }),
      );
    } else {
      const allAnswers = [];
      initQuestions?.forEach(({ answers, $id: questionId, questionTitle, allowMultyAnswer }) =>
        allAnswers.push({ answers, questionId, questionTitle, allowMultyAnswer }),
      );
      setSubmitData(allAnswers);
    }
  }, [guestId, initQuestions]);

  const onChange = ({ questionId, questionTitle, answers, allowMultyAnswer }) => {
    setSubmitData((prev) => {
      const {
        questionTitle: resQuestionTitle,
        allowMultyAnswer: resAllowMultyAnswer,
        answers: resAnswers,
      } = guestId ? questions.find((el) => el.$id === questionId) : prev?.find((el) => el.questionId === questionId);
      const initTitle = resQuestionTitle;
      const initAllowMulti = resAllowMultyAnswer;
      const initAnswers = resAnswers;

      const data = {
        questionTitle: questionTitle || initTitle,
        allowMultyAnswer: allowMultyAnswer !== undefined ? allowMultyAnswer : initAllowMulti,
        answers: answers?.length ? answers : initAnswers,
        questionId,
      };

      return [...prev.filter((el) => el.questionId !== questionId), data];
    });
  };

  const onSubmit = () => {
    AppwriteService.updateQuestionire({
      questions: [...submitData.map((question) => ({ ...question, toDelete: toRemove.includes(question.questionId) }))],
      guestId,
    });
  };

  const getGuestOptions = useCallback(
    (questionId) => guestValues.find((el) => el.questionId === questionId)?.options,
    [guestValues],
  );

  const onSelectChange = useCallback(
    (e, allowMultyAnswer, questionId) => {
      const answers = allowMultyAnswer ? e.map((el) => el.value) : [e.value];

      const guestValue = guestValues.find((el) => el.questionId === questionId);
      setGuestValues((prev) => [
        ...prev.filter((el) => el.questionId !== questionId),
        { ...guestValue, options: answers.map((el) => ({ value: el, label: el })) },
      ]);
      onChange({ answers, questionId });
    },
    [guestValues],
  );

  const onAddMore = () => {
    const $id = `${++questions.length}`;
    const question = {
      $id,
      questionTitle: `Новый вопрос ${$id}`,
      allowMultyAnswer: true,
      answers: ['Новый ответ 1'],
    };
    setQuestions((prev) => [...prev, question].filter((el) => !!el));
  };

  return (
    <div className={styles.container}>
      {questions?.map(({ $id: questionId, allowMultyAnswer, answers, questionTitle }, index) => {
        const options = answers.map((answer) => ({ value: answer, label: answer }));
        const defaultValues = guestId ? getGuestOptions(questionId) : options;
        return (
          <>
            <div key={questionId} className={styles.question}>
              {!guestId && (
                <div className={styles.removeBtn} onClick={() => setToRemove((prev) => [...prev, questionId])}>
                  <Icon iconName='cross' iconHeight='12px' iconWidth='12px' />
                </div>
              )}
              <SelectInput
                isMulty={guestId ? allowMultyAnswer : true}
                question={questionTitle}
                onSelectChange={(e) => onSelectChange(e, allowMultyAnswer, questionId)}
                onQuestionChange={({ target: { value } }) => onChange({ questionTitle: value, questionId })}
                options={options}
                canUpdated={!guestId}
                value={defaultValues}
              />
              {!guestId && (
                <div className={styles.allowMulti}>
                  <Input
                    type='checkbox'
                    defaultChecked={allowMultyAnswer}
                    id={`${questionId}-checkbox`}
                    onChange={({ target: { checked } }) => onChange({ allowMultyAnswer: checked, questionId })}
                  />
                  <label htmlFor={`${questionId}-checkbox`}>{`Allow multi answer for ${questionTitle}`}</label>
                </div>
              )}

              {toRemove.includes(questionId) && (
                <Overlay
                  style={styles.overlay}
                  overlayText={`Нажмите, чтобы вернуть ${questionTitle}`}
                  onClick={() => setToRemove((prev) => prev.filter((el) => el !== questionId))}
                />
              )}
              {index !== questions.length - 1 && <hr className={styles.devider} />}
            </div>
          </>
        );
      })}
      {!guestId && (
        <div className={styles.addMoreContainer} onClick={onAddMore}>
          <Icon iconName='plus' iconHeight='12px' iconWidth='12px' />
          <p>Добавить вопрос</p>
        </div>
      )}
      <button onClick={onSubmit} className={styles.submit}>
        Сохранить
      </button>
    </div>
  );
};

export default Questionire;
