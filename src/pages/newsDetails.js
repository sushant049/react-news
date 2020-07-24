import React, {Component} from 'react';
import NewsDetailContainer from '../containers/newsDetailsContainer';
import RelatedNews from '../containers/similarNews';
import { fetchSelectedNews, fetchRelatedNews } from '../redux/actions/action';
import { connect } from 'react-redux';

import { Row, Col, Typography } from 'antd';
const { Text  } = Typography;
  
class NewsDetails extends Component {

  getCurrentURL = () => {
    let newsTitle = decodeURIComponent(window.location.pathname).replace("/news-details/","");
    return newsTitle;
  }

  componentDidMount(){
    console.log(this.props);
    const { loadSelectedNews, loadRelatedNews } = this.props;
    loadSelectedNews(this.getCurrentURL());
    loadRelatedNews();
  }

  render() {
    let { selectedNews, relatedNews } = this.props;
    return (
      <div className="page-container">
        <Row>
          {/* main content */}
          <Col lg={16} className="main-content">
            <NewsDetailContainer newsData={selectedNews[0]}/>
          </Col>
          {/* side content */}
          <Col lg={8} className="side-bar">
            <Typography className="breadcrumb-section">
              <Text className="text-medium">
                Realted News
              </Text>
            </Typography>
            <div className="scrollable">
              <RelatedNews newsList={relatedNews}/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({news}) => ({
    selectedSource: news.selectedSource,
    selectedNews: news.selectedNews,
    relatedNews: news.relatedNews
});

const mapDispatchToProps = dispatch => ({
  loadSelectedNews: (title) => dispatch(fetchSelectedNews(title)),
  loadRelatedNews: () => dispatch(fetchRelatedNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetails);