import React, {PropTypes} from 'react';
import {StyleSheet, View, Platform, Text, TouchableOpacity} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';

import configureStore from './store/configureStore';
import Signup from './modules/signup/Signup';
import UserInfo from './modules/signup/UserInfo';
import SelectTags from './modules/signup/SelectTags';
import Reviews from './modules/reviews/Reviews';
import ReviewDetail from './modules/reviewDetail/ReviewDetail';
import ReviewFilter from './modules/reviews/ReviewFilter';
import WebtoonWebView from './modules/webtoonWebView/WebtoonWebView';
import Rankings from './modules/rankings/Rankings';
import WebtoonRankings from './modules/webtoonRankings/WebtoonRankings';
import WebtoonRankingsFilter from './modules/webtoonRankings/WebtoonRankingsFilter';
import Writes from './modules/writes/Writes';
import WritesSearchWebtoon from './modules/writes/WritesSearchWebtoon';
import Bookmarks from './modules/bookmarks/Bookmarks';
import Searches from './modules/searches/Searches';
import MyPages from './modules/myPages/MyPages';
import SelectBadge from './modules/myPages/SelectBadge';
import Settings from './modules/myPages/Settings';
import Notice from './modules/myPages/Notice';
import NoticeDetail from './modules/myPages/NoticeDetail';
import Help from './modules/myPages/Help';
import Contact from './modules/myPages/Contact';
import ServiceTerms from './modules/myPages/ServiceTerms';
import PersonalTerms from './modules/myPages/PersonalTerms';
import VersionInfo from './modules/myPages/VersionInfo';

const store = configureStore();
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 65 : 55;
const TABBAR_HEIGHT = Platform.OS === 'ios' ? 65 : 55;

const styles = StyleSheet.create({
  tabBar: {
    // borderTopWidth: 0.5,
    // borderColor: '#b7b7b7',
    backgroundColor: 'rgba(229, 229, 229, 0.2)',
    height: TABBAR_HEIGHT
  },
  tabIcon: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabText: {
    fontSize: 11,
    color: '#959da5',
    padding: 2
  },
  tabTextSelected: {
    fontSize: 11,
    color: '#f93854',
    padding: 2
  },
  navBar: {
    backgroundColor: '#1e2226',
    height: APPBAR_HEIGHT
  },
  navTitle: {
    color: '#fff',
  },
  rightButtonText: {
    color: '#fff',
  },
  routerScene: {
    backgroundColor: '#f8f8f8',
  },
});

const TabIcon = ({selected, iconName, title}) => {
  const tabColor = selected ? '#f93854' : '#959da5';
  if (iconName !== 'medal') {
    if (iconName === 'home') {
      title = '리뷰'
    }
    return (
      <View style={styles.tabIcon}>
        <Icon style={{color: tabColor}} name={iconName} size={20} />
        <Text style={selected ? styles.tabTextSelected : styles.tabText}>{title}</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.tabIcon}>
        <Icon2 style={{color: tabColor}} name={iconName} size={20} />
        <Text style={selected ? styles.tabTextSelected : styles.tabText}>{title}</Text>
      </View>
    )
  }
};

const SearchIcon = () => {
  return (
    <View style={styles.tabIcon}>
      <TouchableOpacity onPress={() => Actions.searches()}>
        <Icon style={{color: '#fff'}} name={'search'} size={20} />
      </TouchableOpacity>
    </View>
  )
};

const App = () => {
  return (
    <Provider store={store}>
      <Router
        sceneStyle={styles.routerScene}
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navTitle}
        leftButtonIconStyle={{tintColor:'#fff'}}
      >
        <Scene key="root">
          <Scene
            key='signup'
            component={Signup}
            type='replace'
            hideNavBar
            initial
          />
          <Scene
            key='userInfo'
            title='추가정보'
            component={UserInfo}
            type='replace'
          />
          <Scene
            key='selectTags'
            title='장르선택'
            component={SelectTags}
            type='replace'
          />
          <Scene
            key='searches'
            title='웹툰검색'
            component={Searches}
            type='push'
            lazy
          />
          <Scene
            key='writes'
            title='리뷰작성'
            component={Writes}
            type='push'
            lazy
          />
          <Scene
            key='writesSearchWebtoon'
            title='웹툰검색'
            component={WritesSearchWebtoon}
            type='push'
            lazy
          />
          <Scene
            key='reviewsDetail'
            title='웹툰상세'
            hideTabBar
            component={ReviewDetail}
            type='push'
            lazy
          />
          <Scene
            key='webtoonWebView'
            title='웹툰'
            component={WebtoonWebView}
            type='push'
            lazy
          />
          <Scene
            key='settings'
            title='설정'
            component={Settings}
            type='push'
            lazy
          />
          <Scene
            key='selectBadge'
            title='뱃지목록'
            component={SelectBadge}
            type='push'
            lazy
          />
          <Scene
            key='notice'
            title='공지사항'
            component={Notice}
            type='push'
            lazy
          />
          <Scene
            key='noticeDetail'
            title='공지상세'
            component={NoticeDetail}
            type='push'
            lazy
          />
          <Scene
            key='help'
            title='도움말'
            component={Help}
            type='push'
          />
          <Scene
            key='contact'
            title='문의'
            component={Contact}
            type='push'
          />
          <Scene
            key='serviceTerms'
            title='서비스 이용약관'
            component={ServiceTerms}
            type='push'
          />
          <Scene
            key='personalTerms'
            title='개인정보 취급방침'
            component={PersonalTerms}
            type='push'
          />
          <Scene
            key='versionInfo'
            title='버전정보'
            component={VersionInfo}
            type='push'
          />
          <Scene
            key='userPages'
            title='유저정보'
            component={MyPages}
            lazy
          />
          <Scene
            key='reviewsFilter'
            title='필터'
            hideNavBar
            component={ReviewFilter}
            direction="vertical"
            lazy
          />
          <Scene
            key='webtoonRankings'
            title='역대 웹툰랭킹'
            component={WebtoonRankings}
            type='push'
            lazy
          />
          <Scene
            key='webtoonRankingsFilter'
            title='필터'
            hideNavBar
            component={WebtoonRankingsFilter}
            direction="vertical"
            lazy
          />
          <Scene
            key='tabBar'
            tabs
            tabBarStyle={styles.tabBar}
            type='replace'
            default='Reviews'
          >

            <Scene
              key='reviews'
              title='재밌어이웹툰'
              icon={TabIcon}
              iconName={'home'}
            >
              <Scene
                key='reviewsMain'
                title='재밌어이웹툰'
                component={Reviews}
                renderRightButton={SearchIcon}
                initial
                lazy
              />
            </Scene>
            <Scene
              key='bookmarks'
              title='즐겨찾기'
              icon={TabIcon}
              iconName={'bookmark'}
              renderRightButton={SearchIcon}
              component={Bookmarks}
              lazy
            />
            <Scene
              key='rankings'
              title='랭킹'
              iconName={'medal'}
              icon={TabIcon}
              component={Rankings}
              renderRightButton={SearchIcon}
              lazy
            />
            <Scene
              key='myPages'
              title='내정보'
              icon={TabIcon}
              iconName={'user'}
              onRight={() => Actions.settings()}
              rightTitle='설정' // rightButtonImage
              rightButtonTextStyle={styles.rightButtonText}
              component={MyPages}
              lazy
            />
          </Scene>
        </Scene>
      </Router>
    </Provider>
  )
};

TabIcon.defaultProps = {
  selected: false
};

TabIcon.propTypes = {
  selected: PropTypes.bool.isRequired,
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default App