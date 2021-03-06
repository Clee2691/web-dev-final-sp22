import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from 'axios';

import NavigationBar from "../NavigationBar";


const SearchResults = () => {
  const [allRecipes, setRecipes] = useState([]);
  const { criteria } = useParams();

  const mealdbURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

  const getRecipesByKeyword = async () => {
    const response = await axios.get(`${mealdbURL}${criteria}`);
    setRecipes(response.data);
  }

  useEffect(() => {
    getRecipesByKeyword();
  }, []);

  if (!allRecipes.meals) {
    return (
      <>
        <NavigationBar currScreen={"SEARCH"} />
        <div className="container mt-2">

            <h1 className="text-center">
              No Results founds...
            </h1>
            <Link to="/search" className="d-flex justify-content-center text-decoration-none">
              <button className="btn btn-danger btn-lg">Try Again</button>
            </Link>
        </div>
      </>
    );
  }
  return (
    <>
      <NavigationBar currScreen={"SEARCH"} />
      <div className="container mt-3">
        <div className="d-flex justify-content-between mb-2">
          <h1 className="align-center">Recipe Results</h1>
          <Link to="/search">
            <button className="btn btn-danger float-left">Search Again</button>
          </Link>
        </div>
        {/* The results of the search */}
        <table className="table table-dark table-striped table-hover text-center align-middle ms-auto me-auto table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allRecipes.meals.map((recipe) => {
              return (
                <tr>
                  <td>{recipe.idMeal}</td>
                  <td>
                    <img className="img-fluid w-50" src={recipe.strMealThumb} />
                  </td>
                  <td>{recipe.strMeal}</td>

                  <td>
                    <Link to={`/details/${recipe.idMeal}`}>
                      <button className="btn btn-primary">More Details</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SearchResults;
