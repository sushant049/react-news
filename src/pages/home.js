import React, {Component} from 'react';
import MainNewsList from '../containers/mainNewsList';
import TopHeadlines from '../containers/topHeadlines';
import { connect } from 'react-redux';
import { fetchNews, fetchTopHeadlines } from '../redux/actions/action';
import { Row, Col, Typography, Tag } from 'antd';
const { Text } = Typography;
  
class Home extends Component {
  componentDidMount() {
    const { loadNews, selectedSource:{id}, loadTopHeadlines } = this.props;
    loadNews(id);
    loadTopHeadlines(id);
  }

  render() {
    let { news, topHeadlines, selectedSource:{name} } = this.props;
    return (
      <div className="page-container">
        <Row>
          {/* main content */}
          <Col lg={16} className="main-content">
            <Typography className="breadcrumb-section">
              <Text className="text-medium tag-bar">
                <div>Latest updates from <span className="text-active">{name}</span></div>
                <div className="pull-right ">
                  <Tag color="processing">Business</Tag> 
                  <Tag color="processing">Economics</Tag>
                  <Tag color="processing">Health</Tag>
                  <Tag color="processing">Weather</Tag>
                  <Tag color="processing">Entertainment</Tag>
                  <Tag color="processing">Sports</Tag>
                </div>
              </Text>
            </Typography>
            <MainNewsList newsList={news}/>
          </Col>
          {/* side content */}
          <Col lg={8} className="side-bar">
            <Typography className="breadcrumb-section">
              <Text className="text-medium">
                Top Headlines
              </Text>
            </Typography>
            <div className="scrollable">
              <TopHeadlines newsList={topHeadlines}/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({news}) => ({
    news: news.news,
    topHeadlines: news.topHeadlines,
    selectedSource: {
      id: news.selectedSource.id,
      name: news.selectedSource.name
    }
});

const mapDispatchToProps = dispatch => ({
  loadNews: (source) => dispatch(fetchNews(source)),
  loadTopHeadlines: (source) => dispatch(fetchTopHeadlines(source))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);