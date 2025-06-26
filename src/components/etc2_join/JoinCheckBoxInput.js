import React from 'react';
import ModalContent from './CheckBoxModalContent';
import '../../css/Join/JoinCheckBoxInput.css';

const JoinCheckBoxInput = ({ agreements, update, errors, agreementRef }) => {
    const boxes = [
        '[필수] BIBID 이용약관 동의',
        '[필수] 전자금융거래 이용약관 동의',
        '[필수] 개인정보 수집 및 이용 동의',
        '[필수] 개인정보 제3자 제공 동의',
        '[선택] 마케팅 목적의 개인정보 수집 및 이용 동의',
        '[선택] 광고성 정보 수신 동의',
    ];

    const [openModals, setOpenModals] = React.useState(Array(boxes.length).fill(false));

    const handleChangeAll = () => {
        const allChecked = agreements.every(Boolean);
        const newChecked = agreements.map(() => !allChecked);
        update(newChecked);
    };

    const handleChange = (index) => {
        const newChecked = [...agreements];
        newChecked[index] = !newChecked[index];
        update(newChecked);
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

    return (
        <div className="checkbox-wrapper">
            <label className="check-all">
                <input
                    type="checkbox"
                    checked={agreements.every(Boolean)}
                    onChange={handleChangeAll}
                    ref={agreementRef.agreements}
                />
                모두 확인하였으며 동의합니다.
            </label>

            <label className="checkbox-item">
                <input type="checkbox" checked={agreements[0]} onChange={() => handleChange(0)} />
                [필수] 만 14세 이상입니다.
            </label>

            {boxes.map((label, i) => (
                <div key={i} className="checkbox-item-row">
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={agreements[i + 1]}
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
            {errors.agreements && <div className="error-message">{errors.agreements}</div>}
        </div>
    );
};

export default JoinCheckBoxInput;
