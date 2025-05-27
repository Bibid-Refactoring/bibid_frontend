import React, { useEffect, useState } from 'react';
import '../../css/SpecialAuction/SAsellerStreamingBox.css';

const SAsellerSteamingBox = ({ channelInfo }) => {
    const [isKeyVisible, setIsKeyVisible] = useState(false);

    const streamKey = channelInfo.youtubeStreamKey;
    const streamUrl = channelInfo.youtubeStreamUrl;

    // 스트림 키 토글 (보이기/숨기기)
    const toggleKeyVisibility = () => {
        setIsKeyVisible(!isKeyVisible);
    };

    // 클립보드 복사 기능
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('복사되었습니다!');
            })
            .catch((err) => {
                console.error('복사 실패:', err);
            });
    };

    return (
        <div className='SAsellerSteamingBox'>
            <h2>스트림 설정</h2>
            <p>OBS를 사용하여 YouTube Live로 방송하려면 아래 정보를 사용해 설정하세요.</p>

            {/* 스트림 서버 및 스트림 키 정보 */}
            <div className='SAstreamingStatus'>
                <div className='SAstreamingStatusHeader'>
                    <h3>스트림 연결 정보</h3>
                </div>
                <div className='SAstreamingStatusContents'>
                    <div>
                        <p><strong>RTMP 서버 주소:</strong></p>
                        <div className='SAstreamingServerURLBox'>
                            <div className='SAstreamingServerURL'>
                                <p id='SAstreamingServerURLId'>{streamUrl}</p>
                            </div>
                            <button onClick={() => copyToClipboard(streamUrl)}>
                                <p>복사</p>
                            </button>
                        </div>
                    </div>
                    <div className='SAstreamingStatusContentsContour'></div>
                    <div>
                        <p><strong>스트림 키:</strong></p>
                        <div className='SAstreamingKeyBox'>
                            <div className='SAstreamingKey'>
                                <p id='SAstreamingKeyId'>
                                    {isKeyVisible ? streamKey : '************'}
                                </p>
                                <div className='SAstreamingKeyEyeIcon' onClick={toggleKeyVisibility}>
                                    <img
                                        src={isKeyVisible ? '/images/open_eye_icon.svg' : '/images/close_eye_icon.svg'}
                                        alt='Toggle visibility'
                                    />
                                </div>
                            </div>
                            <button onClick={() => copyToClipboard(streamKey)}>
                                <p>복사</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* OBS 사용 가이드 */}
            <ol className='SAstreamingGuideList'>
                <li>
                    <h4><strong>OBS 설치</strong></h4>
                    <ul>
                        <li className='SAobsDownload'>
                            <p id='SAobsDownload_title'>OBS Studio 다운로드</p>
                            <a href='https://obsproject.com/download' target='_blank' rel='noopener noreferrer'>
                                <div className='SAobsDownloadURL'>설치</div>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4><strong>카메라 설정</strong></h4>
                    <ul>
                        <li>OBS 실행 후 <strong>소스</strong> 목록 하단에서 <strong>+</strong> 클릭</li>
                        <li><strong>비디오 캡처 장치</strong> 선택 후 <strong>웹캠</strong> 선택</li>
                    </ul>
                </li>
                <li>
                    <h4><strong>방송 설정</strong></h4>
                    <ul>
                        <li>OBS 상단 메뉴에서 <strong>파일 {'>'} 설정 {'>'} 방송</strong> 선택</li>
                        <li>서비스: <strong>사용자 지정</strong></li>
                        <li>서버 및 스트림 키 입력 후 <strong>적용</strong></li>
                    </ul>
                </li>
                <li>
                    <h4><strong>방송 시작</strong></h4>
                    <ul>
                        <li><strong>방송 시작</strong> 버튼 클릭</li>
                        <li>라이브가 시작되면 웹사이트에 자동 반영됩니다</li>
                    </ul>
                </li>
            </ol>
        </div>
    );
};

export default SAsellerSteamingBox;
