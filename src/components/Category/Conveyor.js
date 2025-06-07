import React, { useState, useEffect } from 'react';
import '../../css/Main/Conveyor.css'; // 이 파일을 추가했다고 가정
import axios from 'axios';
import defaultFileImg from '../../images/defaultFileImg.png';

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// console.log('Slider is', Slider);

const bucketName = process.env.REACT_APP_BUCKET_NAME;

const handleItemClick = (auctionIndex) => {
    window.location.href = `/category-itemdetail/${auctionIndex}`;
};

function Conveyor() {
    const [bestProducts, setBestProducts] = useState([]);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchBestProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_SERVER}/auction/conveyor`);
                if (response.data.statusCode !== 200) {
                    throw new Error('데이터를 가져오는 데 실패했습니다.');
                }
                setBestProducts(response.data.pageItems.content);
            } catch (error) {
                console.error('상품을 가져오는 중 오류 발생:', error);
            }
        };

        fetchBestProducts();
    }, []);

    // Slider 설정: 한 번에 보여줄 개수, 자동재생, 반응형 등
    // const settings = {
    //     infinite: bestProducts.length > 4,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     pauseOnHover: true,
    //     arrows: true,
    //     responsive: [
    //         { breakpoint: 1000, settings: { slidesToShow: 3 } },
    //         { breakpoint: 770, settings: { slidesToShow: 2 } },
    //         { breakpoint: 500, settings: { slidesToShow: 1 } },
    //     ],
    // };

    return (
        <div className="Conveyor__view">
            <div className="CV_header">
                <h2>마감임박 경매</h2>
                <p>경매 종료까지 시간이 얼마 남지 않은 경매입니다.</p>
            </div>
            <ul
                className={`Conveyor__slide ${isPaused ? 'paused' : 'running'}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {bestProducts.concat(bestProducts).map((auction, index) => {
                    const thumbnailImage = auction.auctionImageDtoList.find((image) => image.thumbnail === true);
                    const imageSrc =
                        thumbnailImage && thumbnailImage.filetype === 'image'
                            ? `https://pub-545575e178394a0e85ed3d8f1bcaa827.r2.dev/${thumbnailImage.filepath}${thumbnailImage.filename}`
                            : `${defaultFileImg}`;

                    return (
                        <li key={index}>
                            <img
                                className="CV_conveyor-img"
                                src={imageSrc}
                                alt={auction.productName}
                                style={{ width: '100%', height: '100%', borderRadius: '5px' }}
                                onClick={() => handleItemClick(auction.auctionIndex)}
                            />
                        </li>
                    );
                })}
            </ul>

            {/* <Slider
                {...settings}
                className="Conveyor__slide"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {bestProducts.map((auction) => {
                    const thumbnailImage = auction.auctionImageDtoList.find((i) => i.thumbnail);
                    const imageSrc =
                        thumbnailImage && thumbnailImage.filetype === 'image'
                            ? `https://.../${thumbnailImage.filepath}${thumbnailImage.filename}`
                            : defaultFileImg;

                    return (
                        <div key={auction.auctionIndex} onClick={() => handleItemClick(auction.auctionIndex)}>
                            <img
                                className="CV_conveyor-img"
                                src={imageSrc}
                                alt={auction.productName}
                                style={{ width: '100%', height: '100%', borderRadius: '5px' }}
                            />
                        </div>
                    );
                })}
                +{' '}
            </Slider> */}

        </div>
    );
}

export default Conveyor;
