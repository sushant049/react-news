import React, {Component} from 'react';
import NewsStats from './newsStats';
import { withRouter } from 'react-router-dom';
// antd imports
import { Card, Row, Col, Typography } from 'antd';
const { Title, Paragraph } = Typography;

class NewsCard extends Component {
  pageRedirection(path) {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    let { newsData } = this.props;
    return (
      <>
        <Card className="news-card" onClick={()=>this.pageRedirection(`/news-details/${encodeURI(newsData.title)}`)}>
          <Row gutter={12} className="news-content">
            <Col lg={6} className="news-image">
              <img src={newsData.urlToImage} alt={newsData.urlToImage}/>
            </Col>
            <Col lg={18} className="news-text">
              <Typography>
                <Title level={4} className="title-text">
                  {newsData.title}
                </Title>
                <Paragraph className="paragraph-text">
                  {newsData.description.substring(0,99)}
                </Paragraph>
              </Typography>
            </Col>
          </Row>
          <NewsStats newsSource={newsData.source} newsDate={newsData.publishedAt}/>
        </Card>
      </>
    )
  }
}

export default withRouter(NewsCard);