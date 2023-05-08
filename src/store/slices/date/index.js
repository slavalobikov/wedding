import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questionnaire: [
        {
            id: 0,
            isMulti: false,
            question: 'Какая ваша самая любимая пора года?',
            options: [
                {value: 'Q1A1', label: 'Лето'},
                {value: 'Q1A2', label: 'Осень'},
                {value: 'Q1A3', label: 'Зима'},
                {value: 'Q1A4', label: 'Весна'},
            ],
            answer: null,
        },
        {
            id: 1,
            isMulti: true,
            question: 'Какие варианты наиболее предпочтительные?',
            options: [
                {value: 'Q2A1', label: 'Порыбачить на яхте'},
                {value: 'Q2A2', label: 'Поохотиться на кабана (Ефимика)'},
                {value: 'Q2A3', label: 'Поиграть в доту'},
                {value: 'Q2A4', label: 'Почилить на свадьбе'},
            ],
            answer: {value: 'Q2A2', label: 'Поохотиться на кабана (Ефимика)'},
        }
    ]
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        changeAnswer: (state, {payload}) => {
            state.questionnaire[payload.index].answer = payload.answer
        }
    },
});

export const {
    changeAnswer
} = dateSlice.actions;

export default dateSlice.reducer;
