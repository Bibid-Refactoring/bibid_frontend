// src/apis/main_banner/bannersApis.js
import axios from 'axios';

const BASE_URL = '/api/banners';
const BACK_SERVER = process.env.REACT_APP_BACK_SERVER;

// 모든 배너 가져오기
export function fetchBannersAPI() {
    return axios.get(`${BACK_SERVER}${BASE_URL}/all`, {
        headers: { Accept: 'application/json' },
    });
}

// 단일 배너 추가 (payload: { publicId, title, linkUrl, displayOrder, startDate, endDate })
export function createBannerAPI(payload) {
    return axios.post(`${BACK_SERVER}${BASE_URL}`, payload, {
        headers: { 'Content-Type': 'application/json' },
    });
}

// 단일 배너 수정 (payload: { id, ...fields })
export function updateBannerAPI({ id, ...fields }) {
    return axios.put(`${BACK_SERVER}${BASE_URL}/${id}`, fields, {
        headers: { 'Content-Type': 'application/json' },
    });
}

// 단일 배너 삭제
export function deleteBannerAPI(id) {
    return axios.delete(`${BACK_SERVER}${BASE_URL}/${id}`, {
        headers: { Accept: 'application/json' },
    });
}
