import React, { useState } from "react";
import "/src/components/detile.css";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  function callSearchFunction() {
    //输入空 不搜索
    if (searchValue !== "") {
      props.search(searchValue);
      setSearchValue("");
    }
  }

  function handleSearchInputChanges(e) {
    setSearchValue(e.target.value);
  }

  // function searchValue() {}

  return (
    <div class="search">
      <form>
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          placeholder="请输入您要搜索的内容..."
          type="text"
          id="input"
        />
        <button onClick={callSearchFunction} type="submit" />
      </form>
    </div>
  );
};
export default Search;
