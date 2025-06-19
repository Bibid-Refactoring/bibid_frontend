import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../../css/Layout/Header.css';
import '../../css/Layout/MediaQuery.css';
import '../../css/Layout/Wallet.css';

import Alarm from '../Layout/Alarm';
import HeaderSearchBar from '../Search/HeaderSearchBar';

import logo from '../../images/logo.svg';
import hamburgerIcon from '../../images/hamburger_icon.svg';
import profileDefault from '../../images/profile_default.jpg';

import { checkLogin, logout } from '../../apis/etc2_memberapis/memberApis';
import { clearNotifications } from '../../slices/notification/notificationSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux 상태
    const accountDto = useSelector((state) => state.memberSlice.accountDto);
    const profileImageDto = useSelector((state) => state.memberSlice.profileImageDto);
    const oauthType = useSelector((state) => state.memberSlice.oauthType);

    // 로컬 상태
    const [token, setToken] = useState(null);
    const [showWalletPopup, setShowWalletPopup] = useState(false);
    const [showDetailBox, setShowDetailBox] = useState(false);

    // 로그인 상태 확인
    useEffect(() => {
        const verifyLogin = async () => {
            const result = await dispatch(checkLogin());
            setToken(result.payload);
        };
        verifyLogin();
    }, [dispatch]);

    // 프로필 이미지 처리
    const bucketName = process.env.REACT_APP_BUCKET_NAME;
    const imageSrc =
        profileImageDto?.filepath && profileImageDto?.newfilename
            ? `https://kr.object.ncloudstorage.com/${bucketName}/${profileImageDto.filepath}${profileImageDto.newfilename}`
            : profileDefault;

    // 핸들러
    const goToURL = (path) => () => navigate(`/${path}`);
    const handleToggleMenu = () => setShowDetailBox((prev) => !prev);
    const handleMouseLeave = () => setShowDetailBox(false);
    const handleMouseOverWallet = () => setShowWalletPopup(true);
    const handleMouseLeaveWallet = () => setShowWalletPopup(false);

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logout()).unwrap();
            dispatch(clearNotifications());
            setToken(false);

            if (oauthType === 'Kakao') {
                const kakaoLogoutParams = {
                    client_id: '29e81fa9fda262c573f312af9934fa5c',
                    logout_redirect_uri: process.env.REACT_APP_FRONT_SERVER,
                };
                const url = 'https://kauth.kakao.com/oauth/logout';
                window.location.href = `${url}?client_id=${kakaoLogoutParams.client_id}&logout_redirect_uri=${kakaoLogoutParams.logout_redirect_uri}`;
                return;
            }

            navigate('/');
        } catch (e) {
            console.error('로그아웃 실패:', e);
            alert('로그아웃 실패: 서버 응답을 확인하세요.');
        }
    }, [dispatch, oauthType, navigate]);

    return (
        <>
            <header>
                {showDetailBox && (
                    <div className="HDdropdownOverlay" onMouseOver={handleMouseLeave}></div>
                )}

                <div className={`HDnavbarMenuDetailBox ${showDetailBox ? 'show' : ''}`}>
                    <div className="HDnavbarMenuDetailInner">
                        <div className="HDnavbarBlank"></div>
                        <div className="HDnavbarMenuDetailFlex">
                            <ul className="HDnavbarMenuDetail">
                                <li className="title">바로가기</li>
                                <li onClick={goToURL('specialAuction')}>실시간경매</li>
                                <li onClick={goToURL('category')}>일반경매</li>
                                <li onClick={goToURL('registration')}>물품등록</li>
                            </ul>
                            <ul className="HDnavbarMenuDetail">
                                <li className="title">분류</li>
                                <li onClick={goToURL('category/all')}>전체보기</li>
                                <li onClick={goToURL('category/clothing')}>의류/잡화</li>
                                <li onClick={goToURL('category/hobby')}>취미/수집</li>
                                <li onClick={goToURL('category/book')}>도서</li>
                                <li onClick={goToURL('category/art')}>예술품</li>
                                <li onClick={goToURL('category/elec')}>전자제품</li>
                                <li onClick={goToURL('category/pic')}>사진</li>
                                <li onClick={goToURL('category/antique')}>골동품</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="HDnavbar-Wrapper">
                    <div className="HDnavbarWrapperInner">
                        <nav className="HDnavbar">
                            <div className="HDnavbarLogo" onClick={goToURL('')}>
                                <img src={logo} alt="navbarLogo" />
                            </div>

                            <div className="HDnavbarMenuWrapper">
                                <div className="HDhamburgerMenu">
                                    <img
                                        src={hamburgerIcon}
                                        alt="hamburger_icon"
                                        onClick={handleToggleMenu}
                                    />
                                    <button type="button" onClick={handleToggleMenu}>
                                        메뉴
                                    </button>
                                </div>
                            </div>

                            <HeaderSearchBar />

                            {token ? (
                                <>
                                    <ul className="HDnavbarMember">
                                        <li onClick={handleLogout}>로그아웃</li>
                                    </ul>
                                    <div
                                        className="HDnavbarAlarm"
                                        onMouseOver={handleMouseOverWallet}
                                        onMouseLeave={handleMouseLeaveWallet}
                                    >
                                        <img
                                            src={imageSrc}
                                            alt="My Page"
                                            onClick={goToURL('mypage/userInfo')}
                                        />
                                        {showWalletPopup && (
                                            <div className="HDwalletPopup">
                                                <h3>지갑</h3>
                                                <div className="HDwalletAmount">
                                                    <p>금액</p>
                                                    <p>
                                                        {Number(
                                                            accountDto.userMoney,
                                                        ).toLocaleString()}{' '}
                                                        원
                                                    </p>
                                                </div>
                                                <div className="HDwalletButtons">
                                                    <button onClick={goToURL('mypage/wallet')}>
                                                        지갑 관리
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <ul className="HDnavbarMember">
                                    <li onClick={goToURL('login')}>로그인</li>
                                    <li onClick={goToURL('join')}>회원가입</li>
                                </ul>
                            )}

                            <Alarm />
                            <button
                                type="button"
                                className="HDnavbarToggleBtn"
                                onClick={handleToggleMenu}
                            >
                                <img src={hamburgerIcon} alt="hamburger_icon" />
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
