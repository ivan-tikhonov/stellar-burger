import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    requestWithToken,
    updateUserRequest
} from '../../utils/api';

import {
    TLoginData,
    TRegisterData,
    TUpdateUserData,
} from '../../utils/types';

import { IAuthResponse, IUserResponse } from '../../utils/types';

import { deleteItemLocalStorage, setItemLocalStorage } from '../../utils/localStorage';

export const register = createAsyncThunk<IAuthResponse, TRegisterData, { rejectValue: string }>(
    'userSlice/register',
    async (userData, { rejectWithValue }) => {
        try {
            return registerRequest(userData)
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserData = createAsyncThunk<IUserResponse, undefined, { rejectValue: string }>(
    'userSlice/getUserData',
    async (_, { rejectWithValue }) => {
        try {
            return requestWithToken(getUserRequest)
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk<IUserResponse, TUpdateUserData, { rejectValue: string }>(
    'userSlice/updateUser',
    async (userData, { rejectWithValue }) => {
        try {
            return updateUserRequest(userData)
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk<IAuthResponse, TLoginData, { rejectValue: string }>(
    'userSlice/login',
    async (userData, { rejectWithValue }) => {
        try {
            return loginRequest(userData)
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    'userSlice/logout',
    async (_, { rejectWithValue }) => {
        try {
            return logoutRequest();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

type TInitialState = {
    user: {
        name: string | null;
        email: string | null;
    };
    isLoggedIn: boolean;
    status: string | null;
    error: string | null;
};

const initialState: TInitialState = {
    user: {
        name: null,
        email: null
    },
    isLoggedIn: false,
    status: null,
    error: null
};

export const UserSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'pending';
                state.user.name = null;
                state.user.email = null;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                state.isLoggedIn = true;
                setItemLocalStorage('accessToken', action.payload.accessToken.split('Bearer ')[1]);
                setItemLocalStorage('refreshToken', action.payload.refreshToken);
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(login.pending, (state) => {
                state.status = 'pending';
                state.user.name = null;
                state.user.email = null;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                state.isLoggedIn = true;
                setItemLocalStorage('accessToken', action.payload.accessToken.split('Bearer ')[1]);
                setItemLocalStorage('refreshToken', action.payload.refreshToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(logout.fulfilled, (state) => {
                state.status = null;
                state.user.name = null;
                state.user.email = null;
                state.error = null;
                state.isLoggedIn = false;
                deleteItemLocalStorage('accessToken');
                deleteItemLocalStorage('refreshToken');
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(getUserData.pending, (state) => {
                state.status = 'pending';
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.isLoggedIn = true;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(updateUser.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export default UserSlice.reducer;
