import { news as actionType } from '../actions/actionTypes';

const InitialState = {
  allSources: [],
  selectedSource: {
    id: 'all',
    name: 'All News'
  },
  news: [],
  selectedNews : {},
  topHeadlines: [],
  relatedNews: [],
  isLoading: true
}

export default (state = InitialState, {type, payload}) => {

  // fetch news
  switch (type) {
    case actionType.FETCH_NEWS_BY_SID: {
      return {
        ...state,
        news: payload
      }
    }

    case actionType.FETCH_TOP_HEADLINES:
      return {
        ...state,
        topHeadlines: payload
      }

    case actionType.FETCH_RELATED_NEWS:
      return {
        ...state,
        relatedNews: payload
      }

    case actionType.FETCH_SELECTED_NEWS:{
      return {
        ...state,
        selectedNews: payload
      }
    }

    case actionType.FETCH_SOURCES : {
      return {
        ...state,
        allSources: payload
      }
    }

    case actionType.UPDATE_SELECTED_SOURCE : {
      return {
        ...state,
        selectedSource: {
          id: payload.id,
          name: payload.name
        }
      }
    }

    case actionType.APP_LOADING : {
      return {
        ...state,
        loading: payload
      }
    }

    default:
      return state;
  }

}