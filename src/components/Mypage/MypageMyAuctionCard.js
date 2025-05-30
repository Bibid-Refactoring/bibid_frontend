import React, { useEffect, useState } from 'react';
import '../../css/Mypage/Mypage.css';
import { format } from 'date-fns';
import defaultFileImg from '../../images/defaultFileImg.png';
import axios from 'axios';

const MypageMyAuctionCard = ({ auction, onDelete }) => {
  const bucketName = process.env.REACT_APP_BUCKET_NAME;

  const thumbnailImage = auction.auctionImageDtoList.find((image) => image.thumbnail === true);
  
  const imageSrc = thumbnailImage
    ? `https://pub-545575e178394a0e85ed3d8f1bcaa827.r2.dev/${thumbnailImage.filepath}${thumbnailImage.filename}`
    : defaultFileImg;

  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(defaultFileImg);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setImageUrl(imageSrc);
      setIsLoading(false);
    };
    img.onerror = () => {
      setImageUrl(defaultFileImg);
      setIsLoading(false);
    };
  }, [imageSrc]);

  const formatAuctionDate = (startLocalDateTime, endLocalDateTime) => {
    const startDate = format(new Date(startLocalDateTime), 'yyyy.MM.dd');
    const endDate = format(new Date(endLocalDateTime), 'yyyy.MM.dd');
    return `${startDate} ~ ${endDate}`;
  };

  const lastBidAmount = auction.auctionInfoDtoList?.length > 0
    ? auction.auctionInfoDtoList[auction.auctionInfoDtoList.length - 1].bidAmount
    : auction.startingPrice;

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACK_SERVER}/mypage/my-auctions/${auction.auctionIndex}`, { withCredentials: true });
      console.log(auction.auctionIndex);
      onDelete(auction.auctionIndex); // 부모 핸들러 호출
    } catch (error) {
      console.error('경매 삭제 중 오류 발생:', error);
    }
  };

  const handleDeleteAlert = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDialogOpen(false);
    await handleDelete();
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='Mypage_AuctionManagementCard'>
      <div className='Mypage_AuctionManagementCardImgBox'>
        <img
          src={isLoading ? defaultFileImg : imageUrl}
          alt="경매 썸네일"
          className="Mypage_AuctionManagementCardImg"
        />
      </div>
      <div className='Mypage_AuctionManagementCardTitleBox'>
        <div className='MypageAuctionManagementCardTitle'>
          <p>{auction.productName}</p>
        </div>
      </div>
      <div className='Mypage_AuctionManagementCardPrice'>
        <p>{lastBidAmount.toLocaleString()} 원</p>
      </div>
      <div className='Mypage_AuctionManagementCardBid'>
        <p>{auction.bidIncrement.toLocaleString()} 원</p>
      </div>
      <div className='Mypage_AuctionManagementCardPeriod'>
        <p>{formatAuctionDate(auction.startingLocalDateTime, auction.endingLocalDateTime)}</p>
      </div>
      <div className='Mypage_AuctionManagementCardDeleteBtnBox'>
        <button className='Mypage_AuctionManagementCardDeleteBtn' onClick={handleDeleteAlert}>
          <p>삭제</p>
        </button>
      </div>
      {isDialogOpen && (
        <div className="AuctionCardModal-overlay">
          <div className="AuctionCardModal-content">
            <div className="AuctionCardModal-head">
              <h3>경고</h3>
            </div>
            <div>
              <p>삭제한 경매는 복구할 수 없습니다.</p>
            </div>
            <div>
              <p>정말 삭제하시겠습니까?</p>
            </div>
            <div className="AuctionCardModal-buttons">
              <button onClick={handleConfirmDelete}>
                <p>삭제</p>
              </button>
              <button onClick={handleCancelDelete}>
                <p>취소</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageMyAuctionCard;