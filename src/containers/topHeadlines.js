import React, {Component} from 'react';
import NewsPreviewCard from '../components/newsPreviewCard';

class TopHeadlines extends Component {
  render() {
    let { newsList } = this.props;
    return (
      <>
       {
        newsList.length? newsList.slice(0,10).map((data, index)=>(
          <NewsPreviewCard newsData={data} key={index} />
        )):(
          <p>
             Issue while getting response. Refresh page.
          </p>
        )
        }
      </>
    )
  }
}

export default TopHeadlines;