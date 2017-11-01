import axios from 'axios';
import * as types from '../../constants/actionTypes';
import * as api from '../../constants/api';
import CustomAlert from '../_global/CustomAlert';

export function fetchReviewMainFirstSuccess(res) {
  return {
    type: types.FETCH_REVIEW_MAIN_FIRST_SUCCESS,
    reviews: res.data
  };
}

export function fetchReviewMainContinueSuccess(res) {
  return {
    type: types.FETCH_REVIEW_MAIN_CONTINUE_SUCCESS,
    reviews: res.data
  };
}

export function fetchReviewMainLastSuccess() {
  return {
    type: types.FETCH_REVIEW_MAIN_LAST_SUCCESS
  };
}

export function fetchReviewMainFailure(page) {
  return {
    type: types.FETCH_REVIEW_MAIN_FAILURE,
    page: page
  };
}

export function fetchReviewMain(order, gender, age, selectedTags, rating, page) {
  return function (dispatch) {
    return axios.get(`${api.BACKEND_URL}/reviews?order=${order}&gender=${gender}&age=${age}&tags=${selectedTags}&rating=${rating}&page=${page}`)
      .then(res => {
        if (page === 1) {
          dispatch(fetchReviewMainFirstSuccess(res))
        } else {
          if (res.data.length !== 0) {
            dispatch(fetchReviewMainContinueSuccess(res));
          } else {
            dispatch(fetchReviewMainLastSuccess());
          }
        }
      })
      .catch(() => {
        dispatch(fetchReviewMainFailure(page));
      });
  };
}

export function postReviewLikeSuccess(res) {
  return {
    type: types.POST_REVIEW_LIKE_SUCCESS,
    reviewId: res.data.review_id
  }
}

export function postReviewLikeDuplication() {
  return {
    type: types.POST_REVIEW_LIKE_DUPLICATION,
  }
}

export function postReviewLikeFailure() {
  return {
    type: types.POST_REVIEW_LIKE_FAILURE,
  }
}

export function postReviewLike(data) {
  return function (dispatch) {
    return axios.post(`${api.BACKEND_URL}/like`, data)
      .then(res => {
        dispatch(postReviewLikeSuccess(res));
      })
      .catch(error => {
        if (error.response.status === 409) {
          dispatch(postReviewLikeDuplication());
          CustomAlert('이미 좋아요 했습니다.');
        } else {
          dispatch(postReviewLikeFailure());
          CustomAlert('좋아요 실패');
        }
      });
  };
}

export function selectReviewFilter(selectedFilter) {
  if (selectedFilter.order.length !== 0 && selectedFilter.gender.length !== 0
    && selectedFilter.age.length !== 0 && selectedFilter.selectedTags.length !== 0) {
    return {
      type: types.SELECT_REVIEW_FILTER_SUCCESS,
      filters: selectedFilter
    };
  } else {
    return {
      type: types.SELECT_REVIEW_FILTER_FAILURE,
      filters: selectedFilter
    };
  }
}

export function readMore(reviewId) {
  return {
    type: types.READ_MORE_SUCCESS,
    reviewId: reviewId
  }
}


export function fetchTopWebtoonSuccess(res) {
  return {
    type: types.FETCH_TOP_WEBTOON_SUCCESS,
    topWebtoons: res.data
  };
}

export function fetchTopWebtoonFailure() {
  return {
    type: types.FETCH_TOP_WEBTOON_FAILURE
  };
}

export function fetchTopWebtoon(tags) {
  return function (dispatch) {
    return axios.get(`${api.BACKEND_URL}/webtoon/top?tags=${tags}`)
      .then(res => {
        dispatch(fetchTopWebtoonSuccess(res))
      })
      .catch(() => {
        dispatch(fetchTopWebtoonFailure());
      });
  };
}