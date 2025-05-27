import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchCondition, changeSearchKeyword } from '../../slices/search/searchSlice';
import { useNavigate } from 'react-router-dom';
import '../../css/Layout/HeaderSearchBar.css';

const HeaderSearchBar = (showDetailBox) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchCondition = useSelector((state) => state.auction.searchCondition);
    const searchKeyword = useSelector((state) => state.auction.searchKeyword);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // 컴포넌트가 마운트될 때 searchKeyword를 빈 문자열로 초기화
    useEffect(() => {
        dispatch(changeSearchKeyword(''));
    }, [dispatch]);

    const handleChangeSearchKeyword = useCallback(
        (e) => {
            dispatch(changeSearchKeyword(e.target.value));
        },
        [dispatch]
    );

    const toggleSearchBar = () => {
        setIsSearchOpen((prev) => !prev);
    };

    const handleSearch = useCallback(
        (e) => {
            e.preventDefault();

            if (searchKeyword === '') {
                alert('검색어를 입력해주세요');
            } else {
                // 로컬 스토리지에 검색 조건과 키워드 저장
                localStorage.setItem('searchCondition', searchCondition);
                localStorage.setItem('searchKeyword', searchKeyword);

                // /search로 이동
                window.location.href = '/search';
            }
        },
        [dispatch, searchCondition, searchKeyword, navigate]
    );

    return (
        <div className="header-search-wrapper">
            <form onSubmit={handleSearch} className={`header-search-form ${isSearchOpen ? 'visible' : ''}`}>
                <input
                    type="text"
                    name="searchKeyword"
                    value={searchKeyword}
                    onChange={handleChangeSearchKeyword}
                    placeholder="검색어를 입력하세요"
                    className="header-search-input"
                />
                <div className="header-search-icon" onClick={() => setIsOpen((prev) => !prev)}></div>
            </form>
        </div>
    );
};

export default HeaderSearchBar;
