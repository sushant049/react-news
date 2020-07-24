import React, {Component} from 'react';
// antd imports
import { Row, Col, Typography } from 'antd';
import { StarOutlined, LikeOutlined } from '@ant-design/icons';
const { Text } = Typography;

class NewsStats extends Component {
  renderDate(date) {
    let DateArray = (new Date(date)).toString().split(' ');
    return `${DateArray[1]} ${DateArray[2]}, ${DateArray[3]},${DateArray[4]}` 
  }
  render() {
    let { newsSource, newsDate } = this.props;
    return (
        <Row gutter={12} className="news-footer">
          <Col lg={12}>
            <Typography>
              <Text>
                {newsSource.name}, <span className="text-light">{this.renderDate(newsDate)}</span>
              </Text>
            </Typography>
          </Col>
          <Col lg={12} className="news-stats">
            <span><StarOutlined /> 240</span>
            <span><LikeOutlined /> 20</span>
          </Col>
        </Row>
    );
  }
}

export default NewsStats;