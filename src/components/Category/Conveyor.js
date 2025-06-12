import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Main/Conveyor.css'; // 이 파일을 추가했다고 가정
import axios from 'axios';
import defaultFileImg from '../../images/defaultFileImg.png';
import { ReactComponent as LeftArrowIcon } from '../../images/black_left_arrow_icon.svg';
import { ReactComponent as RightArrowIcon } from '../../images/black_right_arrow_icon.svg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Conveyor() {
    const [bestProducts, setBestProducts] = useState([]);

    const navi = useNavigate();

    useEffect(() => {
        const fetchBestProducts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACK_SERVER}/auction/conveyor`,
                );
                if (response.data.statusCode !== 200) {
                    throw new Error('데이터를 가져오는 데 실패했습니다.');
                }

                console.log('response.data.pageItems.content: ' + response.data);
                setBestProducts(response.data.pageItems.content);
            } catch (error) {
                console.error('상품을 가져오는 중 오류 발생:', error);
            }
        };

        fetchBestProducts();
    }, []);

    const handleItemClick = (auctionIndex) => {
        navi(`/category-itemdetail/${auctionIndex}`);
    };

    const NextArrow = ({ onClick }) => (
        <button className="custom-arrow custom-next" onClick={onClick}>
            <RightArrowIcon className="arrow-icon" strokeWidth={5} />
        </button>
    );
    const PrevArrow = ({ onClick }) => (
        <button className="custom-arrow custom-prev" onClick={onClick}>
            <LeftArrowIcon className="arrow-icon" />
        </button>
    );

    // Slider 설정: 한 번에 보여줄 개수, 자동재생, 반응형 등
    const settings = {
        infinite: true, // 끝까지 가면 멈추기
        slidesToShow: 3, // 한 화면에 3장
        slidesToScroll: 1, // 한 칸씩 이동
        variableWidth: false, // 고정된 개수(slidesToShow) 기준
        arrows: true, // 표시는 켜두되,
        nextArrow: <NextArrow />, // 내가 만든 버튼 사용
        prevArrow: <PrevArrow />,
        dots: true,
        autoplay: true, // 자동 재생 켬
        autoplaySpeed: 3000, // 3초 간격
        pauseOnHover: true, // 마우스 올리면 멈춤
    };

    return (
        <div className="Conveyor__view">
            <div className="CV_header">
                <h2>마감임박 경매</h2>
                <p>경매 종료까지 시간이 얼마 남지 않은 경매입니다.</p>
            </div>

            <Slider {...settings} className="Conveyor__slide">
                {bestProducts.map((auction) => {
                    const thumbnailImage = auction.auctionImageDtoList.find((i) => i.thumbnail);
                    const imageSrc =
                        thumbnailImage && thumbnailImage.filetype === 'image'
                            ? `https://pub-545575e178394a0e85ed3d8f1bcaa827.r2.dev/${thumbnailImage.filepath}${thumbnailImage.filename}`
                            : defaultFileImg;

                    return (
                        <div
                            className="Conveyor__slide_imgBox"
                            key={auction.auctionIndex}
                            onClick={() => handleItemClick(auction.auctionIndex)}
                        >
                            <img
                                className="Conveyor__slide_img"
                                src={imageSrc}
                                alt={auction.productName}
                            />
                            <div className="Conveyor__slide_content">
                                <h3 className="title">{auction.productName}</h3>
                                <p className="price">{auction.currentPrice}원</p>
                                <p className="time">{auction.endingLocalDateTime}</p>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default Conveyor;
