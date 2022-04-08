import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import NavigationBar from "../NavigationBar";

const foodURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const ItemDetails = () => {
  const [selectedItem, setSelected] = useState({});
  const recipeId = useParams();
  const navigate = useNavigate();

  const mergeIngredientList = function () {
    // Mapping ingredients with their measurements from the json response
    const ingredientArray = [];

    Object.keys(selectedItem).forEach((theKey) => {
      if (
        theKey.includes("Ingredient") &&
        selectedItem[theKey] !== null &&
        selectedItem[theKey].length > 0
      ) {
        ingredientArray.push(selectedItem[theKey]);
      }
    });

    const ingredientMeasureArray = [];

    Object.keys(selectedItem).forEach((theKey) => {
      if (
        theKey.includes("Measure") &&
        selectedItem[theKey] !== null &&
        selectedItem[theKey].length > 0
      ) {
        ingredientMeasureArray.push(selectedItem[theKey]);
      }
    });

    const mapped = ingredientArray.map((ingred, meas) => {
      return { ingredient: ingred, measure: ingredientMeasureArray[meas] };
    });

    return mapped;
  };

  useEffect(() => {
    fetch(foodURL + recipeId.id)
      .then((res) => res.json())
      .then((data) => setSelected(data.meals[0]));
  }, [recipeId.id]);

  if (Object.keys(selectedItem).length === 0) {
    return (
      <>
        <NavigationBar />
        <div className="container-fluid mt-2 mb-2">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back to List
          </button>
          <h1 className="text-center">LOADING...</h1>
        </div>
      </>
    );
  } else {
    const mappedIngredients = mergeIngredientList();
    return (
      <>
        <NavigationBar />
        <div className="container-fluid mt-2 mb-2">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back to List
          </button>

          <h1 className="text-center">{selectedItem.strMeal}</h1>
          <img
            className="rounded mx-auto d-block w-50"
            src={selectedItem.strMealThumb}
          ></img>

          {/* The item details */}
          <div className="container">
            <h2 className="mt-2 text-center">Ingredients</h2>
            <div className="col-md-7 ms-auto me-auto">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Ingredient Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedIngredients.map((ingredient) => {
                    return (
                      <tr>
                        <td>{ingredient.ingredient}</td>
                        <td>{ingredient.measure}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-2 mb-2">
              <h2 className="text-center">Directions</h2>
              <p>{selectedItem.strInstructions}</p>
              {selectedItem.strSource !== "" && selectedItem.strSource && (
                <a
                  className="text-decoration-none"
                  href={selectedItem.strSource}
                >
                  Source
                </a>
              )}
            </div>
          </div>

          {/* Item reviews */}
          <div className="container">
            <h4 className="text-center">User Reviews</h4>
            <a href="#">User 1</a>
            <p>I love it! Best chicken recipe ever</p>
            <a href="#">User 2</a>
            <p>I love it! Best chicken recipe ever</p>
            
            <div className="container col-8">
                <p className="lead">Add Your Own Review: </p>
                <div className="input-group mt-2 mb-2">
                  <label className="form-label me-2" htmlFor="starInput">Number of Stars</label>
                  <input type="number" className="form-control form-control-sm" defaultValue={0} min="0" max="5" id="starInput"/>
                </div>
                <textarea className="form-control" placeholder="Did you try this recipe?"></textarea>
                <button className="btn btn-success mt-2">Review</button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ItemDetails;
