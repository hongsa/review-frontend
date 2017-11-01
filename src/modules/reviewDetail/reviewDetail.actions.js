import axios from 'axios';
import * as types from '../../constants/actionTypes';
import * as api from '../../constants/api';

export function fetchWebtoonInfoSuccess(res) {
  return {
    type: types.FETCH_WEBTOON_INFO_SUCCESS,
    webtoonInfo: res.data
  };
}

export function fetchWebtoonInfoFailure() {
  return {
    type: types.FETCH_WEBTOON_INFO_FAILURE
  };
}

export function fetchWebtoonInfo(webtoonId, userId) {
  return function (dispatch) {
    return axios.get(`${api.BACKEND_URL}/webtoon/${webtoonId}?userId=${userId}`)
      .then(res => {
        dispatch(fetchWebtoonInfoSuccess(res));
      })
      .catch(() => {
        dispatch(fetchWebtoonInfoFailure());
      });
  };
}

export function fetchReviewDetailFirstSuccess(res) {
  return {
    type: types.FETCH_REVIEW_DETAIL_FIRST_SUCCESS,
    reviews: res.data
  };
}

export function fetchReviewDetailContinueSuccess(res) {
  return {
    type: types.FETCH_REVIEW_DETAIL_CONTINUE_SUCCESS,
    reviews: res.data
  };
}

export function fetchReviewDetailLastSuccess() {
  return {
    type: types.FETCH_REVIEW_DETAIL_LAST_SUCCESS
  };
}

export function fetchReviewDetailFailure(page) {
  return {
    type: types.FETCH_REVIEW_DETAIL_FAILURE,
    page: page
  };
}

export function fetchReviewDetail(webtoonId, order, page) {
  return function (dispatch) {
    return axios.get(`${api.BACKEND_URL}/webtoon/${webtoonId}/reviews?order=${order}&page=${page}`)
      .then(res => {
        if (page === 1) {
          dispatch(fetchReviewDetailFirstSuccess(res))
        } else {
          if (res.data.length !== 0) {
            dispatch(fetchReviewDetailContinueSuccess(res));
          } else {
            dispatch(fetchReviewDetailLastSuccess());
          }
        }
      })
      .catch(() => {
        dispatch(fetchReviewDetailFailure(page));
      });
  };
}

export function postBookmarkSaveSuccess() {
  return {
    type: types.POST_BOOKMARK_SAVE_SUCCESS,
  };
}

export function postBookmarkDeleteSuccess() {
  return {
    type: types.POST_BOOKMARK_DELETE_SUCCESS,
  };
}

export function postBookmarkFailure() {
  return {
    type: types.POST_BOOKMARK_FAILURE
  };
}

export function postBookmark(data) {
  return function (dispatch) {
    return axios.post(`${api.BACKEND_URL}/bookmarks`, data)
      .then(res => {
        if (res.data.type === 'save') {
          dispatch(postBookmarkSaveSuccess());
        } else {
          dispatch(postBookmarkDeleteSuccess());
        }
      })
      .catch(() => {
        dispatch(postBookmarkFailure());
      });
  };
}