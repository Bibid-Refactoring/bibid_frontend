// src/slices/banner/bannerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBannersAPI, createBannerAPI, updateBannerAPI, deleteBannerAPI } from '../../apis/main/bannerApis';

// 1) fetchBanners: ResponseDto 에서 itemList (배너 리스트)만 꺼내서 반환
export const fetchBanners = createAsyncThunk('banners/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await fetchBannersAPI();
        console.log('[Thunk] fetchBanners response.data =', response.data);
        // response.data === { itemList: BannerDto[], statusCode:200, statusMessage:"ok" }

        return response.data.items;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

// 2) addBanner: ResponseDto 에서 item (생성된 BannerDto)만 꺼내서 반환
export const addBanner = createAsyncThunk('banners/add', async (newBannerData, thunkAPI) => {
    try {
        const response = await createBannerAPI(newBannerData);
        console.log('[Thunk] addBanner response.data =', response.data);
        // response.data === { item: BannerDto, statusCode:201, statusMessage:"created" }
        return response.data.item;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

// 3) updateBanner: ResponseDto 에서 item (수정된 BannerDto)만 꺼내서 반환
export const updateBanner = createAsyncThunk('banners/update', async (updatedBannerData, thunkAPI) => {
    try {
        const response = await updateBannerAPI(updatedBannerData);
        console.log('[Thunk] updateBanner response.data =', response.data);
        // response.data === { item: BannerDto, statusCode:200, statusMessage:"updated" }
        return response.data.item;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

// 4) deleteBanner: 백엔드가 204 No Content로 응답하므로 action.payload에 ID만 넘겨주면 OK
export const deleteBanner = createAsyncThunk('banners/delete', async (id, thunkAPI) => {
    try {
        await deleteBannerAPI(id);
        return id; // 삭제된 배너 ID를 반환
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

// 5) Slice 정의
const bannerSlice = createSlice({
    name: 'banners',
    initialState: {
        items: [], // BannerDto[]
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // (필요하다면 여기에 동기 액션 정의)
    },
    extraReducers: (builder) => {
        builder
            // fetchBanners
            .addCase(fetchBanners.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // action.payload는 BannerDto[]
                state.items = action.payload;
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // addBanner
            .addCase(addBanner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addBanner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // action.payload는 새로 생성된 BannerDto
                state.items.push(action.payload);
            })
            .addCase(addBanner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // updateBanner
            .addCase(updateBanner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateBanner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // action.payload는 수정된 BannerDto
                const updated = action.payload;
                const index = state.items.findIndex((b) => b.id === updated.id);
                if (index !== -1) {
                    state.items[index] = updated;
                }
            })
            .addCase(updateBanner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // deleteBanner
            .addCase(deleteBanner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // action.payload는 삭제된 배너의 ID
                state.items = state.items.filter((b) => b.id !== action.payload);
            })
            .addCase(deleteBanner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default bannerSlice.reducer;
