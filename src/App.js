import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  // state = {
  //   progress: 10,
  // };
  const [progress, setProgress] = useState(10);
  // setProgress = (progress) => {
  //   setState({ progress: progress });
  // };

  return (
    <>
      <Router>
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Navbar />
        <div className="container my-3">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="/"
                  pageSize="9"
                  country="in"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="business"
                  pageSize="9"
                  country="in"
                  category="business"
                />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="entertainment"
                  pageSize="9"
                  country="in"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              exact
              path="/general"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="general"
                  pageSize="9"
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="health"
                  pageSize="9"
                  country="in"
                  category="health"
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="science"
                  pageSize="9"
                  country="in"
                  category="science"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="sports"
                  pageSize="9"
                  country="in"
                  category="sports"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="technology"
                  pageSize="9"
                  country="in"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
