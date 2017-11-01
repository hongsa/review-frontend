import { combineReducers } from 'redux';
import user from '../modules/signup/signup.reducer';
import reviews from '../modules/reviews/reviews.reducer';
import reviewDetail from '../modules/reviewDetail/reviewDetail.reducer';
import rankings from '../modules/rankings/rankings.reducer';
import webtoonRankings from '../modules/webtoonRankings/webtoonRankings.reducer'
import writes from '../modules/writes/writes.reducer';
import bookmarks from '../modules/bookmarks/bookmarks.reducer'
import searches from '../modules/searches/searches.reducer';
import myPages from '../modules/myPages/myPages.reducer'


const rootReducer = combineReducers({
	user,
  reviews,
  reviewDetail,
	rankings,
  webtoonRankings,
	writes,
	bookmarks,
	searches,
  myPages,
});

export default rootReducer;
