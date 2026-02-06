import reducer, {
  addRetweetRequest, addRetweetSuccess, addRetweetFailure,
  removeRetweetRequest, removeRetweetSuccess, removeRetweetFailure,
  hasRetweetedRequest, hasRetweetedSuccess, hasRetweetedFailure,
  fetchMyRetweetsRequest, fetchMyRetweetsSuccess, fetchMyRetweetsFailure,
} from '../retweetReducer';

describe('retweetReducer', () => {
  const initialState = { retweets: {}, retweetsCount: {}, loading: false, error: null };

  // 리트윗 추가
  it('addRetweetSuccess', () => {
    const state = reducer(initialState, addRetweetSuccess({ postId: 1, retweetCount: 5 }));
    expect(state.retweets[1]).toBe(true);
    expect(state.retweetsCount[1]).toBe(5);
    expect(state.loading).toBe(false);
  });

  it('addRetweetFailure', () => {
    const state = reducer(initialState, addRetweetFailure('fail'));
    expect(state.error).toBe('fail');
  });

  // 특정 게시글 리트윗 여부 확인
  it('hasRetweetedSuccess', () => {
    const state = reducer(initialState, hasRetweetedSuccess({ postId: 1, hasRetweeted: true }));
    expect(state.retweets[1]).toBe(true);
    expect(state.loading).toBe(false);
  });

  // 내가 리트윗한 글 목록 가져오기
  it('fetchMyRetweetsSuccess', () => {
    const state = reducer(initialState, fetchMyRetweetsSuccess({ 1: true, 2: true }));
    expect(state.retweets[1]).toBe(true);
    expect(state.retweets[2]).toBe(true);
    expect(state.loading).toBe(false);
  });

  // ✅ 리트윗 취소
  it('removeRetweetSuccess', () => {
    const prevState = {
      ...initialState,
      retweets: { 1: true },
      retweetsCount: { 1: 5 },
    };
    const state = reducer(prevState, removeRetweetSuccess({ postId: 1, retweetCount: 4 }));
    expect(state.retweets[1]).toBe(false);       // 리트윗 취소됨
    expect(state.retweetsCount[1]).toBe(4);     // count 갱신됨
    expect(state.loading).toBe(false);
  });

  it('removeRetweetFailure', () => {
    const state = reducer(initialState, removeRetweetFailure('fail'));
    expect(state.error).toBe('fail');
  });
});