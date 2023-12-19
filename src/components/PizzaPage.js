import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import 'react-toastify/dist/ReactToastify.css';

const PizzaPage = (props) => {
    const today = format(new Date(), 'dd.MM.yyyy eeee', { locale: enUS });
    const markAsRed = (today.includes("Sunday")) ? "Our restaurant is closed for orders on Sundays. See you tomorrow!" : "";
    const close = (today.includes("Sunday")) ? true : false;

    const {
        setPizzaForm,
        orderPizza,
        pizzaIng,
        selectedPizza,
        count,
        setCount,
        theme,
        setTheme,
        pizza,
        setOrderPizza
    } = props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: "all",
        defaultValues: {
            pizzaEdge: "",
            pizzaDough: "",
            pizzaExtraIng: "",
            pizzaOrderNote: "",
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumberArea: "",
            phoneNumber: "",
            address: "",
        }
    });

    const navigate = useNavigate();

    const orderDetailsSubmit = (orderData) => {
        console.log("Order Details > ", orderData);
        setPizzaForm(orderData);
        Swal.fire({
            title: `Do you confirm to order ${count} ${orderPizza.pizzaSelection} ${count === 1 ? "Pizza" : "Pizzas"}?`,
            text: `Pizza Price & Total: ${orderPizza.pizzaPrice * count}€ - Extra Ingredients Fee: ${orderData.pizzaExtraIng === undefined ? 0 : (orderData.pizzaExtraIng.includes("No additional ingredient") === true ? 0 : orderData.pizzaExtraIng.length * 0.5) * count}€ - Total Order Fee: ${(orderPizza.pizzaPrice * count) + (orderData.pizzaExtraIng === undefined ? 0 : (orderData.pizzaExtraIng.includes("No additional ingredient") === true ? 0 : orderData.pizzaExtraIng.length * 0.5) * count)}€`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Congratulations!",
                    text: "Your order has been completed successfully.",
                    icon: "success"
                });
                reset();
                setTimeout(() => navigate("/approval"), 1000);
            }
        });
    };

    const increase = (e) => {
        setCount(count + 1);
        e.preventDefault();
    };
    const decrease = (e) => {
        setCount(count - 1);
        e.preventDefault();
    };

    const [extraIng, setExtraIng] = useState(false);
    const [inactive, setInactive] = useState(false);

    return (
        <div>
            <div className="flex flex-row items-center justify-center bg-amber-400 w-full py-3 drop-shadow-lg sticky top-0 z-30">
                <div className="flex flex-row">
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
            </div>

            <div className={theme ? "bg-stone-800 text-slate-100 w-full px-4" : "bg-red-700 text-slate-100 w-full px-4"}>
                <div className="flex flex-col">
                    <div className="grid justify-items-center content-between">
                        <img className="w-72 pb-8" src={require("../assets/5.png")} alt="pizza" />

                        <div>
                            <div className="pb-5">
                                <label htmlFor="orderDate">
                                    Order Date: {today}
                                </label>
                                <br />
                                <span className="bg-amber-400 text-stone-800">{markAsRed}</span>
                            </div>

                            <label htmlFor="pizzaSelection">
                                How would you like your pizza? <i>(All our pizzas are <b>32 cm</b> in size.)</i>
                            </label>

                            <br />

                            <div className="flex flex-row mt-2">
                                {pizza.map((item) => {
                                    return (
                                        <label
                                            className="bg-amber-100 mr-2 px-5 py-2 rounded-lg drop-shadow-xl text-stone-800 flex flex-col justify-center items-center hover:bg-amber-200 cursor-pointer text-sm"
                                            htmlFor={item.id}
                                            key={item.id}
                                        >
                                            <img className="w-28" alt="pizza" src={require(`../assets/${item.id}.png`)} />
                                            <div className={theme ? "bg-stone-800 h-0.5 w-12 rounded my-2" : "bg-red-700 h-0.5 w-12 rounded my-2"} />
                                            <center>
                                                <p className="font-bold grid justify-items-center">
                                                    {item.name}
                                                    <br />
                                                    Price: {item.price}€
                                                </p>
                                            </center>
                                            <p className="text-xs w-20">
                                                <i>-{item.ingredientOne}</i>
                                            </p>
                                            <p className="text-xs w-20">
                                                <i>-{item.ingredientTwo}</i>
                                            </p>
                                            <p className="text-xs w-20">
                                                <i>-{item.ingredientThree}</i>
                                            </p>
                                            <p className="text-xs w-20">
                                                <i>-{item.ingredientFour}</i>
                                            </p>
                                            <p className="text-xs w-20">
                                                <i>-{item.ingredientFive}</i>
                                            </p>
                                            <div className="mt-3">
                                                {orderPizza.pizzaSelection === item.name ?
                                                    <FontAwesomeIcon
                                                        className="text-xl text-green-600 drop-shadow-xl"
                                                        icon={faCircleCheck}
                                                    /> :
                                                    <FontAwesomeIcon
                                                        className="text-xl text-black opacity-10 drop-shadow-xl"
                                                        icon={faCircleCheck}
                                                    />
                                                }
                                            </div>
                                            <button
                                                id={item.id}
                                                type="submit"
                                                name={item.name}
                                                onClick={selectedPizza}
                                            >
                                            </button>
                                        </label>
                                    )
                                })}
                            </div>

                            <br />
                            <br />

                            <div>
                                <label htmlFor="pizzaSelection">
                                    How many pizzas would you like?
                                </label>
                                <div className="flex flex-row mt-1">
                                    <button
                                        className="text-stone-800 bg-amber-100 hover:bg-amber-200 px-2 rounded-l"
                                        onClick={decrease}
                                        data-cy="decrease-button"
                                    >
                                        -
                                    </button>

                                    <p className="text-stone-800 bg-amber-400 px-2">{count}</p>

                                    <button
                                        className="text-stone-800 bg-amber-100 hover:bg-amber-200 px-2 rounded-r"
                                        onClick={increase}
                                        data-cy="increase-button"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <br />

                            <form onSubmit={handleSubmit(orderDetailsSubmit)}>
                                <div>
                                    <label htmlFor="pizzaEdge">
                                        How should the edge of your pizza be?
                                    </label>
                                    <br />
                                    <label className="italic text-sm" htmlFor="pizzaEdge">
                                        P.S. There will be no extra charge for the edge.
                                    </label>
                                    <br />
                                    <ul className="mt-1 bg-amber-100 inline-block text-stone-800 rounded pl-1 pr-9 py-2 text-sm">
                                        <li>
                                            <input
                                                className="mr-1"
                                                id="list-radio-classic"
                                                type="radio"
                                                value="Classic"
                                                {...register("pizzaEdge", { required: "You need to choose the edge of your pizza!" })}
                                            />
                                            Classic
                                        </li>

                                        <li>
                                            <input
                                                className="mr-1"
                                                id="list-radio-sesamecumin"
                                                type="radio"
                                                value="With sesame & black cumin"
                                                {...register("pizzaEdge", { required: "You need to choose the edge of your pizza!" })}
                                            />
                                            With sesame & black cumin
                                        </li>

                                        <li>
                                            <input
                                                className="mr-1"
                                                id="list-radio-feta"
                                                type="radio"
                                                value="Feta cheese filled"
                                                {...register("pizzaEdge", { required: "You need to choose the edge of your pizza!" })}
                                            />
                                            Feta cheese filled
                                        </li>

                                        <li>
                                            <input
                                                className="mr-1"
                                                id="list-radio-cheddar"
                                                type="radio"
                                                value="Cheddar cheese filled"
                                                {...register("pizzaEdge", { required: "You need to choose the edge of your pizza!" })}
                                            />
                                            Cheddar cheese filled
                                        </li>
                                    </ul>
                                    {errors.pizzaEdge && <p>{errors.pizzaEdge.message}</p>}
                                </div>

                                <br />

                                <div>
                                    <label htmlFor="pizzaDough">
                                        How thick do you want your dough?
                                    </label>
                                    <br />
                                    <select className="mt-1 text-stone-800 rounded bg-amber-100 text-sm py-1"
                                        {...register("pizzaDough", { required: "You need to choose the dough thickness of your pizza!" })}
                                    >
                                        <option value="Very Thin">Very Thin</option>
                                        <option value="Thin">Thin</option>
                                        <option value="Thick">Thick</option>
                                    </select>
                                    {errors.pizzaDough && <p>{errors.pizzaDough.message}</p>}
                                </div>

                                <br />

                                <div>
                                    <label htmlFor="pizzaExtraIng">
                                        <p className="pb-3">Extra Ingredients</p>
                                        <p>You can choose up to 5 ingredients.</p>
                                        <p className="italic text-sm pt-1">P.S. Each added ingredient costs 0,5€.</p>
                                    </label>

                                    <div className="my-2 bg-amber-100 text-stone-800 rounded pl-1 pr-8 py-2 text-sm font-bold inline-block">
                                        <label key="noPizzaExtraIng">
                                            <input
                                                {...register("pizzaExtraIng")}
                                                type="checkbox"
                                                value="No additional ingredient"
                                                className="disabled:opacity-75 mr-1"
                                                disabled={inactive === true}
                                                onClick={() => {
                                                    setExtraIng(!extraIng);
                                                }}
                                            />
                                            No additional ingredient
                                        </label>
                                    </div>

                                    <div className="my-2 grid grid-cols-2 bg-amber-100 text-stone-800 rounded pl-1 py-2 text-sm">
                                        {pizzaIng
                                            .map((item) => (
                                                <label
                                                    className="flex flex-wrap"
                                                    key={item}
                                                >
                                                    <input
                                                        {...register("pizzaExtraIng", {
                                                            validate: {
                                                                maxIng: (value) =>
                                                                    value.length <= 5 || "You can choose up to 5 ingredients!",
                                                                minIng: (value) =>
                                                                    value.length >= 1 && value.includes("No additional ingredient") !== true ? setInactive(true) : setInactive(false),
                                                                message: (value) =>
                                                                    value.length !== 0 || "You have to choose a choice!"
                                                            }
                                                        })}
                                                        type="checkbox"
                                                        value={`${item}`}
                                                        className="mr-1 disabled:opacity-75"
                                                        disabled={extraIng === true}
                                                    />
                                                    {item}
                                                </label>
                                            ))}
                                    </div>
                                    {errors.pizzaExtraIng && <p>{errors.pizzaExtraIng.message}</p>}
                                </div>

                                <br />

                                <div>
                                    <label htmlFor="pizzaOrderNote">
                                        Order Note
                                    </label>
                                    <br />
                                    <textarea
                                        className="mt-1 text-stone-800 rounded pl-1 bg-amber-100 py-2 text-sm pr-5"
                                        id="pizzaOrderNote"
                                        placeholder="Is there an order note you would like to add?"
                                        name="pizzaOrderNote"
                                        {...register("pizzaOrderNote",
                                            {
                                                required: "The order note field cannot be left blank!",
                                                minLength: {
                                                    value: 1,
                                                }
                                            })}
                                    />
                                    {errors.pizzaOrderNote && <p>{errors.pizzaOrderNote.message}</p>}
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="firstName">
                                            Name
                                        </label>
                                        <input
                                            className="text-stone-800 rounded ml-1 pl-1 bg-amber-100 py-1 text-sm"
                                            type="text"
                                            placeholder="_"
                                            id="firstName"
                                            name="firstName"
                                            {...register("firstName", { required: "The name field cannot be left blank!" })}
                                        />
                                        {errors.firstName && <p>{errors.firstName.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="lastName">
                                            Surname
                                        </label>
                                        <input
                                            className="text-stone-800 rounded ml-1 pl-1 bg-amber-100 py-1 text-sm"
                                            type="text"
                                            placeholder="_"
                                            id="lastName"
                                            name="lastName"
                                            {...register("lastName", { required: "The surname field cannot be left blank!" })}
                                        />
                                        {errors.lastName && <p>{errors.lastName.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="emailAddress">
                                            Email
                                        </label>
                                        <input
                                            className="text-stone-800 rounded ml-1 pl-1 bg-amber-100 py-1 text-sm"
                                            type="email"
                                            placeholder="_"
                                            id="emailAddress"
                                            name="emailAddress"
                                            {...register("emailAddress", {
                                                required: "The email field cannot be left blank!",
                                                validate: {
                                                    message: (value) =>
                                                        value.includes("@") === true || "Do not forget to add a symbol of '@'!"
                                                }
                                            })}
                                        />
                                        {errors.emailAddress && <p>{errors.emailAddress.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phoneNumber">
                                            Tel
                                        </label>

                                        <select className="text-stone-800 rounded ml-1 pl-1 bg-amber-100 py-1 text-sm"
                                            {...register("phoneNumberArea", { required: "The area field cannot be left blank!" })}
                                        >
                                            <option value="+90">+90</option>
                                            <option value="+90">+49</option>
                                            <option value="+90">+44</option>
                                            <option value="+90">+33</option>
                                            <option value="+90">+39</option>
                                            <option value="+90">+34</option>
                                        </select>

                                        <input
                                            className="text-stone-800 w-32 rounded ml-1 pl-1 bg-amber-100 py-1 text-sm"
                                            type="tel"
                                            placeholder="_"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            {...register("phoneNumber", {
                                                required: "The number field cannot be left blank!",
                                                maxLength: {
                                                    value: 10,
                                                    message: "Too many numbers entered!",
                                                }
                                            })}
                                            {...register("phoneNumber", {
                                                required: "The number field cannot be left blank!",
                                                minLength: {
                                                    value: 10,
                                                    message: "Too few numbers entered!",
                                                }
                                            })}
                                        />
                                        <br />
                                        {errors.phoneNumberArea && <p>{errors.phoneNumberArea.message}</p>}
                                        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                                    </div>
                                </div>

                                <div className="pt-3">
                                    <label htmlFor="address">
                                        Address
                                    </label>

                                    <br />

                                    <textarea
                                        className="text-stone-800 rounded pl-1 bg-amber-100 py-1 text-sm"
                                        id="address"
                                        placeholder="Can you enter your address information?"
                                        name="address"
                                        {...register("address",
                                            {
                                                required: "The address field cannot be left blank!",
                                            })}
                                    />
                                    {errors.address && <p>{errors.address.message}</p>}
                                </div>

                                <br />

                                <div>
                                    <button
                                        className="bg-amber-400 hover:bg-amber-200 text-stone-800 rounded px-2 py-2 font-bold cursor-pointer disabled:opacity-25" type="submit"
                                        disabled={!isValid || close || orderPizza.pizzaPrice === 0}
                                    >
                                        ORDER!
                                    </button>
                                </div>

                                <br />

                            </form >
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
};

export default PizzaPage;
