import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=18dad2aad6b54fe0b30257ff85026f00&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, loading: false });
  };
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: "6",
  };

  static propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pageSize: PropTypes.string.isRequired,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.updateNews();
    this.setState({ page: this.state.page - 1 });
  };
  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      this.updateNews();
      this.setState({ page: this.state.page + 1 });
    }
  };
  render() {
    return (
      <>
        <div className="container">
          <h1 className="text-center">News Monkey - Top Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="container">
            {/* <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.totalResults}
              loade r= {<Spinner />}
            > */}
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4 my-2" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 40) : " "}
                        desc={
                          element.description
                            ? element.description.slice(0, 80)
                            : " "
                        }
                        imageurl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://th.bing.com/th/id/OIP.9hetfdrodOfI9KzE_g_dDAAAAA?rs=1&pid=ImgDetMain"
                        }
                        newsurl={element.url ? element.url : " "}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
            {/* </InfiniteScroll> */}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr; Prev
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
        ;
      </>
    );
  }
}
