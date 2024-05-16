import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, desc, imageurl, newsurl, author, date, source } = this.props;
    return (
      <>
        <div className="container">
          <div className="card">
            <img
              src={imageurl}
              className="card-img-top"
              alt="..."
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <span
                className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
                style={{ left: "80%", zIndex: 1 }}
              >
                {source}
                <span className="visually-hidden">News Source</span>
              </span>
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{desc}.....</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {author} - <strong>{new Date(date).toGMTString()}</strong>
                </small>
              </p>
              <a href={newsurl} className="btn btn-sm btn-primary">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
