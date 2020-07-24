import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchSources, selectedSource } from '../redux/actions/action';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

class AppHeader extends Component {
  reloadAllNews = (sourceID, sourceName) => {
    let { updateSelectedSource } = this.props;
    updateSelectedSource(sourceID, sourceName); 
  }
  
  componentDidMount = () => {
    let { loadSources } = this.props;
    loadSources();
  }

  render() {
    let { allSources } = this.props;
    return (
      <Layout className="header-layout">
        <Header className="app-header">
          <Menu mode="horizontal" defaultSelectedKeys={['-1']}>
            <Menu.Item key="-1" onClick={()=>this.reloadAllNews('all', 'All News')}>All News</Menu.Item>
            {
              allSources.length ? allSources.map((data, index) => (
                <Menu.Item key={index} onClick={()=>this.reloadAllNews(data.id, data.name)}>{data.name}</Menu.Item>
              )):null
            }
          </Menu>
        </Header>
      </Layout>
    )
  }
}

const mapStateToProps = ({news}) => ({
  allSources: news.allSources
});

const mapDispatchToProps = dispatch => ({
  loadSources: () => dispatch(fetchSources()),
  updateSelectedSource: (sourceID, sourceName) => dispatch(selectedSource(sourceID, sourceName)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);