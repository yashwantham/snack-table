// import { snacks } from "../db/snacks";
import { useContext, useEffect, useState } from "react";
import "./SnackTable.css";
import { ACTIONS, SnackContext } from "../context/SnackProvider";
import { snacks } from "../db/snacks";

export function SnackTable() {

    const { SORT_ON_ID_ASC, SORT_ON_ID_DES, SORT_ON_PNAME_ASC, SORT_ON_PNAME_DES, SORT_ON_PWEIGHT_ASC, SORT_ON_PWEIGHT_DES, SORT_ON_PRICE_ASC, SORT_ON_PRICE_DES, SORT_ON_CALORIES_ASC, SORT_ON_CALORIES_DES, SORT_ON_INGRED_ASC, SORT_ON_INGRED_DES} = ACTIONS;

    const {snackState, dispatchSnack} = useContext(SnackContext);

    const [searchedterm, setSearchedterm] = useState();

    let snackstodisplay = [...snackState.sortedDisplayList];

    const [idsortstate, setIdsortstate] = useState({ascending: false, descending: false});


    const changeHandler = (e) => {
        setSearchedterm(e.target.value);
    }

    snackstodisplay = snackstodisplay.filter((snack) => snack.product_name.toLowerCase().includes(searchedterm.toLowerCase()))




    const idSortHandler = () => {
        console.log("id clicked")
        if(!idsortstate.ascending && !idsortstate.descending) {
            dispatchSnack({type: SORT_ON_ID_ASC})
            setIdsortstate({...idsortstate, ascending: true})
        }
        else if(idsortstate.ascending) {
            dispatchSnack({type: SORT_ON_ID_DES})
            setIdsortstate({ascending: false, descending: true})
        }
        else if(idsortstate.descending) {
            dispatchSnack({type: SORT_ON_ID_ASC})
            setIdsortstate({ascending: true, descending: false})
        }
    }

    const pNameHandler = () => {

    }

    return (
        <>
            <div className="snacktable-page-container">
                <div className="heading">
                <h1>Snack Table</h1>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search with Products or Ingrediants" onChange={changeHandler}/>
                </div>
                <div className="table-container">
                    <table>
                        <tr>
                            <th onClick={idSortHandler}>ID</th>
                            <th onClick={pNameHandler}>Product Name</th>
                            <th>Product Weight</th>
                            <th>Price (INR)</th>
                            <th>Calories</th>
                            <th>Ingredients</th>
                        </tr>
                        {snackstodisplay.map((snack) => (
                            <tr>
                                <td>{snack?.id}</td>
                                <td>{snack?.product_name}</td>
                                <td>{snack?.product_weight}</td>
                                <td>{snack?.price}</td>
                                <td>{snack?.calories}</td>
                                <td>{snack?.ingredients}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}