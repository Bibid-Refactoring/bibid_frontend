import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SAsellerSteamingBox from './SAsellerStreamingBox';
import '../../css/SpecialAuction/SAitem.css';
import { getFormattedRemainingTime } from '../../util/utils';

function SellerAuctionScreen({
    webSocketProps,
    auction,
    remainingTime,
    closeSellerPage
}) {
    const [channelInfo, setChannelInfo] = useState({ youtubeWatchUrl: '' });
    const [isLive, setIsLive] = useState(false);
    const [remainingText, setRemainingText] = useState("경매 시작까지 남은 시간");
    const [formattedTimeText, setFormattedTimeText] = useState("");

    const messagesEndRef = useRef(null);

    const {
        messages,
        inputMessage,
        setInputMessage,
        sendMessage,
        currentPrices,
        participantCounts,
        auctionDetails
    } = webSocketProps;

    const winnerInfo = auctionDetails[auction.auctionIndex];

    // 🔁 fetchChannelInfo 함수 분리 & 재호출 가능하도록 변경
    const fetchChannelInfo = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_SERVER}/specialAuction/channelInfo/${auction.auctionIndex}`,
                { withCredentials: true }
            );
            setChannelInfo(response.data);
        } catch (error) {
            console.error('스트리밍 정보 가져오기 실패:', error);
        }
    };

    useEffect(() => {
    fetchChannelInfo();
    }, [auction.auctionIndex]);

    const auctionStartTime = new Date(auction.startingLocalDateTime);
    const auctionEndTime = new Date(auction.endingLocalDateTime);
    const formattedAuctionStartTime = auctionStartTime.toLocaleString('ko-KR');
    const formattedAuctionEndTime = auctionEndTime.toLocaleString('ko-KR');
    const formattedBidIncrement = auction.bidIncrement?.toLocaleString() || '0';
    const formattedStartingPrice = auction.startingPrice?.toLocaleString() || '0';
    const formattedCurrentPrice = (currentPrices[auction.auctionIndex] || auction.startingPrice)?.toLocaleString() || '0';
    const formattedParticipantCount = participantCounts[auction.auctionIndex] || 0;

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    useEffect(() => {
        const updateLiveStatus = () => {
            const now = new Date();
            if (now < auctionStartTime) {
                setRemainingText("경매 시작까지 <br/>남은 시간");
                setFormattedTimeText(`(${formattedAuctionStartTime})`);
                setIsLive(false);
            } else if (now >= auctionStartTime && now < auctionEndTime) {
                setRemainingText("경매 종료까지 <br/>남은 시간");
                setFormattedTimeText(`(${formattedAuctionEndTime})`);
                setIsLive(true);
            } else {
                setRemainingText("경매 종료까지 <br/>남은 시간");
                setFormattedTimeText(`(${formattedAuctionEndTime})`);
                setIsLive(false);
            }
        };

        updateLiveStatus();
        const interval = setInterval(updateLiveStatus, 5000);
        return () => clearInterval(interval);
    }, [auctionStartTime, auctionEndTime]);

    const formattedRemainingTime = getFormattedRemainingTime(remainingTime);

    const formatTime = (sendTime) => {
        if (!sendTime) return '';
        const date = new Date(sendTime);
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    // 📌 YouTube videoId 추출 함수 추가
    const extractVideoId = (url) => {
        const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    };
    
    const videoId = channelInfo.youtubeWatchUrl ? extractVideoId(channelInfo.youtubeWatchUrl) : null;

    // ✅ 방송 시작 함수 개선: 방송 시작 후 iframe을 갱신하기 위해 채널 정보 재요청
    const startLive = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACK_SERVER}/specialAuction/startLive/${auction.auctionIndex}`,
                {},
                { withCredentials: true }
            );
            setIsLive(true);
            await fetchChannelInfo(); // iframe 갱신을 위해 최신화
        } catch (error) {
            console.error('경매 시작 실패:', error);
        }
    };

    const endLive = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACK_SERVER}/specialAuction/endLive/${auction.auctionIndex}`,
                {},
                { withCredentials: true }
            );
            setIsLive(false);
        } catch (error) {
            console.error('방송 종료 실패:', error);
        }
    };

    return (
        <div className="SAoverlay">
            <div className='SAtotalPopup'>
                <div className="SAsellerPopup">
                    <div className="SAsellerLiveAuctionHeader">
                        <h3>{isLive ? "Live On" : "Live Off"}</h3>
                        <h1>판매자</h1>
                        <div className='SAstreamingBttnBox'>
                            <button onClick={isLive ? null : startLive}>경매 시작</button>
                            <button onClick={endLive}>방송 종료</button>
                        </div>
                        {winnerInfo && (
                            <div className='SAstreamingBttnBox'>
                                <button>낙찰자 정보</button>
                                <button>낙찰자: {winnerInfo.winnerNickname}</button>
                                <button>낙찰 금액: {winnerInfo.winningBid}원</button>
                            </div>
                        )}
                    </div>
                    <div className='SAauctionContainer'>
                        <div className='SAsellerTotalBox'>
                            <div className='SAsellerViewBox'>
                                <div className="SAsellerAuctionContentBox">
                                    <div className="SAsellerProductSection">
                                        {isLive && videoId ? (
                                            <iframe
                                                width="100%"
                                                height="400"
                                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                                title="YouTube Live"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="SAstreamingNotStarted">
                                                ⏳ 방송 준비 중입니다. 경매 시작 시간에 맞춰 송출이 시작됩니다.
                                            </div>
                                        )}
                                    </div>
                                    <div className="SAsellerAuctionDetails">
                                        <h2>{auction.productName}</h2>
                                        <div className='SAsellerAuctionDetailsBox'>
                                            <div className='SAsellerAuctionContentsTitle'>
                                                <p dangerouslySetInnerHTML={{ __html: remainingText }}></p>
                                                <p>현재가</p>
                                                <p>경매 시작가</p>
                                                <p>입찰단위</p>
                                                <p>대기중인 사용자</p>
                                            </div>
                                            <div className='SAsellerAuctionContentsValue'>
                                                <div>
                                                    <p id='SAsellerAuctionStartRemainTimeDiff'>{formattedRemainingTime}</p>
                                                    <p id='SAsellerAuctionStartRemainTime'>{formattedTimeText}</p>
                                                </div>
                                                <p>{formattedCurrentPrice}원</p>
                                                <p>{formattedStartingPrice}원</p>
                                                <p>{formattedBidIncrement}원</p>
                                                <p>{formattedParticipantCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="SAsellerStreamingInfo">
                                    <p id='SAsellerStreamingNote'>* 유튜브 스트리밍이 시작되면 위에 영상이 자동으로 표시됩니다.</p>
                                </div>
                                <SAsellerSteamingBox channelInfo={channelInfo} />
                            </div>

                            <div className="SAsellerChatContainer">
                                <div className="SAsellerChatSection">
                                    <div>
                                        <ul>
                                            {messages[auction?.auctionIndex]?.map((msg, index) => (
                                                <li key={index}>
                                                    <em>{formatTime(msg.sendTime)}</em>{' '}
                                                    <strong style={{ color: msg.color }}>{msg.senderNickname}:</strong>{' '}
                                                    {msg.chatMessage}
                                                </li>
                                            )) || <li>메시지가 없습니다.</li>}
                                            <div ref={messagesEndRef} />
                                        </ul>
                                    </div>
                                </div>
                                <div className='SAsellerChatInputBox'>
                                    <input
                                        className='SAsellerChatInput'
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="메시지를 입력하세요..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="SAsllerTotalBoxCloseButton" onClick={closeSellerPage}>
                        <img src='/images/white_close_button_icon.svg' alt="close button" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SellerAuctionScreen;
