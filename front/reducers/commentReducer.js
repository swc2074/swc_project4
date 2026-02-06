import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: {},  
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: { 
    fetchCommentsRequest: (state) => { state.loading = true; },
    fetchCommentsSuccess: (state, action) => {
      state.loading = false;
      const { postId, comments } = action.payload;  // 기존 댓글에 추가 댓글
      state.comments[postId] = comments;
    },
    fetchCommentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
 
    
    createCommentRequest: (state) => { state.loading = true; },
    createCommentSuccess: (state, action) => {
      state.loading = false;
      const { postId, comment } = action.payload;  
      state.comments[postId] = [...(state.comments[postId] || []), comment];
    },
    createCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //댓글 수정
    updateCommentRequest: (state) => { state.loading = true; },
    updateCommentSuccess: (state, action) => {
      state.loading = false;
      const { postId, comment } = action.payload; 
      state.comments[postId] = state.comments[postId].map(c =>
        c.id === comment.id ? comment : c
      );
    },
    updateCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
 
    deleteCommentRequest: (state) => { state.loading = true; },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      const { postId, commentId } = action.payload;  
      state.comments[postId] = state.comments[postId].filter(c => c.id !== commentId);
    },
    deleteCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure,
  createCommentRequest, createCommentSuccess, createCommentFailure,
  updateCommentRequest, updateCommentSuccess, updateCommentFailure,
  deleteCommentRequest, deleteCommentSuccess, deleteCommentFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
