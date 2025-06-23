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

import React, { useState } from 'react';
import StepOne from '../../components/etc2_join/StepOne';
import StepTwo from '../../components/etc2_join/StepTwo';
import StepThree from '../../components/etc2_join/StepThree';
import Circle from '../../components/etc2_join/Circle';
import LoginLayout from '../../components/Layout/LoginLayout';
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
        agreements: [],
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const updateFormData = (newData) => setFormData((prev) => ({ ...prev, ...newData }));

    return (
        <LoginLayout>
            <div className="join-container">
                <Circle step={step} />
                {step === 0 && <StepOne data={formData} update={updateFormData} next={nextStep} />}
                {step === 1 && (
                    <StepTwo
                        data={formData}
                        update={updateFormData}
                        next={nextStep}
                        prev={prevStep}
                    />
                )}
                {step === 2 && <StepThree data={formData} />}
            </div>
        </LoginLayout>
    );
};

export default Join;
