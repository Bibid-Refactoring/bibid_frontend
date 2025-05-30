import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import '../../css/Layout/Header.css';
import '../../css/Layout/MediaQuery.css';
import '../../css/Layout/Wallet.css';
import Alarm from '../Layout/Alarm';
import logo from '../../images/logo.svg';
import axios from 'axios';
import rightArrowIcon from '../../images/right_arrow_icon.svg';
import hamburgerIcon from '../../images/hamburger_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderSearchBar from '../Search/HeaderSearchBar';
import { checkLogin, getAccessToken, getTokenAndType, getType, logout } from '../../apis/etc2_memberapis/memberApis';
import searchLogo from '../../images/search_icon.svg';
import profileDefault from '../../images/profile_default.jpg';

const Header = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();

    const [memberInfo, setMemberInfo] = useState(null);
    const memberIndex = useSelector((state) => state.memberSlice.memberIndex);

    useEffect(() => {
        // API 호출 함수
        const fetchMemberInfo = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACK_SERVER}/mypage/userInfo/${memberIndex}`,
                    { withCredentials: true }
                );
                setMemberInfo(response.data.item); // 응답에서 멤버 정보 저장
            } catch (error) {
                console.error('Error fetching member info:', error); // 오류 처리
            }
        };

        if (memberIndex) {
            fetchMemberInfo(); // memberIndex가 있을 때만 호출
        }
    }, [memberIndex]);

    const bucketName = process.env.REACT_APP_BUCKET_NAME;
    const member = useSelector((state) => state.memberSlice);
    const accountDto = useSelector((state) => state.memberSlice.accountDto);

    const [profileImageDto, setProfileImageDto] = useState(member.profileImageDto);

    const imageSrc =
        profileImageDto && profileImageDto.filepath && profileImageDto.newfilename
            ? `https://kr.object.ncloudstorage.com/${bucketName}/${profileImageDto.filepath}${profileImageDto.newfilename}`
            : '/default_profile.png'; // 기본 이미지 경로 설정

    useEffect(() => {
        setProfileImageDto(member.profileImageDto);
    }, [member.profileImageDto]);

    const [boxHeight, setBoxHeight] = useState('auto'); // 초기 높이 설정
    const [showWalletPopup, setShowWalletPopup] = useState(false); // 지갑 팝업 상태
    const [showDetailBox, setShowDetailBox] = useState(false);

    const handleMouseOver = () => {
        setShowDetailBox(true);
    };

    const handleMouseLeave = () => {
        setShowDetailBox(false);
    };

    const handleMouseOverCate = (e) => {
        document.querySelector('.HDarrowIcon').style.opacity = '1';
    };

    const handleMouseLeaveCate = (e) => {
        document.querySelector('.HDarrowIcon').style.opacity = '0';
    };

    const handleMouseOverWallet = () => {
        setShowWalletPopup(true);
    };

    const handleMouseLeaveWallet = () => {
        setShowWalletPopup(false);
    };

    let clickCate = true;

    const handleMouseClick = (e) => {
        if (clickCate) {
            document.querySelector('.HDnavbarMenuDetailCategory').style.display = 'flex';
            setBoxHeight('385px');
            clickCate = false;
        } else {
            document.querySelector('.HDnavbarMenuDetailCategory').style.display = 'none';
            setBoxHeight('auto');
            clickCate = true;
        }
    };

    // 로고 클릭 시 메인 페이지로 이동
    const handleLogoClick = () => {
        window.location.href = '/'; // mainpage로 페이지 이동
    };

    // 충전, 환전 클릭 시 마이 페이지로 이동
    const handleChargeBttnClick = () => {
        window.location.href = '/mypage/wallet'; // mainpage로 페이지 이동
    };

    const handleMypage = () => {
        window.location.href = '/mypage/userInfo';
    };

    const handleWallet = () => {
        window.location.href = '/mypage/wallet';
    };

    const handleToSearch = () => {
        window.location.href = '/search';
    };

    const toCategory = () => {
        window.location.href = '/category';
    };

    const toAll = () => {
        window.location.href = '/category/all';
    };

    const toClothing = () => {
        window.location.href = '/category/clothing';
    };

    const toHob = () => {
        window.location.href = '/category/hob';
    };

    const toBook = () => {
        window.location.href = '/category/book';
    };

    const toArt = () => {
        window.location.href = '/category/art';
    };

    const toElec = () => {
        window.location.href = '/category/elec';
    };

    const toPic = () => {
        window.location.href = '/category/pic';
    };

    const toAntique = () => {
        window.location.href = '/category/antique';
    };

    const [token, setToken] = useState(null);

    const oauthType = useSelector((state) => state.memberSlice.oauthType);
    const checkLoginState = useSelector((state) => state.memberSlice.checkLoginState);
    const nickname = useSelector((state) => state.memberSlice.nickname);

    useLayoutEffect(() => {
        const fetchLoginStatus = () => {
            dispatch(checkLogin());

            if (checkLoginState) {
                setToken(true);
            } else {
                setToken(false);
            }
        };

        fetchLoginStatus();
    }, [checkLoginState]);

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logout());
            setToken(false);
        } catch (e) {
            alert('로그아웃 실패');
        }

        if (oauthType === 'Kakao') {
            const kakaoLogoutParams = {
                client_id: '29e81fa9fda262c573f312af9934fa5c',
                logout_redirect_uri: process.env.REACT_APP_FRONT_SERVER,
            };

            const url = 'https://kauth.kakao.com/oauth/logout';
            window.location.href = `${url}?client_id=${kakaoLogoutParams.client_id}&logout_redirect_uri=${kakaoLogoutParams.logout_redirect_uri}`;
        }
        window.location.href = '/';
    }, [dispatch, oauthType]);

    return (
        <>
            <header>
                {showDetailBox && (
                    <>
                        <div className="HDdropdownOverlay" onMouseOver={handleMouseLeave}></div>
                    </>
                )}
                <div className={`HDnavbarMenuDetailBox ${showDetailBox ? 'show' : ''}`} onMouseOver={handleMouseOver}>
                    <div className="HDnavbarMenuDetailInner">
                        <div className="HDnavbarBlank"></div>
                        <div className="HDnavbarMenuDetailFlex">
                            <ul className="HDnavbarMenuDetail">
                                <li class="title">바로가기</li>
                                <li>
                                    <a href="/specialAuction">실시간경매</a>
                                </li>
                                <li>
                                    <a href="/category">일반경매</a>
                                </li>
                                <li>
                                    <a href="/registration">물품등록</a>
                                </li>
                            </ul>
                            <ul className="HDnavbarMenuDetail">
                                <li class="title">분류</li>
                                <li>
                                    <a href="/category/all">전체보기</a>
                                </li>
                                <li>
                                    <a href="/category/clothing">의류/잡화</a>
                                </li>
                                <li>
                                    <a href="/category/hobby">취미/수집</a>
                                </li>
                                <li>
                                    <a href="/category/book">도서</a>
                                </li>
                                <li>
                                    <a href="/category/art">예술품</a>
                                </li>
                                <li>
                                    <a href="/category/elec">전자제품</a>
                                </li>
                                <li>
                                    <a href="/category/pic">사진</a>
                                </li>
                                <li>
                                    <a href="/category/antique">골동품</a>
                                </li>
                            </ul>

                            <div className="HDarrowIcon">
                                <img src={rightArrowIcon}></img>
                            </div>
                            <div className="HDnavbarMenuDetailCategoryBox">
                                <ul className="HDnavbarMenuDetailCategory">
                                    <li onClick={toClothing} style={{ cursor: 'pointer' }}>
                                        <a href="#">의류/잡화</a>
                                    </li>
                                    <li onClick={toHob}>
                                        <a href="#">취미/수집</a>
                                    </li>
                                    <li onClick={toBook}>
                                        <a href="#">도서</a>
                                    </li>
                                    <li onClick={toArt}>
                                        <a href="#">예술품</a>
                                    </li>
                                    <li onClick={toElec}>
                                        <a href="#">전자제품</a>
                                    </li>
                                    <li onClick={toPic}>
                                        <a href="#">사진</a>
                                    </li>
                                    <li onClick={toAntique}>
                                        <a href="#">골동품</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="HDnavbar-Wrapper">
                    <div className="HDnavbarWrapperInner">
                        <nav className="HDnavbar">
                            <div className="HDnavbarLogo" onClick={handleLogoClick}>
                                <img src={logo} alt="navbarLogo"></img>
                            </div>
                            <div className="HDnavbarMenuWrapper" onMouseOver={handleMouseOver}>
                                <div className="HDhamburgerMenu">
                                    <img src={hamburgerIcon} alt="hamburger_icon"></img>
                                    <button type="button">메뉴</button>
                                </div>
                            </div>

                            <HeaderSearchBar showDetailBox={showDetailBox} />
                            {token ? (
                                <>
                                    <ul className="HDnavbarMember">
                                        <li>
                                            <a onClick={handleLogout}>로그아웃</a>
                                        </li>
                                    </ul>
                                    <div
                                        className="HDnavbarAlarm"
                                        style={{ marginRight: '40px', position: 'relative' }}
                                        onMouseOver={handleMouseOverWallet}
                                        onMouseLeave={handleMouseLeaveWallet}
                                    >
                                        <img
                                            src={profileImageDto ? imageSrc : profileDefault}
                                            alt="My Page"
                                            style={{
                                                cursor: 'pointer',
                                                border: '1px solid #cdcdcd',
                                                borderRadius: '50%',
                                            }}
                                            onClick={handleMypage}
                                        />

                                        {showWalletPopup && (
                                            <div className="HDwalletPopup">
                                                <h3>지갑</h3>
                                                <div className="HDwalletAmount">
                                                    <p>금액</p>
                                                    <p>{Number(accountDto.userMoney).toLocaleString()} 원</p>
                                                </div>
                                                <div className="HDwalletButtons">
                                                    <button onClick={handleChargeBttnClick}>지갑 관리</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ul className="HDnavbarMember">
                                        <li>
                                            <a href="/login">로그인</a>
                                        </li>
                                        <li>
                                            <a href="/join">회원가입</a>
                                        </li>
                                    </ul>
                                </>
                            )}
                            <Alarm />
                            <button type="button" className="HDnavbarToggleBtn" onClick={handleMouseOver}>
                                <img src={hamburgerIcon} alt="hamburger_icon"></img>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
