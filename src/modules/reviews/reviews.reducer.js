import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.reviews, action) {
  switch (action.type) {
    case types.FETCH_REVIEW_MAIN_FIRST_SUCCESS:
      return {
        reviews: action.reviews,
        filters: state.filters,
        topWebtoons: state.topWebtoons
      };
    case types.FETCH_REVIEW_MAIN_CONTINUE_SUCCESS:
      return {
        reviews: state.reviews.concat(action.reviews),
        filters: state.filters,
        topWebtoons: state.topWebtoons
      };
    case types.FETCH_REVIEW_MAIN_LAST_SUCCESS:
      return {
        reviews: state.reviews,
        filters: state.filters,
        topWebtoons: state.topWebtoons,
        reviewLast: true
      };
    case types.FETCH_REVIEW_MAIN_FAILURE:
      return {
        reviews: state.reviews,
        filters: state.filters,
        page: action.page,
        topWebtoons: state.topWebtoons,
        fetchDataError: true,
      };

    case types.POST_REVIEW_LIKE_SUCCESS:
      return {
        filters: state.filters,
        reviews: state.reviews.map(review => review.id === action.reviewId ?
          // transform the one with a matching id
          {...review, like_count: review.like_count + 1} :
          review
        ),
        topWebtoons: state.topWebtoons
      };
    case types.POST_REVIEW_LIKE_FAILURE:
      return {
        reviews: state.reviews,
        filters: state.filters,
        topWebtoons: state.topWebtoons
      };
    case types.POST_REVIEW_LIKE_DUPLICATION:
      return {
        reviews: state.reviews,
        filters: state.filters,
        topWebtoons: state.topWebtoons
      };

    case types.SELECT_REVIEW_FILTER_SUCCESS:
      return {
        reviews: state.reviews,
        filters: action.filters,
        topWebtoons: state.topWebtoons,
        filterSelect: true
      };
    case types.SELECT_REVIEW_FILTER_FAILURE:
      return {
        reviews: state.reviews,
        filters: state.filters,
        topWebtoons: state.topWebtoons,
        filterError: true
      };
    case types.READ_MORE_SUCCESS:
      return {
        filters: state.filters,
        reviews: state.reviews.map(review => review.id === action.reviewId ?
          // transform the one with a matching id
          {...review, read_more_btn: false} :
          review
        ),
        topWebtoons: state.topWebtoons
      };

    case types.FETCH_FILTER_TAG_SUCCESS:
      return {
        reviews: state.reviews,
        filters: {
          ...state.filters,
          tags: action.tags
        },
        topWebtoons: state.topWebtoons
      };
    case types.FETCH_FILTER_TAG_FAILURE:
      return {
        reviews: state.reviews,
        filters: {
          ...state.filters,
        },
        topWebtoons: state.topWebtoons,
        fetchTagError: true
      };

    case types.FETCH_TOP_WEBTOON_SUCCESS:
      return {
        reviews: state.reviews,
        filters: state.filters,
        topWebtoons: action.topWebtoons
      };
    case types.FETCH_TOP_WEBTOON_FAILURE:
      return {
        reviews: state.reviews,
        filters: state.filters,
        topWebtoons: state.topWebtoons
      };
    default:
      return state;
  }
}