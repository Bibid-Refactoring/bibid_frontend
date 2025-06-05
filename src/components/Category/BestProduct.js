import React, { useRef, useEffect, useState } from 'react';
import '../../css/Main/BestProduct.css';
import axios from 'axios';
import defaultFileImg from '../../images/defaultFileImg.png';
import { useNavigate } from 'react-router-dom';

export const BestProduct = () => {
    const bucketName = process.env.REACT_APP_BUCKET_NAME;

    const [bestProducts, setBestProducts] = useState([]);
    const [imageIndices, setImageIndices] = useState({}); // 각 제품별 이미지 인덱스

    const productsRef = useRef(bestProducts);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBestProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_SERVER}/auction/top`); // URL을 필요에 따라 조정하세요

                if (!response.statusMessage === 'ok') {
                    throw new Error('데이터를 가져오는 데 실패했습니다.');
                }
                const data = response.data;
                console.log(data);

                const items = data.pageItems.content || [];
                // content가 배열이니 items.forEach 사용

                // 초기 인덱스 세팅
                const initial = {};
                items.forEach((_, idx) => {
                    initial[idx] = 0;
                });
                setImageIndices(initial);

                // products 상태 업데이트
                setBestProducts(items);
            } catch (error) {
                console.error('베스트 상품을 가져오는 중 오류 발생:', error);
            }
        };

        fetchBestProducts();
    }, []);

    // 2) 최신 bestProducts를 ref에 동기화
    useEffect(() => {
        productsRef.current = bestProducts;
        console.log('📦 bestProducts 업데이트됨:', bestProducts);
    }, [bestProducts]);

    // 3) 한 번만 인터벌 등록 → 최신 ref를 읽어서 이미지 교체
    useEffect(() => {
        const id = setInterval(() => {
            setImageIndices((prev) => {
                const next = { ...prev };
                productsRef.current.forEach((prod, i) => {
                    const total = prod.auctionImageDtoList?.length || 1;
                    next[i] = (prev[i] + 1) % total;
                });
                return next;
            });
        }, 3000);

        return () => clearInterval(id);
    }, []);

    const handleItemClick = (auctionIndex) => {
        window.location.href = `/category-itemdetail/${auctionIndex}`;
    };

    // Category.js (BestProduct 컴포넌트 위쪽에 선언)
    const CATEGORY_SLUGS = {
        '의류/잡화': 'clothing',
        '취미/수집': 'hob',
        '도서': 'book',
        '예술품': 'art',
        '전자제품': 'elec',
        '사진': 'pic',
        '골동품': 'antique',
        // 필요하면 더 추가…
    };

    return (
        <div className="CTG_container2">
            <div className="CTG_grid-container-best">
                {bestProducts.map((auction, index) => {
                    const currentIndex = imageIndices[index] || 0;
                    const imageList = auction.auctionImageDtoList;
                    const selectedImage = imageList && imageList.length > 0 ? imageList[currentIndex] : null;
                    const imageSrc =
                        selectedImage && selectedImage.filetype === 'image'
                            ? `https://pub-545575e178394a0e85ed3d8f1bcaa827.r2.dev/${selectedImage.filepath}${selectedImage.filename}`
                            : defaultFileImg;

                    return (
                        <div key={index} className="CTG_grid-item-best">
                            <a>
                                <div className="CTG_grid-img-box">
                                    <img
                                        className="CTG_grid-img"
                                        src={imageSrc}
                                        alt={auction.productName}
                                        onClick={() => handleItemClick(auction.auctionIndex)}
                                    />
                                </div>

                                {/* 상품 정보 */}
                                <div className="CTG_product-info">
                                    <h4 className="CTG_product-name">{auction.productName}</h4>
                                    <p className="CTG_product-price">{auction.startingPrice.toLocaleString()} 원</p>
                                    {/* 요기는 클릭만 처리 */}
                                    <span
                                        className="CTG_product-category"
                                        onClick={(e) => {
                                            e.stopPropagation(); // 카드 클릭 이벤트는 막고
                                            // auction.category 에 매핑된 영문 슬러그 꺼내기
                                            const slug = CATEGORY_SLUGS[auction.category] || 'all';
                                            navigate(`/category/${slug}`);
                                        }}
                                    >
                                        #{auction.category}
                                    </span>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
            {/* <div className="CTG_grid-container-best">
                {bestProducts.map((auction, index) => {
                    const thumbnailImage = auction.auctionImageDtoList.find((image) => image.thumbnail === true);
                    const imageSrc =
                        thumbnailImage && thumbnailImage.filetype === 'image'
                            ? `https://pub-545575e178394a0e85ed3d8f1bcaa827.r2.dev/${thumbnailImage.filepath}${thumbnailImage.filename}`
                            : `${defaultFileImg}`; // 이미지가 없거나 썸네일이 아닐 경우 기본 이미지

                    return (
                        <div key={index} className="CTG_grid-item-best">
                            <img
                                className="CTG_grid-img"
                                src={imageSrc}
                                alt={auction.productName}
                                onClick={() => handleItemClick(auction.auctionIndex)}
                            />
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
};
