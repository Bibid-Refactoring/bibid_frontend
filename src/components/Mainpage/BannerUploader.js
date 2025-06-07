import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addBanner } from '../../slices/banner/bannerSlice';
import '../../css/Main/BannerUploader.css';
import white_X_icon from '../../images/white_X_icon.svg';

export default function BannerUploader() {
    const dispatch = useDispatch();
    const memberRole = useSelector((state) => state.memberSlice.role);

    // 관리자 권한이 아닐 경우 렌더링하지 않음
    if (memberRole !== 'ROLE_ADMIN') {
        return null;
    }

    const fileInputRef = useRef(null);

    const [selectedFiles, setSelectedFiles] = useState([]); // Array<File>
    const [previews, setPreviews] = useState([]); // Array<{ file: File; previewUrl: string }>
    const [auctionNumber, setAuctionNumber] = useState('');

    const UPLOAD_PRESET = 'banner_preset';
    const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD;

    // 파일 선택창 열리는 역할을 하는 버튼 클릭 핸들러
    const handleClickSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    // selectedFiles가 바뀔 때마다 미리보기 URL 생성/해제
    useEffect(() => {
        // 이전에 생성한 URL 해제
        previews.forEach((p) => URL.revokeObjectURL(p.previewUrl));

        // 새롭게 미리보기 URL 생성
        const nextPreviews = selectedFiles.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));
        setPreviews(nextPreviews);

        return () => {
            nextPreviews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
        };
    }, [selectedFiles]);

    // 개별 미리보기 제거
    const handleRemovePreview = (fileToRemove) => {
        setSelectedFiles((prev) => prev.filter((file) => file !== fileToRemove));
    };

    // 모든 선택된 이미지를 Cloudinary에 업로드
    const handleUploadAll = async () => {
        if (selectedFiles.length === 0) {
            alert('업로드할 이미지를 하나 이상 선택해주세요.');
            return;
        }

        for (const file of selectedFiles) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            try {
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
                const publicId = res.data.public_id;

                const newBanner = {
                    publicId,
                    title: '테스트 배너', // 예시: 사용자가 입력한 제목
                    linkUrl: `category-itemdetail/${auctionNumber}`,
                    displayOrder: 0, // 원하는 순서
                    startDate: '2025-06-05', // YYYY-MM-DD
                    endDate: '2025-07-05',
                };

                dispatch(addBanner(newBanner));
            } catch (err) {
                console.error('업로드 실패:', err.response?.data || err.message);
                alert(`"${file.name}" 업로드에 실패했습니다.`);
            }
        }

        setSelectedFiles([]);
        setPreviews([]);
        alert('선택된 모든 이미지를 업로드했습니다.');
    };

    return (
        <div className="banner-uploader">
            <h2 className="banner-uploader__title">관리자용 배너 업로드</h2>

            <input
                id="bannerFileInput"
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="banner-uploader__file-input"
            />

            <button type="button" className="banner-uploader__select-button" onClick={handleClickSelect}>
                파일 선택
            </button>
            <p className="banner-uploader__note">여러 개의 이미지를 선택할 수 있습니다.</p>

            {previews.length > 0 && (
                <div className="banner-uploader__preview-container">
                    {previews.map(({ file, previewUrl }) => (
                        <div key={previewUrl} className="banner-uploader__preview-item">
                            <img src={previewUrl} alt={file.name} className="banner-uploader__preview-image" />
                            <button
                                onClick={() => handleRemovePreview(file)}
                                className="banner-uploader__remove-button"
                                title="이 이미지 제거"
                            >
                                <img src={white_X_icon} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <label htmlFor='auctionNumber' className='auction-label'>
                경매 번호:
                <input
                    id='auctionNumber'
                    type="number"
                    value={auctionNumber}
                    onChange={(e) => setAuctionNumber(e.target.value)}
                    placeholder="예) 21"
                    className='auction-input'
                />
            </label>

            <button onClick={handleUploadAll} className="banner-uploader__upload-button">
                선택된 배너 모두 업로드
            </button>
        </div>
    );
}
