import React from 'react';
import { Container, TextField, Button, Typography, Grid2, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import {useSelector} from "react-redux";

const RegistrationStep3 = ({ formData, setFormData, nextStep, prevStep, memberInfo }) => {
  const nickname = useSelector(state => state.memberSlice.nickname);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("nickname RegistrationStep3:" + nickname);

    const userConfirmed = window.confirm("현재까지의 정보로 물품이 등록됩니다. 괜찮으시겠습니까?");
    
    if (userConfirmed) {
      const formDataToSend = new FormData();
      const { shippingMethod, costResponsibility, ...remainingData } = formData;

      formDataToSend.append('auctionDetailDto', new Blob([JSON.stringify({ shippingMethod, costResponsibility })], { type: 'application/json' }));
      formDataToSend.append('auctionDto', new Blob([JSON.stringify(remainingData)], { type: 'application/json' }));

      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }

      formData.additionalImages.forEach((file) => {
        formDataToSend.append('additionalImages', file);
      });

      axios.post(`${process.env.REACT_APP_BACK_SERVER}/auction/post`, formDataToSend, {
        withCredentials: true
      })
      .then(response => {
        console.log(response);

        // 실시간 경매일 경우에만 방송 생성 API 호출
        if (formData.auctionType === '실시간 경매') {
          const auctionIndex = response.data.item?.auctionIndex;

          axios.post(`${process.env.REACT_APP_BACK_SERVER}/specialAuction/createLive/${auctionIndex}`, null, {
            withCredentials: true
          })
          .then(() => {
            console.log('방송 생성 완료');
            nextStep();
          })
          .catch(err => {
            console.error('방송 생성 실패:', err);
            alert('방송 생성에 실패했습니다. 관리자에게 문의해주세요.');
            nextStep();
          });
        } else {
          nextStep();
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit}>
      
        <Typography variant="h5" sx={{ fontWeight: 'bold', my: 4 }}>3-1. 배송 설정</Typography>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            배송방법*
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B' }}>
            <RadioGroup
              row
              name="shippingMethod"
              value={formData.shippingMethod || ''}
              onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
              sx={{ marginRight: '1rem', padding: '15px' }}
            >
              <FormControlLabel value="택배" control={<Radio />} label="택배" />
              <FormControlLabel value="우편" control={<Radio />} label="우편" />
              <FormControlLabel value="직거래" control={<Radio />} label="직거래" />
            </RadioGroup>
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            비용부담*
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B' }}>
            <RadioGroup
              row
              name="costResponsibility"
              value={formData.costResponsibility || ''}
              onChange={(e) => setFormData({ ...formData, costResponsibility: e.target.value })}
              sx={{ marginRight: '1rem', padding: '15px' }}
            >
              <FormControlLabel value="선불" control={<Radio />} label="선불(판매자 부담)" />
              <FormControlLabel value="착불" control={<Radio />} label="착불" />
            </RadioGroup>
          </Grid2>
        </Grid2>

        <Typography variant="h5" sx={{ fontWeight: 'bold', my: 4 }}>3-2. 기타 설정</Typography>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            즉시구매가*
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B' }}>
            <RadioGroup
              row
              name="instantPurchaseEnabled"
              value={formData.instantPurchaseEnabled ? 'true' : 'false'}
              onChange={(e) => setFormData({ ...formData, instantPurchaseEnabled: e.target.value === 'true' })}
              sx={{ marginRight: '1rem', padding: '15px' }}
            >
              <FormControlLabel value="false" control={<Radio />} label="불가능" />
              <FormControlLabel value="true" control={<Radio />} label="가능" />
            </RadioGroup>
            <TextField
              fullWidth
              variant="outlined"
              value={formData.instantPurchasePrice || ''}
              onChange={(e) => setFormData({ ...formData, instantPurchasePrice: e.target.value })}
              sx={{ width: '10rem' }}
              disabled={!formData.instantPurchaseEnabled} // 즉시구매가 불가능할 때 비활성화
              InputProps={{
                sx: {
                    '& .MuiOutlinedInput-input': {
                        padding: '8px 16px', // 원하는 padding 값으로 수정하세요
                    }
                }
              }}
            />
            <span>원</span>
            <span style={{marginLeft : '2rem', color:'red', fontWeight: 'bold'}}>*시작가보다 30% 높은 가격부터 등록 가능합니다.</span>
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2 size={2.5} sx={{ textAlign: 'center', backgroundColor: '#E7E9FF', height: '65px', lineHeight: '65px', fontWeight: 'bold', border: '1px solid #7B7B7B' }}>
            자동재경매*
          </Grid2>
          <Grid2 size={9.5} sx={{ display: 'flex', alignItems: 'center', height: '65px', border: '1px solid #7B7B7B' }}>
            <RadioGroup
              row
              name="autoReauctionEnabled"
              value={formData.autoReauctionEnabled ? 'true' : 'false'}
              onChange={(e) => setFormData({ ...formData, autoReauctionEnabled: e.target.value === 'true' })}
              sx={{ marginRight: '1rem', padding: '15px' }}
            >
              <FormControlLabel value="false" control={<Radio />} label="없음" />
              <FormControlLabel value="true" control={<Radio />} label="있음" />
            </RadioGroup>
            <span>재경매 시작가 :</span>
            <TextField
              fullWidth
              variant="outlined"
              value={formData.reauctionStartingPrice || ''}
              onChange={(e) => setFormData({ ...formData, reauctionStartingPrice: e.target.value })}
              sx={{ width: '10rem', marginLeft: '7px'}}
              disabled={!formData.autoReauctionEnabled} // 재경매가 불가능할 때 비활성화
              InputProps={{
                sx: {
                    '& .MuiOutlinedInput-input': {
                        padding: '8px 16px', // 원하는 padding 값으로 수정하세요
                    }
                }
              }}
            />
            <span>원</span>
          </Grid2>
        </Grid2>
                      
        <Grid2 container sx={{ mt: 10, backgroundColor: '#EBEBEB', padding: '20px' }}>
          <Grid2 size={12} sx={{ fontWeight: 'bold', my: '5px' }}>
            &lt;주의사항&gt;
          </Grid2>

          <Grid2 size={12} sx={{ fontWeight: 'bold', my: '5px' }}>
            • 판매자 {nickname}은(는) 이용약관을 준수해야 하며, 등록된 경매에 대한 모든 법적 책임은 {nickname}에게 있습니다.
          </Grid2>

          <Grid2 size={12} sx={{ fontWeight: 'bold', my: '5px' }}>
            • 의도적으로 타 이용자를 속이거나 사이트 이용약관을 준수하지 않은 경우, 사이트 이용을 제한당할 수 있습니다.
          </Grid2>
        </Grid2>

        <Grid2 container justifyContent="space-between" alignItems="center" sx={{ mt: 10, mb: 10 }}>
          {/* 이전 단계 버튼 */}
          <Grid2>
            <Button
              variant="contained"
              sx={{ 
                width: '8rem', 
                backgroundColor: '#D9D9D9', 
                color: 'black', 
                fontWeight: 'bold', 
                fontSize: '1rem',
                transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#0A369D', // hover 시 배경색
                    color: 'white' // hover 시 텍스트 색상
                  }
              }}
              onClick={prevStep}
            >
              이전 단계
            </Button>
          </Grid2>

          {/* 다음 단계 버튼 */}
          <Grid2>
            <Button
              variant="contained"
              sx={{ 
                width: '8rem', 
                backgroundColor: '#D9D9D9', 
                color: 'black', 
                fontWeight: 'bold', 
                fontSize: '1rem',
                transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#0A369D', // hover 시 배경색
                    color: 'white' // hover 시 텍스트 색상
                  }
              }}
              type="submit"
            >
              물품 등록
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
};

export default RegistrationStep3;
