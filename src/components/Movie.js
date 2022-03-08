import React, { useState, useEffect } from "react";
import "/src/components/detile.css";
import { Card, Popup } from "antd-mobile";
import { MovieOutline } from "antd-mobile-icons";
const Movie = (props) => {
  const [visible, setVisible] = useState(false); //控制弹出框显隐
  useEffect(() => {
    //初始化页面
  }, []);

  let Movie = props.movie;
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div className="movie">
      <Card
        title={
          <div style={{ fontWeight: "normal" }}>
            <MovieOutline style={{ marginRight: "4px", color: "#1677ff" }} />
            {Movie.Title}
          </div>
        }
        onClick={onClick}
      >
        <img alt="poster" src={Movie.Poster} height="150" />
        <a>{Movie.imdbID}</a>
      </Card>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh"
        }}
      >
        {Movie.Title}
      </Popup>
    </div>
  );
};

export default Movie;
