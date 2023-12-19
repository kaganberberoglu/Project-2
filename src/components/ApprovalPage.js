import React from "react";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ApprovalPage = (props) => {
    const {
        pizzaForm,
        orderPizza,
        count,
        theme,
        setTheme,
        setOrderPizza,
        setCount
    } = props;

    const pizzaIngredientsPrice = pizzaForm.pizzaExtraIng.includes("No additional ingredient") === true ? 0 : pizzaForm.pizzaExtraIng.length * 0.5;
    const totalPrice = orderPizza.pizzaPrice * count;

    return (
        <div>
            <div className="flex flex-row items-center justify-center bg-amber-400 w-full py-3 drop-shadow-lg sticky top-0 z-30">
                <h1 className="text-stone-800 font-medium text-3xl">
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
                    moonColor="#292524"
                    sunColor="#292524"
                    size={35}
                    checked={theme}
                    onClick={(e) => {
                        e.preventDefault();
                        setTheme(!theme);
                    }}
                />
            </div>

            <div className={theme ? "bg-stone-800 text-slate-100 w-full px-4" : "bg-red-700 text-slate-100 w-full px-4"}>
                <div className="flex flex-col">
                    <div className="grid justify-items-center content-between">
                        <img
                            className="w-72 mb-10"
                            src={require("../assets/5.png")}
                            alt="pizza"
                        />

                        <div>
                            <div>
                                <p className="text-slate-100 text-xl">Your <span className="before:block before:absolute before:-inset-0.5 before:-skew-y-3 before:bg-amber-400 relative inline-block"><span className="relative text-stone-800">taste</span></span> is on the way!</p>
                                <p className="text-5xl pt-3">ORDER HAS BEEN TAKEN!</p>
                            </div>

                            <div className="bg-slate-100 h-0.5 w-auto rounded my-3" />

                            <div className="text-lg">
                                <p><u>Pizza Name:</u> {orderPizza.pizzaSelection}</p>
                                <p>
                                    <u>Pizza Ingredients:</u> {orderPizza.pizzaIngredientOne}, {orderPizza.pizzaIngredientTwo}, {orderPizza.pizzaIngredientThree}, {orderPizza.pizzaIngredientFour}, {orderPizza.pizzaIngredientFive}
                                </p>
                                <p><u>Pizza Edge:</u> {pizzaForm.pizzaEdge}</p>
                                <p><u>Pizza Dough:</u> {pizzaForm.pizzaDough}</p>
                                {pizzaForm.pizzaExtraIng.length === 0 ? <p><u></u></p> : <p><u>Extra Ingredients:</u></p>}
                                {pizzaForm.pizzaExtraIng.map((item) => {
                                    return (
                                        <li key={item}>
                                            {item}
                                        </li>
                                    )
                                })}
                                <p><u>Order Note:</u> {pizzaForm.pizzaOrderNote}</p>
                                <p><u>Name:</u> {pizzaForm.firstName}</p>
                                <p><u>Surname:</u> {pizzaForm.lastName}</p>
                                <p><u>Email:</u> {pizzaForm.emailAddress}</p>
                                <p><u>Phone:</u> {pizzaForm.phoneNumberArea}{pizzaForm.phoneNumber}</p>
                                <p><u>Address:</u> {pizzaForm.address}</p>

                                <br />

                                <div className="border border-slate-100 rounded inline-block p-5">
                                    <p>Order Details</p>
                                    <div className="bg-slate-100 h-0.5 w-32 rounded mt-1 mb-5" />
                                    <p><u>Number of Pizzas:</u> {count}</p>
                                    <p><u>Pizza Price & Total:</u> {orderPizza.pizzaPrice * count}€</p>
                                    <p><u>Extra Ingredients Fee:</u> {pizzaIngredientsPrice * count}€</p>
                                    <p><u>Order Fee:</u> {totalPrice + pizzaIngredientsPrice * count}€</p>
                                </div>
                            </div>
                            <button className="text-black text-xl drop-shadow-lg bg-amber-400 font-medium rounded px-3 py-1 animate-bounce hover:bg-amber-200 my-10">
                                <Link
                                    to="/pizza"
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
                                    I'M STILL HUNGRY
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApprovalPage;
