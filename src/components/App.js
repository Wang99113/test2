import "/src/styles.css";
import React, { useState, useEffect, useReducer } from "react";
import Movie from "./Movie";
import Search from "./Search";
import { Tabs, DotLoading } from "antd-mobile";
const MOVIE_API_URL = "https://www.omdbapi.com/?s=China&apikey=4a3b711b";
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};
const App = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  useEffect(() => {
    //初始化页面
    // fetch(DouBan_RM_URL)
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue) => {
    //搜索
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });
    setLoading(true);
    setErrorMessage("");
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log("jsonResponse", jsonResponse);
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  //渲染导航栏
  const renderDaoHang = () => {
    return (
      <>
        <Tabs>
          <Tabs.Tab
            title="最近热门"
            onChange={(key) => {
              console.log(key);
            }}
            key="remen"
          >
            <div>
              {loading && !errorMessage ? (
                <div>
                  <span style={{ fontSize: 14 }}>
                    <DotLoading />
                  </span>
                  <span style={{ fontSize: 18 }}>
                    <DotLoading />
                  </span>
                  <span style={{ fontSize: 24 }}>
                    <DotLoading />
                  </span>
                </div>
              ) : errorMessage ? (
                <div className="errorMessage">{errorMessage}</div>
              ) : (
                movies.map((movie, index) => (
                  <Movie key={movie.Title} movie={movie} />
                ))
              )}
            </div>
          </Tabs.Tab>
          <Tabs.Tab title="排行榜" key="paihangbang">
            <div>
              {loading && !errorMessage ? (
                <div>
                  <span style={{ fontSize: 14 }}>
                    <DotLoading />
                  </span>
                  <span style={{ fontSize: 18 }}>
                    <DotLoading />
                  </span>
                  <span style={{ fontSize: 24 }}>
                    <DotLoading />
                  </span>
                </div>
              ) : errorMessage ? (
                <div className="errorMessage">{errorMessage}</div>
              ) : (
                movies.map((movie, index) => (
                  <Movie key={movie.Title} movie={movie} />
                ))
              )}
            </div>
          </Tabs.Tab>
        </Tabs>
      </>
    );
  };

  return (
    <div className="App">
      <div>
        <Search search={search} />
      </div>
      <div>
        {renderDaoHang()}
        {/* <Header title={title} /> */}
      </div>
    </div>
  );
};
export default App;
