import React, { useState } from 'react';
import ModalContent from './CheckBoxModalContent';
import '../../css/Join/StepOne.css'; // 필요한 CSS 스타일 작성

const StepOne = ({ data, update, next }) => {
    const boxes = [
        '[필수] BIBID 이용약관 동의',
        '[필수] 전자금융거래 이용약관 동의',
        '[필수] 개인정보 수집 및 이용 동의',
        '[필수] 개인정보 제3자 제공 동의',
        '[선택] 마케팅 목적의 개인정보 수집 및 이용 동의',
        '[선택] 광고성 정보 수신 동의',
    ];

    const [checked, setChecked] = useState(Array(boxes.length + 1).fill(false)); // +1 for "만 14세 이상"
    const [openModals, setOpenModals] = useState(Array(boxes.length).fill(false));

    const handleChangeAll = () => {
        const allChecked = checked.every(Boolean);
        const newChecked = checked.map(() => !allChecked);
        setChecked(newChecked);
        update({ agreements: newChecked });
    };

    const handleChange = (index) => {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
        update({ agreements: newChecked });
    };

    const handleOpen = (index) => {
        const modals = [...openModals];
        modals[index] = true;
        setOpenModals(modals);
    };

    const handleClose = (index) => {
        const modals = [...openModals];
        modals[index] = false;
        setOpenModals(modals);
    };

    const handleNext = () => {
        const required = [0, 1, 2, 3, 4]; // 만14세 + 필수 약관들
        const allAgreed = required.every((i) => checked[i]);
        if (allAgreed) {
            next();
        } else {
            alert('필수 항목을 모두 체크해 주세요.');
        }
    };

    return (
        <div className="checkbox-wrapper">
            <label className="check-all">
                <input
                    type="checkbox"
                    checked={checked.every(Boolean)}
                    onChange={handleChangeAll}
                />
                모두 확인하였으며 동의합니다.
            </label>

            <label className="checkbox-item">
                <input type="checkbox" checked={checked[0]} onChange={() => handleChange(0)} />
                [필수] 만 14세 이상입니다.
            </label>

            {boxes.map((label, i) => (
                <div key={i} className="checkbox-item-row">
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={checked[i + 1]}
                            onChange={() => handleChange(i + 1)}
                        />
                        {label}
                    </label>
                    <img
                        src="/images/Vector.svg"
                        alt="약관 보기"
                        className="arrow-icon"
                        onClick={() => handleOpen(i)}
                    />

                    {openModals[i] && (
                        <div className="modal-overlay" onClick={() => handleClose(i)}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <ModalContent title={label} index={i} />
                                <button onClick={() => handleClose(i)}>닫기</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="join-actions">
                <button onClick={handleNext}>다음</button>
            </div>
        </div>
    );
};

export default StepOne;
