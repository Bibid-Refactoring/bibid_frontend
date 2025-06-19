import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchKeyword } from '../../slices/search/searchSlice';
import { useNavigate } from 'react-router-dom';
import '../../css/Layout/HeaderSearchBar.css';

const HeaderSearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchCondition = useSelector((state) => state.auction.searchCondition);
    const searchKeyword = useSelector((state) => state.auction.searchKeyword);

    // 초기화: 컴포넌트 마운트 시 검색어 비우기
    useEffect(() => {
        dispatch(changeSearchKeyword(''));
    }, [dispatch]);

    // 검색어 입력 변경 핸들러
    const handleChangeSearchKeyword = useCallback(
        (e) => {
            dispatch(changeSearchKeyword(e.target.value));
        },
        [dispatch],
    );

    // 검색 실행 로직
    const performSearch = useCallback(() => {
        if (searchKeyword.trim() === '') {
            alert('검색어를 입력해주세요');
            return;
        }

        localStorage.setItem('searchCondition', searchCondition);
        localStorage.setItem('searchKeyword', searchKeyword);

        navigate('/search');
    }, [searchCondition, searchKeyword, navigate]);

    // 폼 제출 핸들러
    const handleSearch = useCallback(
        (e) => {
            e.preventDefault();
            performSearch();
        },
        [performSearch],
    );

    return (
        <div className="header-search-wrapper">
            <form onSubmit={handleSearch} className="header-search-form">
                <input
                    type="text"
                    name="searchKeyword"
                    value={searchKeyword}
                    onChange={handleChangeSearchKeyword}
                    placeholder="검색어를 입력하세요"
                    className="header-search-input"
                />
                <div
                    className="header-search-icon"
                    onClick={performSearch}
                    role="button"
                    tabIndex={0}
                    aria-label="검색 실행"
                ></div>
            </form>
        </div>
    );
};

export default HeaderSearchBar;
