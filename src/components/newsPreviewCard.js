import React, {Component} from 'react';
import NewsStats from './newsStats';
// antd imports
import { Card, Row, Col, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
const { Text } = Typography;

class NewsPreviewCard extends Component {

  pageRedirection(path) {
    const { history } = this.props;
    history.push(path);
    window.location.reload();
  }

  
  render() {
    let { newsData } = this.props;
    return (
      <>
        <Card className="news-card" onClick={()=>this.pageRedirection(`/news-details/${encodeURI(newsData.title)}`)}>
          <Row gutter={12} className="news-content">
            <Col lg={5} className="news-image">
              <img src={newsData.urlToImage} alt={newsData.urlToImage}/>
            </Col>
            <Col lg={19} className="news-text">
              <Typography>
                <Text className="paragraph-text text-medium">
                  {newsData.title}
                </Text>
              </Typography>
            </Col>
          </Row>
          <NewsStats newsSource={newsData.source} newsDate={newsData.publishedAt}/>
        </Card>
      </>
    )
  }
}

export default withRouter(NewsPreviewCard);