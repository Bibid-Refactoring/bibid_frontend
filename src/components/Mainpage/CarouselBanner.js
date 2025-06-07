import React, { useState, useEffect } from 'react';
import '../../css/CarouselBanner.css';
import { fetchBanners } from '../../slices/banner/bannerSlice';
import { getAuctionData } from '../../apis/SpecialAuction/SAapis';
import { useSelector, useDispatch } from 'react-redux';
import { formatDateTime, formatAuctionTimeRange } from '../../util/utils';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../../images/white_left_arrow_icon.svg';
import rightArrow from '../../images/white_right_arrow_icon.svg';
import { makeBannerUrl } from '../../util/cloudinary';
import MainBannerDefault from '../../images/MainBannerDefault.png';

const CarouselBanner = () => {
    // const bucketName = process.env.REACT_APP_BUCKET_NAME;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { liveAuctionList } = useSelector((state) => state.specialAuctionSlice);
    const [carouselData, setCarouselData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const bannerItems = useSelector((state) => state.banners.items);
    const bannerPublicIds = bannerItems.map((b) => b.publicId);

    // 1) 실시간 경매 데이터, 배너 fetch
    useEffect(() => {
        dispatch(getAuctionData('realtime'));
        dispatch(fetchBanners());
    }, []);

    // 2) useState로 배너 상태 관리
    useEffect(() => {
        if (bannerItems.length > 0) {
            const data = bannerItems.map((b) => ({
                url: makeBannerUrl({ publicIds: [b.publicId] }),
                linkUrl: b.linkUrl,
                title: '',
                auctionDate: '',
                auctionTime: '',
            }));
            setCarouselData(data);
        }
    }, [bannerItems]);

    // 3) 자동 슬라이드
    useEffect(() => {
        if (!isPlaying || carouselData.length < 2) return;

        const id = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % carouselData.length);
        }, 7000);
        return () => clearInterval(id);
    }, [isPlaying, carouselData]);

    const nextSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((i) => (i + 1) % carouselData.length);
    };
    const prevSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((i) => (i - 1 + carouselData.length) % carouselData.length);
    };

    const goToIndex = (idx) => {
        setCurrentIndex(idx);
    };

    // const togglePlayPause = () => setIsPlaying((p) => !p);

    // const currentSlideNumber = carouselData.length ? currentIndex + 1 : 0;
    // const handleSAGoButtonClick = () => navigate('/SpecialAuction');

    if (!Array.isArray(bannerPublicIds) || bannerPublicIds.length === 0) {
        return (
            <div className="CB_carousel">
                <img
                    src={MainBannerDefault}
                    alt="Main Default Banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
        );
    }

    return (
        <div className="CB_carousel">
            {carouselData.length > 0 && (
                <>
                    <div
                        className="CB_carousel-inner"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                        }}
                    >
                        {carouselData.map((carousel, index) => (
                            <div key={index} className="CB_carousel-item" onClick={() => navigate(carousel.linkUrl)}>
                                <img
                                    src={carousel.url}
                                    alt={`Carousel ${index}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>

                    <button className="CB_carousel-control-prev" onClick={prevSlide}>
                        <img src={leftArrow}></img>
                    </button>
                    <button className="CB_carousel-control-next" onClick={nextSlide}>
                        <img src={rightArrow}></img>
                    </button>

                    <div className="CB_carousel-indicators">
                        {carouselData.map((_, idx) => (
                            <span
                                key={idx}
                                className={`CB_carousel-indicator${idx === currentIndex ? ' active' : ''}`}
                                onClick={() => goToIndex(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* <div className="CB_carousel-pad-container">
                        <div className="CB_carousel-pad1">
                            <button className="CB_carousel-num">
                                {currentSlideNumber} / {carouselData.length}
                            </button>
                            <button className="CB_carousel-control prev" onClick={prevSlide}>
                                <img src={leftArrow}></img>
                            </button>
                            <button className="CB_carousel-control next" onClick={nextSlide}>
                                <img src={rightArrow}></img>
                            </button>
                            <button className="CB_carousel-toggle" onClick={togglePlayPause}>
                                <img
                                    src={`/images/${isPlaying ? 'stop_icon.svg' : 'play_icon.svg'}`}
                                    alt={isPlaying ? 'Pause' : 'Play'}
                                    style={{ width: '15px', height: '15px' }}
                                />
                            </button>
                        </div>
                        <div className="CB_carousel_contents">
                            <h2 className="CB_carousel_h">{carouselData[currentIndex].title}</h2>
                            <p>{carouselData[currentIndex].auctionDate}</p>
                            <p>{carouselData[currentIndex].auctionTime}</p>
                            <button className="CB_enter_action-button" onClick={handleSAGoButtonClick}>
                                바로가기
                            </button>
                        </div>
                    </div> */}
                </>
            )}
        </div>
    );
};

export default CarouselBanner;
