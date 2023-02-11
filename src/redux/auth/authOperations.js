import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';





//! axios defaults baseURL
// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
// axios.defaults.baseURL = 'http://localhost:3000/api';
// axios.defaults.baseURL = 'http://192.168.99.100:3000/api';
axios.defaults.baseURL = 'https://contact-book-backend52.onrender.com/api';

//! Utility to add JWT
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWY0M2MwZTU4YTUxZTk1YTJjOWZmYiIsImVtYWlsIjoiNzc3QHVrci51YSIsImlhdCI6MTY3MjczNjU5OH0.PRqM0mjhkFR-oZ9rg_rEVPd5dIYSIxIt5AroRBeI9sw`;
};

//! Utility to remove JWT
const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = "";
};

/*
    todo POST @ /users/signup --> OLD
 * POST @ /users/signup
 * body: { name, email, password }
 * После успешной регистрации добавляем токен в HTTP-заголовок
 */
//! Создать нового пользователя
export const register = createAsyncThunk(
    'auth/signup',
    async (credentials, thunkAPI) => {
        const { email } = credentials
        try {
            const res = await axios.post('/users/signup', credentials);
            console.log("res.data.token:", res.data.token); //!
            setAuthHeader(res.data.token);
            console.log("auth/signup --> res.data:", res.data); //!
            console.log("auth/signup --> res.data.user:", res.data.user); //!
            console.log("auth/signup --> res.data.user:", res.data.user.avatarURL); //!
            return res.data; //??
        } catch (error) {
            console.log(error); //!

            if (error.message === "Request failed with status code 409") {
                toast.error(`Email ${email} in use`, { position: "top-center", autoClose: 2000 });
                console.log(`Email ${email} уже используется`); //!
                return thunkAPI.rejectWithValue(error.message);
            };
            if (error.message === "Request failed with status code 400") {
                toast.error(`User creation error`, { position: "top-center", autoClose: 2000 });
                console.log(`Ошибка создания пользователя`); //!
                return thunkAPI.rejectWithValue(error.message);
            };
            toast.error(error.message, { position: "top-center", autoClose: 2000 });
            console.log(error.message); //!
            // toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 400" ? "Ошибка создания пользователя" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * POST @ /users/login
 * body: { email, password }
 * После успешного логина добавляем токен в HTTP-заголовок
 */
//! Залогинить пользователя
export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('/users/login', credentials);
            console.log("res.data.token:", res.data.token); //!
            setAuthHeader(res.data.token);
            console.log("auth/login --> res.data:", res.data); //!
            console.log("auth/login --> res.data.user:", res.data.user); //!
            return res.data;
        } catch (error) {
            console.log(error); //!

            if (error.message === "Request failed with status code 400") {
                toast.error(`Login failed. Enter email and password`, { position: "top-center", autoClose: 2000 });
                console.log('Ошибка входа. Введите еmail и пароль...'); //!
                return thunkAPI.rejectWithValue(error.message);
            };
            if (error.message === "Request failed with status code 401") {
                toast.error(`Login failed. Email or password is incorrect`, { position: "top-center", autoClose: 2000 });
                console.log('Email или пароль неверны. Попробуйте снова...'); //!
                return thunkAPI.rejectWithValue(error.message);
            };
            toast.error(error.message, { position: "top-center", autoClose: 2000 });
            console.log(error.message); //!
            // toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 400" ? "Ошибка входа" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 * После успешного логаута, удаляем токен из HTTP-заголовка
 */
//! Разлогинить пользователя
export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            // await axios.post('/users/logout'); //??
            const res = await axios.get('/users/logout');
            clearAuthHeader();
            console.log("auth/logout --> res.data.status:", res.data.status); //!
            console.log("auth/logout --> res.data.user:", res.data.user); //!
            console.log("auth/logout --> res.data.user.token:", res.data.user.token); //!
        } catch (error) {
            console.log(error); //!
            toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 401" ? "Отсутствует заголовок с токеном авторизации" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    });

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 * *
 * 1. Забираем токен из стейта через getState()
 * 2. Если токена нет, выходим не выполняя никаких операций
 * 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию
 */
//! Получить информацию о текущем пользователе
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;
        console.log('persistedToken:', persistedToken); //!

        if (persistedToken === null) {
            console.log('Токена нет, уходим из refreshUser'); //!
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            setAuthHeader(persistedToken);
            const res = await axios.get('/users/current');
            console.log("auth/refresh --> res.data.user:", res.data.user); //!
            //! Проверка на старый токен
            if (persistedToken !== res.data.user.token) {
                toast.error(`Ваш токен уже недействительный. Залогиньтесь снова!!!`, { position: "top-center", autoClose: 2000 });
                console.log('Ваш токен уже недействительный. Залогиньтесь снова!!!'); //!
                return thunkAPI.rejectWithValue('Your token is no longer valid. Login again');
            }
            // return res.data; //??
            return res.data.user;
        } catch (error) {
            console.log(error); //!

            if (error.message === "Request failed with status code 401") {
                toast.error(`Отсутствует заголовок с токеном авторизации`, { position: "top-center", autoClose: 2000 });
                return thunkAPI.rejectWithValue(error.message);
            };
            if (error.message === "Request failed with status code 500") {
                toast.error(`Токен удален, так как был недействительный!!!`, { position: "top-center", autoClose: 2000 });
                //! обнулить token в authSlice.js --> refreshUser.rejected
                clearAuthHeader();
                return thunkAPI.rejectWithValue(error.message);
            };
            // toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 401" ? "Отсутствует заголовок с токеном авторизации" : error.message}`, { position: "top-center", autoClose: 2000 });
            toast.error(error.message, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


//! Изменить Аватар пользователя
export const changeAvatar = createAsyncThunk(
    'auth/changeAvatar',
    async (credentials, thunkAPI) => {
        console.log("auth/changeAvatar --> credentials:", credentials); //!
        try {
            const { data } = await axios.patch('/users/avatars', credentials, { headers: { 'Content-Type': 'multipart/form-data' } });
            console.log("auth/changeAvatar --> data:", data); //!
            console.log("auth/login --> data.avatarURL:", data.avatarURL); //!
            console.log("auth/login --> data.avatarURL2:", data.avatarURL2); //!
            // console.log("auth/login --> res.data.user:", res.data.user); //!
            return data.avatarURL;
        } catch (error) {
            console.log(error); //!

            // if (error.message === "Request failed with status code 400") {
            //     toast.error(`Login failed. Enter email and password`, { position: "top-center", autoClose: 2000 });
            //     console.log('Ошибка входа. Введите еmail и пароль...'); //!
            //     return thunkAPI.rejectWithValue(error.message);
            // };
            // if (error.message === "Request failed with status code 401") {
            //     toast.error(`Login failed. Email or password is incorrect`, { position: "top-center", autoClose: 2000 });
            //     console.log('Email или пароль неверны. Попробуйте снова...'); //!
            //     return thunkAPI.rejectWithValue(error.message);
            // };
            toast.error(error.message, { position: "top-center", autoClose: 2000 });
            console.log(error.message); //!
            // toast.error(`Ошибка запроса: ${error.message === "Request failed with status code 400" ? "Ошибка входа" : error.message}`, { position: "top-center", autoClose: 2000 });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



//? +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //! --------------Добавленные users -------------------
  // const user1 = {
  //   name: "Ruslan Fate",
  //   email: "fate@gmail.com",
  //   password: "poi098lkj",
  // };

  // const user2 = {
  //   name: "Egor Rudik",
  //   email: "egor_rudik@gmail.com",
  //   password: "rty543yui"
  // };

  // const user3 = {
  //   name: "Sergej Fedorchuk",
  //   email: "fedorchuk@gmail.com",
  //   password: "ghf479lkf"
  // };


  // const user4 = {
  //   name: "Sonya Furkina",
  //   email: "furkina@gmail.com",
  //   password: "nbhy7564kjuy"
  // };

  //! Залогиненый user на гите
  // const user5 = {
  //   name: "Danil Rooti",
  //   email: "danilrooti@gmail.com",
  //   password: "rooti6778ghyt"
  // };

    // const user6 = {
    // name: "Robert Hunt",
    // email: "roberthunt@gmail.com",
    // password: "hunt793edc"
    // };

    // const user7 = {
    // name: "Stive Morgan",
    // email: "stive@gmail.com",
    // password: "stive379hyt"
    // };

    // const user8 = {
    // name: "Den Roof",
    // email: "Den_Roof@gmail.com",
    // password: "denroof257hjk"
    // };

    // const user9 = {
    // name: "Dorotti Wile",
    // email: "dorotti_wile@gmail.com",
    // password: "dorotti987cvb"
    // };

    // const user10 = {
    // name: "Win Drake",
    // email: "win_drake@gmail.com",
    // password: "drake129ghj"
    // };