import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followersMap: {},     // 팔로워 여부 { followerId : true}
  followingsMap: {},    // ✅ 여기 주석은 "팔로잉 여부"가 맞습니다. 현재는 "팔로워 여부"라고 잘못 표기됨
  followersList: [],    // 화면 렌더링용 배열
  followingsList: [],   // 화면 렌더링용 배열
  loading: false,
  error: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    // --- 팔로우 요청 ---
    followRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    followSuccess: (state, action) => {
      state.loading = false;
      const { followeeId/*, blocked */} = action.payload;
      const id = String(followeeId);

      state.followingsMap = {
        ...state.followingsMap,
        [id]: true,
      };

      // ✅ followingsList에 이미 존재하는지 검사 → 중복 방지
      // ❗ blocked 값은 payload에 있지만 현재 주석 처리되어 있어 반영되지 않음
      if (!state.followingsList.find(f => String(f.followeeId) === id)) {
        state.followingsList = [
          ...state.followingsList,
          { followeeId: id/*, blocked: blocked ?? false */ },
        ];
      }
    },
    followFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- 언팔로우 요청 ---
    unfollowRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    unfollowSuccess: (state, action) => {
      state.loading = false;
      const followeeId = String(action.payload); 
      // ❗ payload 구조가 단순 ID인지 확인 필요. 객체 { followeeId }로 오는 경우라면 수정 필요

      const newMap = { ...state.followingsMap };
      delete newMap[followeeId];
      state.followingsMap = newMap;

      state.followingsList = state.followingsList.filter(
        f => String(f.followeeId) !== followeeId
      );
    },
    unfollowFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    toggleFollowRequest: (state) => {
      state.error = null;
      // ❗ loading 상태를 변경하지 않음 → 요청 중임을 표시하지 못할 수 있음
    },

    // --- 팔로워 목록 로드 ---
    loadFollowersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadFollowersSuccess: (state, action) => {
      state.loading = false;
      const followersObj = {};
      action.payload.forEach(f => {
        followersObj[String(f.followerId)] = true;
      });
      state.followersMap = followersObj;
      state.followersList = action.payload.map(f => ({
        ...f,
        followerId: String(f.followerId),
        blocked: f.blocked ?? false,
      }));
      // ✅ followersMap과 followersList를 동시에 갱신
    },
    loadFollowersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- 팔로잉 목록 로드 ---
    loadFollowingsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadFollowingsSuccess: (state, action) => {
      state.loading = false;
      const followingsObj = {};
      action.payload.forEach(f => {
        const id = String(f.followeeId ?? f.userId);
        followingsObj[id] = true;
        // ❗ API 응답 구조가 followeeId인지 userId인지 혼용 → 일관성 필요
      });
      state.followingsMap = followingsObj;
      state.followingsList = action.payload.map(f => ({
        ...f,
        followeeId: String(f.followeeId ?? f.userId),
        blocked: f.blocked ?? false,
      }));
    },
    loadFollowingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  followRequest, followSuccess, followFailure,
  unfollowRequest, unfollowSuccess, unfollowFailure,
  loadFollowersRequest, loadFollowersSuccess, loadFollowersFailure,
  loadFollowingsRequest, loadFollowingsSuccess, loadFollowingsFailure, 
  toggleFollowRequest,
} = followSlice.actions;

export default followSlice.reducer;