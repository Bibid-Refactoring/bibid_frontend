// slice/bannerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bannerSlice = createSlice({
    name: 'banners',
    initialState: [],
    reducers: {
        addBanner: (state, action) => {
            state.push(action.payload);
        },
        setBanners: (state, action) => action.payload,
    },
});

export const { addBanner, setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
