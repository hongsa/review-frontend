import axios from 'axios';
import * as types from '../../constants/actionTypes';
import * as api from '../../constants/api';

export function fetchWebtoonRankingFirstSuccess(res) {
  return {
    type: types.FETCH_WEBTOON_RANKING_FIRST_SUCCESS,
    rankings: res.data
  };
}

export function fetchWebtoonRankingContinueSuccess(res) {
  return {
    type: types.FETCH_WEBTOON_RANKING_CONTINUE_SUCCESS,
    rankings: res.data
  };
}

export function fetchWebtoonRankingLastSuccess() {
  return {
    type: types.FETCH_WEBTOON_RANKING_LAST_SUCCESS
  };
}

export function fetchWebtoonRankingFailure(page) {
  return {
    type: types.FETCH_WEBTOON_RANKING_FAILURE,
    page: page
  };
}

export function fetchWebtoonRanking(platform, tags, page) {
  return function (dispatch) {
    return axios.get(`${api.BACKEND_URL}/webtoon/rankings?platform=${platform}&tags=${tags}&page=${page}`)
      .then(res => {
        if (page === 1) {
          dispatch(fetchWebtoonRankingFirstSuccess(res))
        } else {
          if (res.data.length !== 0) {
            dispatch(fetchWebtoonRankingContinueSuccess(res));
          } else {
            dispatch(fetchWebtoonRankingLastSuccess());
          }
        }
      })
      .catch(() => {
        dispatch(fetchWebtoonRankingFailure(page));
      });
  };
}

export function selectWebtoonRankingFilter(selectedFilter) {
  if (selectedFilter.selectedPlatform.length !== 0 && selectedFilter.selectedTags.length !== 0) {
    return {
      type: types.SELECT_WEBTOON_RANKING_FILTER_SUCCESS,
      filters: selectedFilter
    };
  } else {
    return {
      type: types.SELECT_WEBTOON_RANKING_FILTER_FAILURE,
      filters: selectedFilter
    };
  }
}