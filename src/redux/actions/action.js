import {
  news as actionType
} from './actionTypes';
import ExternalService from '../../services/externalServices';

export const fetchNews = (sourceID) => async (dispatch) => {
  await dispatch(appLoader(true));
  const news = await ExternalService.getNewsBySource(sourceID);
  dispatch({
    type: actionType.FETCH_NEWS_BY_SID,
    payload: news
  })

  await dispatch(appLoader(false));
}

export const fetchTopHeadlines = (sourceID) => async (dispatch) => {
  await dispatch(appLoader(true));
  const news = await ExternalService.getTopHeadlines(sourceID);

  dispatch({
    type: actionType.FETCH_TOP_HEADLINES,
    payload: news
  })

  await dispatch(appLoader(false));
}

export const fetchSources = () => async (dispatch) => {
  await dispatch(appLoader(true));
  const sources = await ExternalService.getNewsSources();

  dispatch({
    type: actionType.FETCH_SOURCES,
    payload: sources
  })

  await dispatch(appLoader(false));
}

export const fetchRelatedNews = () => async (dispatch, getState) => {
  await dispatch(appLoader(true));
  const news = await ExternalService.getRelatedNews(getState().news.selectedNews[0].content);

  dispatch({
    type: actionType.FETCH_RELATED_NEWS,
    payload: news
  })
  await dispatch(appLoader(false));
}

export const selectedSource = (sourceID, sourceName) => async (dispatch) => {
  dispatch({
    type: actionType.UPDATE_SELECTED_SOURCE,
    payload: {
      id: sourceID,
      name: sourceName
    }
  })

  await dispatch(fetchNews(sourceID));
  await dispatch(fetchTopHeadlines(sourceID));
} 

export const appLoader = (state) => async (dispatch) => {
  dispatch({
    type: actionType.APP_LOADING,
    payload: state
  });
}

export const fetchSelectedNews = (title) => async (dispatch, getState) => {
  // const news = await ExternalService.getNewsDetails(title);
  await dispatch(appLoader(false));
  let news = getState().news.news.filter((data) => {
    return data.title === title;
  })

  let news_from_headlines = getState().news.topHeadlines.filter((data) => {
    return data.title === title;
  })

  let related_news = getState().news.relatedNews.filter((data) => {
    return data.title === title;
  });

  dispatch({
    type: actionType.FETCH_SELECTED_NEWS,
    payload: news.length ? news : (news_from_headlines.length ? news_from_headlines : related_news)
  })
}