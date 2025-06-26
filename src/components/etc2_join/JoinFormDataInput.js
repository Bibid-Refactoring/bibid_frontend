import React from 'react';
import '../../css/Join/JoinFormDataInput.css';

const JoinFormDataInput = ({ data, update, errors, setErrors, validateField, refs }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        update({ [name]: value });

        const message = validateField(name, value); // message만 return
        setErrors((prev) => ({ ...prev, [name]: message }));
    };

    return (
        <div className="step">
            <h2 className="join-title">기본정보 입력</h2>

            <div className="join-input-group">
                <label className="join-label">이름*</label>
                <input
                    name="name"
                    placeholder="이름을 입력하세요"
                    value={data.name}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.name}
                />
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}

            <div className="join-input-group">
                <label className="join-label">아이디*</label>
                <input
                    name="memberId"
                    placeholder="아이디를 입력하세요"
                    value={data.memberId}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.memberId}
                />
            </div>
            {errors.memberId && <div className="error-message">{errors.memberId}</div>}

            <div className="join-input-group">
                <label className="join-label">비밀번호*</label>
                <span className="join-subtext">영문, 숫자, 특수문자 조합 8~16자</span>
                <input
                    type="password"
                    name="memberPw"
                    placeholder="비밀번호를 입력하세요"
                    value={data.memberPw}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.memberPw}
                />
            </div>
            {errors.memberPw && <div className="error-message">{errors.memberPw}</div>}

            <div className="join-input-group">
                <label className="join-label">비밀번호 확인*</label>
                <input
                    type="password"
                    name="memberPwCheck"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={data.memberPwCheck}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.memberPwCheck}
                />
            </div>
            {errors.memberPwCheck && <div className="error-message">{errors.memberPwCheck}</div>}

            <div className="join-input-group">
                <label className="join-label">닉네임*</label>
                <input
                    name="nickname"
                    placeholder="닉네임을 입력하세요"
                    value={data.nickname}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.nickname}
                />
            </div>
            {errors.nickname && <div className="error-message">{errors.nickname}</div>}

            <div className="join-input-group">
                <label className="join-label">이메일 주소*</label>
                <span className="join-subtext">예) kream@kream.co.kr</span>
                <input
                    name="email"
                    placeholder=""
                    value={data.email}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.email}
                />
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}

            <div className="join-input-group">
                <label className="join-label">휴대전화*</label>
                <input
                    name="memberPnum"
                    placeholder="숫자만 입력하세요"
                    value={data.memberPnum}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.memberPnum}
                />
            </div>
            {errors.memberPnum && <div className="error-message">{errors.memberPnum}</div>}

            <div className="join-input-group">
                <label className="join-label">주소*</label>
                <input
                    name="address"
                    placeholder="기본 주소"
                    value={data.address}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.address}
                />
            </div>
            {errors.address && <div className="error-message">{errors.address}</div>}

            <div className="join-input-group">
                <label className="join-label">상세주소*</label>
                <input
                    name="addressDetail"
                    placeholder="상세 주소"
                    value={data.addressDetail}
                    onChange={handleChange}
                    className="join-input"
                    ref={refs.addressDetail}
                />
            </div>
            {errors.addressDetail && <div className="error-message">{errors.addressDetail}</div>}
        </div>
    );
};

export default JoinFormDataInput;
