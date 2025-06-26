import React from 'react';

const JoinSuccessful = ({ data }) => {
    return (
        <div className="join-complete">
            <h2>가입 완료</h2>
            <p>{data.memberId}님, 가입이 성공적으로 완료되었습니다.</p>
            <a href="/login">로그인하기</a>
        </div>
    );
};

export default JoinSuccessful;
