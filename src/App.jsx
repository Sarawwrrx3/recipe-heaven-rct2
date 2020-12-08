import React, { useEffect, useState } from "react";
// import Header from "./Header"; // ---- going to use index.html
//  import Footer from "./Footer.jsx";  ---- this is in the header area
import "./App.css"; // check YouTube for this line at 0:50 seconds
import Recipe from "./Recipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(""); //search bar
  const [query, setQuery] = useState("chicken"); //submit after we click the "search" button

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
      );
      // use (`) instead of ("") or (''). top of tab button.
      // "Notice the back-ticks and ES6 template string literal." - stack overflow
      const data = await response.json();
      setRecipes(data.hits); // from log
      // console.log(data.hits);
    };

    getRecipes();
  }, [query]);

  const getSearch = (e) => {
    e.preventDefault(); // stop page refresh
    setQuery(search);
    setSearch("");
  };

  // e = event. also for onChange
  const updateSearch = (e) => {
    setSearch(e.target.value);
    // console.log(search); //32:00 YT
  };

  return (
    <div className="App">
      {/* <Header /> */}

      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipe-section">
        {recipes.map((recipe) => (
          //label ---- title
          <Recipe
            key={recipe.recipe.label} // cba ge it
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>

      {/* <Footer /> */}
    </div>
    //Beautify "format on save" is NOT checked
    //save
  );
}

export default App;
