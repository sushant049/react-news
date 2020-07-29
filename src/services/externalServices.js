class _ExternalService {
  constructor() {
    this.apiDomain = (process.env.REACT_APP_API_BASE || '');
    this.apiKey = (process.env.REACT_APP_API_KEY || '');
  }

  // const apiDomain = 'http://newsapi.org/v2/';

  async getNewsSources() {
    const {
      sources
    } = await this._dataRequest(`sources?language=en&apiKey=${this.apiKey}`, {
      method: 'GET'
    });

    return sources.map((data)=>{
      return {
        id: data.id,
        name: data.name,
        country: data.country
      }
    });
  }

  async getNewsBySource(sourceID) {
    let news = null;

    if (sourceID !== "all") {
      const {
        articles
      } = await this._dataRequest(`everything?sources=${sourceID}&sortBy=publishedAt&apiKey=${this.apiKey}`, {
        method: 'GET'
      });

      news = articles;
    } else {
      const {
        articles
      } = await this._dataRequest(`everything?q=india&sortBy=publishedAt&apiKey=${this.apiKey}`, {
        method: 'GET'
      });

      news = articles;
    }

    return news;
  }

  async getTopHeadlines(sourceID) {
    let headlines = null;

    if (sourceID !== "all") {
      const {
        articles
      } = await this._dataRequest(`top-headlines?sortBy=popularity&sources=${sourceID}&apiKey=${this.apiKey}`, {
        method: 'GET'
      });

      headlines = articles;
    } else {
      const {
        articles
      } = await this._dataRequest(`top-headlines?country=in&sortBy=popularity&apiKey=${this.apiKey}`, {
        method: 'GET'
      });

      headlines = articles;
    }

    return headlines;

  }

  async getRelatedNews(description) {
    let {keywords} = await this.fetchKeywords(description);
    // console.log(keywords);
    const {
      articles
    } = await this._dataRequest(`everything?q=${keywords[0]}&sortBy=publishedAt&language=en&apiKey=${this.apiKey}`, {
      method: 'GET'
    });

    return articles;
  }

  async getNewsDetails(title) {
    const {
      articles
    } = await this._dataRequest(`everything?qInTitle=${title}&apiKey=${this.apiKey}`, {
      method: 'GET'
    });

    return articles;
  }

  async fetchKeywords(description) {

    let details = {
      "text": `${description}`,
      "wordnum": "5"
    }
    
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    let result = await fetch("https://textanalysis-keyword-extraction-v1.p.rapidapi.com/keyword-extractor-text", {
        "method": "POST",
        "headers": {
          "x-rapidapi-host": "textanalysis-keyword-extraction-v1.p.rapidapi.com",
          "x-rapidapi-key": "f0653ad88dmsh232340d1a7fd82ap1c942bjsn4eb9b756d1dc",
          "content-type": "application/x-www-form-urlencoded"
        },
        "body": formBody
      });

      try {
        this._checkStatus(result);
        return result.json();
      } catch (err) {
        return await this._handleError(err);
      }
      
  }

  async _dataRequest(path, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    }

    if (typeof options.body === 'object') options.body = JSON.stringify(options.body);
    // ${this.apiDomain}
    const result = await fetch(`https://cors-anywhere.herokuapp.com/${this.apiDomain}${path}`, {
      headers,
      ...options
    });

    try {
      this._checkStatus(result);
      return result.json();
    } catch (err) {
      return await this._handleError(err);
    }
  }

  async _handleError(err) {
    // Extracts and returns a rejected promise, with the error message (if any)
    if (!!err.response) {
      const {
        response
      } = err;
      const json = await response.json();

      if (json) return Promise.reject(json.message);
      else return Promise.reject(response.statusText);
    }

    return Promise.reject(err);
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}

const ExternalService = new _ExternalService();
export default ExternalService;