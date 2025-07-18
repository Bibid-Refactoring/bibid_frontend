import { createSlice } from '@reduxjs/toolkit';
import {
    checkLogin,
    findIdByEmail,
    findMember,
    googleJwtToken,
    join,
    kakaoJwtToken,
    login,
    logout,
    modifyPasswd,
    naverJwtToken,
    verificationCodeCheck,
    uploadProfileImage,
    chargeAccount,
    exchangeAccount,
    buyAuction,
    sellAuction,
    fetchMember,
} from '../../apis/etc2_memberapis/memberApis';

const memberSlice = createSlice({
    name: 'members',
    initialState: {
        memberIndex: 0,
        memberId: '',
        nickname: '',
        email: '',
        verificationCode: '',
        token: '',
        keepLogin: false,
        memberPw: '',
        oauthType: '',
        isLogin: false,
        address: '',
        addressDetail: '',
        name: '',
        checkLoginState: false,
        profileImageDto: '',
        accountDto: '',
        role: '',
        googleAccessToken: '', // 민감한 정보이므로 사용 후 바로 삭제
    },
    reducers: {
        setGoogleAccessToken: (state, action) => {
            state.googleAccessToken = action.payload;
        },
        clearGoogleAccessToken: (state) => {
            state.googleAccessToken = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(join.fulfilled, (state, action) => {
            alert(`${action.payload.memberId}님 가입 축하드립니다.`);
            return state;
        });
        builder.addCase(join.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            alert(`${action.payload.memberId}님 환영합니다.`);

            return {
                ...state,
                memberIndex: action.payload.memberIndex,
                memberId: action.payload.memberId,
                nickname: action.payload.nickname,
                token: action.payload.token,
                profileImageDto: action.payload.profileImageDto,
                accountDto: action.payload.accountDto,
                isLogin: true,
                role: action.payload.role,
            };
        });
        builder.addCase(login.rejected, (state, action) => {
            if (action.payload.response.data.statusMessage === 'memberId not exist') {
                alert('존재하지 않는 아이디입니다.');
                return state;
            }

            if (action.payload.response.data.statusMessage === 'wrong memberPw') {
                alert('잘못된 비밀번호입니다.');
                return state;
            }
            return state;
        });
        builder.addCase(logout.fulfilled, (state) => {
            return {
                ...state,
                memberIndex: 0,
                memberId: '',
                nickname: '',
                email: '',
                verificationCode: '',
                token: '',
                keepLogin: false,
                memberPw: '',
                oauthType: '',
                isLogin: false,
                address: '',
                addressDetail: '',
                name: '',
                checkLoginState: false,
                profileImageDto: '',
                accountDto: '',
                role: '',
            };
        });
        builder.addCase(logout.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(findMember.fulfilled, (state, action) => {
            return {
                ...state,
                email: action.payload,
            };
        });

        builder.addCase(findMember.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(verificationCodeCheck.fulfilled, (state, action) => {
            return {
                ...state,
                verificationCode: action.payload,
            };
        });

        builder.addCase(verificationCodeCheck.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(findIdByEmail.fulfilled, (state, action) => {
            return {
                ...state,
                memberId: action.payload.item,
            };
        });

        builder.addCase(findIdByEmail.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(modifyPasswd.fulfilled, (state, action) => {
            return {
                ...state,
                memberPw: action.payload.item,
            };
        });

        builder.addCase(modifyPasswd.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(kakaoJwtToken.fulfilled, (state, action) => {
            return {
                ...state,
                isLogin: true,
                memberIndex: action.payload.memberIndex,
                oauthType: action.payload.oauthType,
                addressDetail: action.payload.addressDetail,
                email: action.payload.email,
                address: action.payload.memberAddress,
                memberId: action.payload.memberId,
                nickname: action.payload.nickname,
                name: action.payload.name,
            };
        });

        builder.addCase(kakaoJwtToken.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(naverJwtToken.fulfilled, (state, action) => {
            return {
                ...state,
                isLogin: true,
                memberIndex: action.payload.memberIndex,
                oauthType: action.payload.oauthType,
                addressDetail: action.payload.addressDetail,
                email: action.payload.email,
                address: action.payload.memberAddress,
                memberId: action.payload.memberId,
                nickname: action.payload.nickname,
                name: action.payload.name,
            };
        });

        builder.addCase(naverJwtToken.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(googleJwtToken.fulfilled, (state, action) => {
            return {
                ...state,
                isLogin: true,
                memberIndex: action.payload.memberIndex,
                oauthType: action.payload.oauthType,
                addressDetail: action.payload.addressDetail,
                email: action.payload.email,
                address: action.payload.memberAddress,
                memberId: action.payload.memberId,
                nickname: action.payload.nickname,
                name: action.payload.name,
            };
        });

        builder.addCase(googleJwtToken.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(checkLogin.fulfilled, (state, action) => {
            return {
                ...state,
                checkLoginState: action.payload,
            };
        });

        builder.addCase(checkLogin.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(uploadProfileImage.fulfilled, (state, action) => {
            return {
                ...state,
                profileImageDto: action.payload,
            };
        });

        builder.addCase(uploadProfileImage.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });

        builder.addCase(chargeAccount.fulfilled, (state, action) => {
            return {
                ...state,
                accountDto: action.payload,
            };
        });

        builder.addCase(chargeAccount.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });

        builder.addCase(exchangeAccount.fulfilled, (state, action) => {
            return {
                ...state,
                accountDto: action.payload,
            };
        });

        builder.addCase(exchangeAccount.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });

        builder.addCase(buyAuction.fulfilled, (state, action) => {
            return {
                ...state,
                accountDto: action.payload,
            };
        });

        builder.addCase(buyAuction.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });

        builder.addCase(sellAuction.fulfilled, (state, action) => {
            return {
                ...state,
                accountDto: action.payload,
            };
        });

        builder.addCase(sellAuction.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });

        builder.addCase(fetchMember.fulfilled, (state, action) => {
            return {
                ...state,
                memberIndex: action.payload.memberIndex,
                memberId: action.payload.memberId,
                nickname: action.payload.nickname,
                token: action.payload.token,
                profileImageDto: action.payload.profileImageDto,
                accountDto: action.payload.accountDto,
                isLogin: true,
            };
        });

        builder.addCase(fetchMember.rejected, (state) => {
            alert('에러가 발생했습니다.');
            return state;
        });
    },
});

export default memberSlice.reducer;
