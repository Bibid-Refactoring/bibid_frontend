import React from 'react';
import '../css/Main/Mainpage.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearchKeyword } from '../slices/search/searchSlice';
import { BestProduct } from '../components/Category/BestProduct';
import Conveyor from '../components/Category/Conveyor';
import CarouselBanner from '../components/Mainpage/CarouselBanner';
import BannerUploader from '../components/Mainpage/BannerUploader';

export const Mainpage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeSearchKeyword('')); // 🔁 메인 진입 시 초기화
    }, [dispatch]);

    return (
        <div className="mp">
            {/* 배너 영역 */}
            <div className="mp_container">
                <div className="mp_banner">
                    <CarouselBanner />
                    <BannerUploader />
                </div>

                <div className="blank" />

                {/* 실시간 경매 영역 */}
                <Conveyor />

                <div className="blank" />

                {/* 베스트 아이템 영역 */}
                <div className="BestItems">
                    <h2 className="title">베스트</h2>
                    <p>입찰횟수가 많은 가장 인기 아이템들입니다.</p>
                </div>
                <BestProduct />
            </div>

            <div className="blank" />
        </div>
    );
};

export default Mainpage;
