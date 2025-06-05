// src/apis/main_banner/bannersApis.js
import axios from 'axios';

const BASE_URL = '/api/banners';

// 모든 배너 가져오기
export function fetchBannersAPI() {
    return axios.get(`${BASE_URL}/all`);
}

// 단일 배너 추가 (payload: { public_id, title, link_url, display_order, start_date, end_date })
export function createBannerAPI(payload) {
    return axios.post(BASE_URL, payload);
}

// 단일 배너 수정 (payload: { id, fields… })
export function updateBannerAPI({ id, ...fields }) {
    return axios.put(`${BASE_URL}/${id}`, fields);
}

// 단일 배너 삭제
export function deleteBannerAPI(id) {
    return axios.delete(`${BASE_URL}/${id}`);
}
