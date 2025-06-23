import React from 'react';

const StepTwo = ({ data, update, next, prev }) => {
    const handleChange = (e) => update({ [e.target.name]: e.target.value });

    const handleNext = () => {
        if (
            !data.name ||
            !data.memberId ||
            !data.memberPw ||
            data.memberPw !== data.memberPwCheck
        ) {
            alert('필수 정보를 올바르게 입력하세요.');
            return;
        }
        next();
    };

    return (
        <div className="step">
            <h2 className="join-title">기본정보 입력</h2>
            <input
                name="name"
                placeholder="이름"
                value={data.name}
                onChange={handleChange}
                className="join-input"
            />
            <input
                name="memberId"
                placeholder="아이디"
                value={data.memberId}
                onChange={handleChange}
                className="join-input"
            />
            <input
                type="password"
                name="memberPw"
                placeholder="비밀번호"
                value={data.memberPw}
                onChange={handleChange}
                className="join-input"
            />
            <input
                type="password"
                name="memberPwCheck"
                placeholder="비밀번호 확인"
                value={data.memberPwCheck}
                onChange={handleChange}
                className="join-input"
            />
            <input
                name="nickname"
                placeholder="닉네임"
                value={data.nickname}
                onChange={handleChange}
                className="join-input"
            />
            <input
                name="email"
                placeholder="이메일"
                value={data.email}
                onChange={handleChange}
                className="join-input"
            />
            <input
                name="memberPnum"
                placeholder="휴대전화"
                value={data.memberPnum}
                onChange={handleChange}
                className="join-input"
            />
            <input
                name="address"
                placeholder="주소"
                value={data.address}
                onChange={handleChange}
                className="join-input"
            />
            <input
                name="addressDetail"
                placeholder="상세주소"
                value={data.addressDetail}
                onChange={handleChange}
                className="join-input"
            />
            <div className="join-actions">
                <button onClick={prev}>이전</button>
                <button onClick={handleNext}>제출</button>
            </div>
        </div>
    );
};

export default StepTwo;
