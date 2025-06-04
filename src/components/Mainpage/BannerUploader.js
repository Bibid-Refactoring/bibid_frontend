import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addBanner } from '../../slices/banner/bannerSlice';

export default function BannerUploader() {
    const [file, setFile] = useState(null);
    const CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD; // 예: "my-cloud-name"
    const UPLOAD_PRESET = 'banner_preset'; // 방금 만든 언사인드 preset
    const dispatch = useDispatch()

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload`,
                formData
            );
            console.log('Cloudinary upload response:', res.data);
            // 여기서 res.data.public_id를 반드시 받아서…
            const publicId = res.data.public_id;
            dispatch(addBanner(publicId));
            // → 내 서버(DB)에 저장하거나
            // → 바로 makeBannerUrl에 넘겨서 배너로 보여주면 됩니다.
        } catch (err) {
            console.error('업로드 실패:', err.response?.data);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={() => handleUpload(file)}>배너 업로드</button>
        </div>
    );
}
