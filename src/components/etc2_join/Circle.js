import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';

const steps = [
    { text: '1<br />약관동의<br />및 확인' }, // 줄바꿈을 <br /> 태그로 처리
    { text: '2<br />정보입력' },
    { text: '3<br />가입완료' },
];

const Circle = ({ activeStep }) => {
    return (
        <Grid container justifyContent="center" alignItems="center" spacing={1} marginBottom={3}>
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    {/* 원형 단계 표시 */}
                    <Grid item xs={1.8}>
                        <Box textAlign="center">
                            <Box
                                sx={{
                                    width: '10rem',
                                    height: '10rem',
                                    backgroundColor: activeStep === index ? '#1a2947' : '#ddd',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                    fontWeight: 400,
                                    fontSize: '1.3rem',
                                    lineHeight: 1.5,
                                }}
                            >
                                <Box dangerouslySetInnerHTML={{ __html: step.text }} />
                            </Box>
                        </Box>
                    </Grid>

                    {/* 화살표 표시 (마지막 항목 뒤에는 없음) */}
                    {index < steps.length - 1 && (
                        <Grid item>
                            <Box
                                sx={{
                                    width: '5rem',
                                    height: '10rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img src="/images/Vector.svg" alt="Arrow" style={{ height: '2rem' }} />
                            </Box>
                        </Grid>
                    )}
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default Circle;
