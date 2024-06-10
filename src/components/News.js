import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // const [state, setState] = useState({
  //   articles: [],
  //   loading: true,
  //   page: 1,
  //   totalResults: 0,
  // });
  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // setState({ loading: true });
    // props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    // setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
    // setState({ page: .page + 1 });
  };

  useEffect(() => {
    updateNews();
  }, []);

  // const handlePrevClick = async () => {
  //   updateNews();
  //   setState({ page: page - 1 });
  // };
  // const handleNextClick = async () => {
  //   if (
  //     page + 1 >
  //     Math.ceil(totalResults / props.pageSize)
  //   ) {
  //   } else {
  //     updateNews();
  //     setState({ page: page + 1 });
  //   }
  // };

  const fetchMoreData = async () => {
    // setState({ page: page + 1 });

    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    // setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <div className="text-center m-4">
        <h1 style={{ marginTop: "90px" }}>
          {props.category.toUpperCase()} - Top Headlines
        </h1>
      </div>
      {loading && <Spinner />}
      <div className="container">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
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
          </div>
        </InfiniteScroll>
      </div>
      {/* <div className="container d-flex justify-content-between">
            <button
              disabled={.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={handlePrevClick}
            >
              &larr; Prev
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleNextClick}
              disabled={
                .page + 1 >
                Math.ceil(.totalResults / props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div> */}
      ;
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: "6",
};

News.propTypes = {
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  pageSize: PropTypes.string.isRequired,
};

export default News;
