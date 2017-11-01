import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.reviewDetail, action) {
  switch (action.type) {
    case types.FETCH_WEBTOON_INFO_SUCCESS:
      return {
        webtoonInfo: action.webtoonInfo,
        reviews: []
      };
    case types.FETCH_WEBTOON_INFO_FAILURE:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: state.reviews
      };

    case types.FETCH_REVIEW_DETAIL_FIRST_SUCCESS:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: action.reviews
      };
    case types.FETCH_REVIEW_DETAIL_CONTINUE_SUCCESS:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: state.reviews.concat(action.reviews)
      };
    case types.FETCH_REVIEW_DETAIL_LAST_SUCCESS:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: state.reviews,
        reviewLast: true
      };
    case types.FETCH_REVIEW_DETAIL_FAILURE:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: state.reviews,
        page: action.page,
        fetchDataError: true,
      };

    case types.POST_BOOKMARK_SAVE_SUCCESS:
      return {
        webtoonInfo: {
          ...state.webtoonInfo,
          already_bookmark_created: true,
        },
        reviews: state.reviews,
        bookmarkMsg: '즐겨찾기 등록!'
      };
    case types.POST_BOOKMARK_DELETE_SUCCESS:
      return {
        webtoonInfo: {
          ...state.webtoonInfo,
          already_bookmark_created: false,
        },
        reviews: state.reviews,
        bookmarkMsg: '즐겨찾기 삭제!'
      };
    case types.POST_BOOKMARK_FAILURE:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: state.reviews,
        bookmarkErrorMsg: '즐겨찾기 등록 실패!'
      };

    case types.POST_REVIEW_LIKE_SUCCESS:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: state.reviews.map(review => review.id === action.reviewId ?
          // transform the one with a matching id
          {...review, like_count: review.like_count + 1} :
          review
        ),
      };
    case types.POST_REVIEW_LIKE_FAILURE:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: state.reviews,
      };
    case types.POST_REVIEW_LIKE_DUPLICATION:
      return {
        webtoonInfo: state.webtoonInfo,
        reviews: state.reviews,
      };

    default:
      return state;
  }
}
