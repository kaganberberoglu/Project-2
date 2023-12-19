import React from "react";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const HomePage = (props) => {
  const {
    theme,
    setTheme,
    setOrderPizza,
    setCount
  } = props;

  return (
    <div className={theme ? "bg-stone-800 h-screen" : "bg-red-700 h-screen"}>
      <div className="flex flex-col">
        <div className="grid justify-items-center content-between">
          <div className="grid justify-items-center">
            <div className="flex flex-row items-center pt-20">
              <h1 className="text-slate-100 font-medium text-6xl">
                <Link
                  to="/"
                  onClick={() => {
                    setOrderPizza({
                      pizzaSelection: "",
                      pizzaIngredientOne: "",
                      pizzaIngredientTwo: "",
                      pizzaIngredientThree: "",
                      pizzaIngredientFour: "",
                      pizzaIngredientFive: "",
                      pizzaPrice: 0,
                    })
                    setCount(1)
                  }
                  }>
                  PIZZA CORNER
                </Link>
              </h1>
              <DarkModeSwitch
                className="ml-2"
                data-cy="dark-mode"
                moonColor="#f1f5f9"
                sunColor="#f1f5f9"
                size={55}
                checked={theme}
                onClick={(e) => {
                  e.preventDefault();
                  setTheme(!theme);
                }}
              />
            </div>
            <p className="text-slate-100 text-2xl mt-5">you can't make everyone happy</p>
            <p className="text-slate-100 text-2xl pt-1">because you are not a <span className="before:block before:absolute before:-inset-0.5 before:-skew-y-3 before:bg-amber-400 relative inline-block"><span className="relative text-stone-800">pizza</span></span>!</p>
            <button className="mt-8 bg-amber-400 font-medium text-3xl rounded px-5 py-1 animate-bounce hover:bg-amber-200">
              <Link to={"/pizza"}>I'M HUNGRY</Link>
            </button>
          </div>
          <div className="absolute bottom-0">
            <img className="max-h-64" src={require("../assets/4.png")} alt="pizza"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
