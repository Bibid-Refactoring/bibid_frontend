// import React, {useEffect, useState} from 'react';  // useState를 import해야 합니다.
// import Circle from "../../components/etc2_join/Circle";
// import styled from "styled-components";
// import CheckBoxComponent from "../../components/etc2_join/CheckBoxComponent";
// import ButtonComponent from "../../components/etc2_join/ButtonComponent";
// import {Box} from "@mui/material";
// import {useNavigate} from "react-router-dom";
// import {useSelector} from "react-redux";

// const JoinBlock = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 1200px;
//     margin: 0 auto;
//     height: 100vh;
//     position: relative;
//     padding: 60px 0; /* 상하 여백 추가 */
// `;

// const StyledText = styled.div`
//     font-size: 3rem;
//     color: #444;
//     text-align: left;
//     margin-top: 30px;
//     border-bottom: 2px solid #444;
//     padding-bottom: 5px;
//     font-family: "IBM Plex Sans KR", sans-serif;
// `;

// const JoinText = () => {
//     return (
//         <StyledText>
//             약관 동의
//         </StyledText>
//     );
// };

// const Join = () => {

//     const navi = useNavigate();
//     const [activeStep, setActiveStep] = useState(0);
//     const [checked, setChecked] = useState(Array(7).fill(false));
//     const [checkedIndices, setCheckedIndices] = useState([]);
//     const checkLoginState = useSelector(state => state.memberSlice.checkLoginState);

//     useEffect(() => {
//         if(checkLoginState){
//             alert("로그아웃 후 이용하세요");
//             navi("/");
//         }

//     }, [checkLoginState]);

//     const handleCheckedChange = (indices) => {
//         setCheckedIndices(indices);
//     };

//     const handleSubmit = () => {
//         // 체크된 인덱스가 [0, 1, 2, 3, 4]인지 확인
//         const requiredIndices = [0, 1, 2, 3, 4];

//         // checkedIndices가 requiredIndices와 정확히 일치하는지 확인
//         const isValid = requiredIndices.every(index => checkedIndices.includes(index));

//         if (isValid) {
//             navi('/join/two'); // 조건이 충족되면 네비게이션
//         } else {
//             alert("필수 항목에 동의해 주세요."); // 조건이 충족되지 않으면 경고 메시지
//         }
//     };

//     const handlePrev = () => {
//         navi('/');
//     }

//     return (
//         <JoinBlock>
//             <Circle activeStep={activeStep} style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)'}} />
//             <Box sx={{display: 'flex', justifyContent: 'flex-start', width: '65%'}}>
//                 <JoinText/>
//             </Box>
//             <CheckBoxComponent checked={checked} setChecked={setChecked} onCheckedChange={handleCheckedChange}/>
//             <ButtonComponent prev={'다음'} next={'취소'} onSubmit={handleSubmit} onPrev={handlePrev}
//             />
//         </JoinBlock>
//     );
// };

// export default Join;

/**----------------------------------------------------------------------- */

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import CheckBoxComponent from '../../components/etc2_join/CheckBoxComponent';
// import Circle from '../../components/etc2_join/Circle';
// import LoginLayout from '../../components/Layout/LoginLayout';
// import '../../css/Join/Join.css';

// export default function Join() {
//     const navigate = useNavigate();
//     const isLoggedIn = useSelector((s) => s.memberSlice.checkLoginState);
//     const [checked, setChecked] = useState(Array(7).fill(false));
//     const [checkedIndices, setCheckedIndices] = useState([]);

//     useEffect(() => {
//         if (isLoggedIn) {
//             alert('로그아웃 후 이용하세요');
//             navigate('/');
//         }
//     }, [isLoggedIn, navigate]);

//     const handleNext = () => {
//         const required = [0, 1, 2, 3, 4];
//         if (required.every((i) => checkedIndices.includes(i))) {
//             navigate('/join/two');
//         } else {
//             alert('필수 항목에 동의해 주세요.');
//         }
//     };

//     return (
//         <LoginLayout>
//             <div className="join-container">
//                 <Circle activeStep={0} className="join-step" />
//                 <h1 className="join-title">약관 동의</h1>
//                 <CheckBoxComponent
//                     checked={checked}
//                     setChecked={setChecked}
//                     checkedIndices={checkedIndices}
//                     onCheckedChange={setCheckedIndices}
//                 />
//                 <div className="join-actions">
//                     <button className="btn next-btn" onClick={handleNext}>
//                         다음
//                     </button>
//                     <button className="btn cancel-btn" onClick={() => navigate('/')}>
//                         취소
//                     </button>
//                 </div>
//             </div>
//         </LoginLayout>
//     );
// }

import React, { useRef, useState } from 'react';
import JoinFormDataInput from '../../components/etc2_join/JoinFormDataInput';
import JoinCheckBoxInput from '../../components/etc2_join/JoinCheckBoxInput';
import JoinSuccessful from '../../components/etc2_join/JoinSuccessful';
import LoginLayout from '../../components/Layout/LoginLayout';
import { useDispatch } from 'react-redux';
import { join } from '../../apis/etc2_memberapis/memberApis';
import '../../css/Join/Join.css';

const Join = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        memberId: '',
        memberPw: '',
        memberPwCheck: '',
        nickname: '',
        memberPnum: '',
        email: '',
        address: '',
        addressDetail: '',
    });

    const [agreements, setAgreements] = useState(Array(7).fill(false));
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const isEmpty = (val) => !val || !val.trim();
    const isValidId = (val) => /^[a-zA-Z0-9_]{4,20}$/.test(val);
    const isValidPw = (val) => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*+=-]).{9,}$/.test(val);
    const isValidPhone = (val) => /^010\d{8}$/.test(val);
    const isValidEmail = (val) => /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(val);

    const validateField = (name, value) => {
        let message = '';
        switch (name) {
            case 'name':
                if (isEmpty(value)) message = '이름을 입력하세요.';
                break;
            case 'memberId':
                if (isEmpty(value)) message = '아이디를 입력하세요.';
                else if (!isValidId(value))
                    message = '아이디는 영문자, 숫자 조합 4~20자여야 합니다.';
                break;
            case 'memberPw':
                if (isEmpty(value)) message = '비밀번호를 입력하세요.';
                else if (!isValidPw(value))
                    message = '비밀번호는 특수문자, 숫자, 영문자 조합의 9자리 이상이어야 합니다.';
                break;
            case 'memberPwCheck':
                if (value !== formData.memberPw) message = '비밀번호가 일치하지 않습니다.';
                break;
            case 'nickname':
                if (isEmpty(value)) message = '닉네임을 입력하세요.';
                break;
            case 'memberPnum':
                if (isEmpty(value)) message = '휴대전화 번호를 입력하세요.';
                else if (!isValidPhone(value))
                    message = '휴대전화는 010으로 시작하는 11자리 숫자여야 합니다.';
                break;
            case 'email':
                if (isEmpty(value)) message = '이메일을 입력하세요.';
                else if (!isValidEmail(value)) message = '올바른 이메일 형식을 입력하세요.';
                break;
            case 'address':
                if (isEmpty(value)) message = '주소를 입력하세요.';
                break;
            case 'addressDetail':
                if (isEmpty(value)) message = '상세주소를 입력하세요.';
                break;
            default:
                break;
        }
        return message;
    };

    const validateAll = () => {
        const newErrors = {};
        let isValid = true;

        for (const [key, value] of Object.entries(formData)) {
            const message = validateField(key, value);
            if (message) {
                newErrors[key] = message;
                isValid = false;
            }
        }

        const required = [0, 1, 2, 3, 4];
        const allAgreed = required.every((i) => agreements[i]);
        if (!allAgreed) {
            newErrors.agreements = '필수 약관에 모두 동의해주세요.';
            isValid = false;
        }

        setErrors(newErrors);

        return { isValid, newErrors }; // ✅ 오류 목록도 리턴
    };

    const refs = {
        name: useRef(),
        memberId: useRef(),
        memberPw: useRef(),
        memberPwCheck: useRef(),
        nickname: useRef(),
        memberPnum: useRef(),
        email: useRef(),
        address: useRef(),
        addressDetail: useRef(),
        agreements: useRef(),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { isValid, newErrors } = validateAll();

        if (!isValid) {
            // 직접 받은 오류 객체로 포커스
            for (const key of [
                'name',
                'memberId',
                'memberPw',
                'memberPwCheck',
                'nickname',
                'memberPnum',
                'email',
                'address',
                'addressDetail',
                'agreements',
            ]) {
                if (newErrors[key]) {
                    refs[key]?.current?.focus();
                    break;
                }
            }
            return;
        }

        try {
            await dispatch(join({ ...formData, agreements }));
            alert('회원가입 완료!');
            setStep(1);
        } catch (err) {
            console.error('회원가입 실패:', err);
            alert('회원가입 실패. 다시 시도해주세요.');
        }
    };

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const updateAgreements = (newChecked) => {
        setAgreements(newChecked);
        const required = [0, 1, 2, 3, 4];
        const allAgreed = required.every((i) => newChecked[i]);
        const message = allAgreed ? '' : '필수 약관에 모두 동의해주세요.';
        setErrors((prev) => ({ ...prev, agreements: message }));
    };

    return (
        <LoginLayout>
            <div className="join-container">
                {step === 0 ? (
                    <>
                        <h2 className="join-title">회원가입</h2>
                        <form onSubmit={handleSubmit}>
                            <JoinFormDataInput
                                data={formData}
                                update={updateFormData}
                                errors={errors}
                                setErrors={setErrors}
                                validateField={validateField}
                                refs={refs}
                            />
                            <JoinCheckBoxInput
                                agreements={agreements}
                                update={updateAgreements}
                                errors={errors}
                                agreementRef={refs}
                            />
                            <div className="join-actions">
                                <button type="submit" className="btn submit-btn">
                                    제출하고 회원 가입하기
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <JoinSuccessful data={{ ...formData, agreements }} />
                )}
            </div>
        </LoginLayout>
    );
};

export default Join;
