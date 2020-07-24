import React, {Component} from 'react';
import NewsStats from '../components/newsStats';
import { Row, Col, Typography, Breadcrumb } from 'antd';
// import Paragraph from 'antd/lib/skeleton/Paragraph';
const { Title, Paragraph } = Typography;

class NewsDetailContainer extends Component {
  render() {
    let { newsData } = this.props;
    return (
      <>
        {
          newsData?(
            <Row>
              <Col lg={24} className="breadcrumb-section">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item>{newsData.title.substring(0,50)}...</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col lg={24} className="news-lg-image-container">
                <img src={newsData.urlToImage} alt={newsData.urlToImage}/>
              </Col>
              <Col lg={24}>
                <Typography>
                    <Title level={4} className="title-text">
                      {newsData.title}
                    </Title>
                </Typography>
                <NewsStats newsSource={newsData.source} newsDate={newsData.publishedAt}/>
              </Col>
              <Col lg={24}>
                <Typography>
                    <Paragraph>
                      {newsData.content}
                    </Paragraph>
                </Typography>
              </Col>
            </Row>
          ):(
            <Row>
              <Col lg={24} className="news-lg-image-container">
                <p>
                  There were some issues while fetching data
                </p>
              </Col>
            </Row>
          )
        }
        
      </>
    )
  }
}

export default NewsDetailContainer;