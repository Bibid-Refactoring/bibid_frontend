import React, { useState } from 'react';
import '../../css/Layout/Footer.css';
import '../../css/Layout/MediaQuery.css';
import logo from '../../images/logo.svg';
import instagramIcon from '../../images/instagram_icon.svg';
import facebookIcon from '../../images/facebook_icon.svg';
import twitterIcon from '../../images/twitter_icon.svg';
import pinterestIcon from '../../images/pinterest_icon.svg';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`${email}로 구독 신청이 완료되었습니다.`);
        setEmail('');
    };

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer__box">
                <div className="footer__inner">
                    <div className="footer__box--left">
                        <div className="footer__logo">
                            <img src={logo} alt="원티드 로고" />
                            <p className="footer__tagline">당신의 선택을 기회로 바꾸는 플랫폼</p>
                        </div>
                        <div className="footer__social" aria-label="소셜 미디어 링크">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={instagramIcon} alt="인스타그램" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={facebookIcon} alt="페이스북" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={twitterIcon} alt="트위터" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={pinterestIcon} alt="핀터레스트" />
                            </a>
                        </div>
                        <button
                            onClick={handleScrollTop}
                            className="footer__top-button"
                            aria-label="맨 위로 이동"
                        >
                            ↑ 상단으로 가기
                        </button>
                    </div>

                    {/* 중앙 박스: 네비게이션 + 뉴스레터 구독 */}
                    <div className="footer__box--center">
                        <nav className="footer__nav" aria-label="푸터 네비게이션">
                            <ul className="footer__menu">
                                <li>
                                    <a href="/about">회사소개</a>
                                </li>
                                <li>
                                    <a href="/terms">이용약관</a>
                                </li>
                                <li>
                                    <a href="/privacy">개인정보처리방침</a>
                                </li>
                                <li>
                                    <a href="/anti-spam">이메일 무단 수집 거부</a>
                                </li>
                                <li>
                                    <a href="/support">고객센터</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="footer__box--right">
                            <address className="footer__address">
                                <p>회사명: 원티드(주)</p>
                                <p>주소: 서울특별시 강남구 3-5-8 삼오빌딩</p>
                                <p>
                                    Tel: <a href="tel:01012345678">010-1234-5678</a>
                                </p>
                                <p>
                                    Email:{' '}
                                    <a href="mailto:bitcamp502@bitcamp.com">
                                        bitcamp502@bitcamp.com
                                    </a>
                                </p>
                            </address>
                            <p className="footer__team">사이트 제작: 이주성</p>
                        </div>
                        <form onSubmit={handleSubscribe} className="footer__form">
                            <label htmlFor="footer-email" className="visually-hidden">
                                뉴스레터 구독
                            </label>
                            <input
                                id="footer-email"
                                type="email"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit">구독하기</button>
                        </form>
                    </div>
                </div>

                {/* 하단 저작권 */}
                <div className="footer__bottom-row">
                    <p>© {currentYear} 원티드. All rights reserved.</p>
                    <p>모든 이미지와 콘텐츠는 무단 복제를 금지합니다.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
