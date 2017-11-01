import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.webtoonRankings, action) {
  switch (action.type) {
    case types.FETCH_WEBTOON_RANKING_FIRST_SUCCESS:
      return {
        rankings: action.rankings,
        filters: {
          tags: []
        }
      };
    case types.FETCH_WEBTOON_RANKING_CONTINUE_SUCCESS:
      return {
        rankings: state.rankings.concat(action.rankings),
        filters: state.filters
      };
    case types.FETCH_WEBTOON_RANKING_LAST_SUCCESS:
      return {
        rankings: state.rankings,
        filters: state.filters,
        rankingsLast: true
      };
    case types.FETCH_WEBTOON_RANKING_FAILURE:
      return {
        rankings: state.rankings,
        filters: state.filters,
        page: action.page,
        fetchDataError: true,
      };
    case types.FETCH_FILTER_TAG_SUCCESS:
      return {
        rankings: state.rankings,
        filters: {
          ...state.filters,
          tags: action.tags
        }
      };
    case types.FETCH_FILTER_TAG_FAILURE:
      return {
        rankings: state.rankings,
        filters: {
          ...state.filters,
        },
        fetchTagError: true,
      };
    case types.SELECT_WEBTOON_RANKING_FILTER_SUCCESS:
      return {
        rankings: state.rankings,
        filters: action.filters,
        filterSelect: true
      };
    case types.SELECT_WEBTOON_RANKING_FILTER_FAILURE:
      return {
        rankings: state.rankings,
        filters: state.filters,
        filterError: true
      };
    default:
      return state;
  }
}
