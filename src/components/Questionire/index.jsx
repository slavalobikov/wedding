import { useCallback, useEffect, useMemo, useState } from 'react';
import SelectInput from '../SelectInput';
import Icon from '../Icon';
import styles from './Questionire.module.scss';
import AppwriteService from '../../services/AppwriteService';
import Input from '../Input';
import Overlay from '../Overlay';
import Button from '../Button';
import { arrayEquals } from '../../utils';

const Questionire = ({ questions: initQuestions, guestId, overlayCallback }) => {
  const [questions, setQuestions] = useState([]);
  const [toRemove, setToRemove] = useState([]);
  const [submitData, setSubmitData] = useState([]);

  const [guestValues, setGuestValues] = useState([]);
  const [initGuestValues, setinitGuestValues] = useState([]);
  const [globalValues, setGlobalValues] = useState([]);
  const [initGlobalValues, setInitGlobalValues] = useState([]);

  useEffect(() => {
    setQuestions([...initQuestions]);
  }, [initQuestions]);

  useEffect(() => {
    if (guestId) {
      setGuestValues([]);
      setGlobalValues([]);
      setinitGuestValues([]);
      setInitGlobalValues([]);
      setSubmitData([]);
      AppwriteService.getGuest(guestId, (guest) => {
        guest.answers.forEach((answer) => {
          const { questionId, questionTitle, answers } = JSON.parse(answer);
          const allowMultyAnswer = initQuestions.find((question) => question.$id === questionId)?.allowMultyAnswer;

          setinitGuestValues((prev) => [
            ...prev,
            { questionId, options: answers.map((el) => ({ value: el, label: el })) },
          ]);

          setGuestValues((prev) => [...prev, { questionId, options: answers.map((el) => ({ value: el, label: el })) }]);
          setSubmitData((prev) => [
            ...prev.filter((el) => el.questionId !== questionId),
            { questionId, questionTitle, answers, allowMultyAnswer },
          ]);
        });
        overlayCallback && overlayCallback(false);
      });
    } else {
      const allAnswers = [];
      initQuestions?.forEach(({ answers, $id: questionId, questionTitle, allowMultyAnswer }) => {
        allAnswers.push({ answers, questionId, questionTitle, allowMultyAnswer });
        setGlobalValues((prev) => [
          ...prev.filter((el) => el.questionId !== questionId),
          { questionId, options: answers.map((el) => ({ value: el, label: el })) },
        ]);

        setInitGlobalValues((prev) => [
          ...prev.filter((el) => el.questionId !== questionId),
          { questionId, options: answers.map((el) => ({ value: el, label: el })) },
        ]);
      });
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

  const getGlobalOptions = useCallback(
    (questionId) => globalValues.find((el) => el.questionId === questionId)?.options,
    [globalValues],
  );

  const onSelectChange = useCallback(
    (e, allowMultyAnswer, questionId, isGuest) => {
      const answers = allowMultyAnswer ? e.map((el) => el.value) : [e.value];

      const value = [...(isGuest ? guestValues : globalValues)].find((el) => el.questionId === questionId);
      const setCallback = (data) => (isGuest ? setGuestValues(data) : setGlobalValues(data));

      setCallback((prev) => [
        ...prev.filter((el) => el.questionId !== questionId),
        { ...value, options: answers.map((el) => ({ value: el, label: el })) },
      ]);

      onChange({ answers, questionId });
    },
    [guestValues, globalValues],
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

  const submitDisabled = useMemo(() => {
    const initValues = guestId ? [...initGuestValues] : [...initGlobalValues];
    const values = guestId ? [...guestValues] : [...globalValues];

    return (
      values.some((value) => value.options.length === 0) ||
      initValues.every(({ questionId, options: initOptions }) => {
        const options = values.find((value) => value.questionId === questionId)?.options;

        return arrayEquals(initOptions, options);
      })
    );
  }, [guestId, initGuestValues, guestValues, initGlobalValues, globalValues]);

  return (
    <div className={styles.container}>
      {questions?.map(({ $id: questionId, allowMultyAnswer, answers, questionTitle }, index) => {
        const options = answers.map((answer) => ({ value: answer, label: answer }));
        const values = guestId ? getGuestOptions(questionId) : getGlobalOptions(questionId);
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
                onSelectChange={(e) => onSelectChange(e, allowMultyAnswer, questionId, !!guestId)}
                onQuestionChange={({ target: { value } }) => onChange({ questionTitle: value, questionId })}
                options={options}
                canUpdated={!guestId}
                value={values}
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
      <Button text='Сохранить' style={styles.submit} onClick={onSubmit} disabled={submitDisabled} />
    </div>
  );
};

export default Questionire;
