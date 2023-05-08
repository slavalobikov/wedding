import { combineReducers, configureStore } from '@reduxjs/toolkit';

/*import userSlice from './userSlice';
import authSlice from './slices/auth';
import profileSlice from './slices/profile/profile';*/
import dateSlice from './slices/date/'

const rootReducer = combineReducers({
    date: dateSlice,
/*    user: userSlice,
    auth: authSlice,
    profile: profileSlice,*/

});

export const store = configureStore({
    reducer: rootReducer,
});