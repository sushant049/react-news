import React, {Component} from 'react';
import NewsCard from '../components/newsCard';
import InfiniteScroll from "react-infinite-scroll-component";
var shortid = require('shortid');

class MainNewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentIndex : 0,
      offset: 10,
    }
  }

  fetchMoreData = () => {
    let { newsList } = this.props;

    let { currentIndex, offset } = this.state;
    let finalOffset = currentIndex + offset;

    for(let i=currentIndex; i<finalOffset; i++) {
      this.setState(prevState => ({
        data: prevState.data.concat([newsList[i]]),
        currentIndex : i+1
      }));
    }

    console.log(this.state.currentIndex);
  }

  componentDidMount() {
    this.fetchMoreData();
  }

  render() {
    let { data, currentIndex } = this.state;
    return (
      <>
      <InfiniteScroll
      dataLength={this.props.newsList.length}
      next={this.fetchMoreData}
      hasMore={currentIndex < this.props.newsList.length ? true:false}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b>That's all for now</b>
        </p>
      }
      >
      {
        data.length? data.map((d, index)=>(
          <NewsCard newsData={d} key={shortid.generate()}/>
        )):(
          <>
          <h4>That's all for now</h4>
          </>
        )
      }
      </InfiniteScroll>
      {/* {
        newsList.length? newsList.map((d, index)=>(
          <NewsCard newsData={d} key={shortid.generate()}/>
        )):(
          <>
          <h4>That's all for now</h4>
          </>
        )
      } */}
      </>
    )
  }
}

export default MainNewsList;