import { createContext, useEffect, useReducer } from "react"
import { snacks } from "../db/snacks";

export const SnackContext = createContext();

export const ACTIONS = {
    INITIAL_LOAD: "initial-load",
    SORT_ON_ID_ASC: "sort-on-id-asc",
    SORT_ON_ID_DES: "sort-on-id-des",
    SORT_ON_PNAME_ASC: "sort-on-pname-asc",
    SORT_ON_PNAME_DES: "sort-on-pname-des",
    SORT_ON_PWEIGHT_ASC: "sort-on-pweight-asc",
    SORT_ON_PWEIGHT_DES: "sort-on-pweight-des",
    SORT_ON_PRICE_ASC: "sort-on-price-asc",
    SORT_ON_PRICE_DES: "sort-on-price-des",
    SORT_ON_CALORIES_ASC: "sort-on-calories-asc",
    SORT_ON_CALORIES_DES: "sort-on-calories-des",
    SORT_ON_INGRED_ASC: "sort-on-ingrd-asc",
    SORT_ON_INGRED_DES: "sort-on-ingrd-des"
}

export function SnackProvider({ children }) {

    const { INITIAL_LOAD, SORT_ON_ID_ASC, SORT_ON_ID_DES, SORT_ON_PNAME_ASC, SORT_ON_PNAME_DES, SORT_ON_PWEIGHT_ASC, SORT_ON_PWEIGHT_DES, SORT_ON_PRICE_ASC, SORT_ON_PRICE_DES, SORT_ON_CALORIES_ASC, SORT_ON_CALORIES_DES, SORT_ON_INGRED_ASC, SORT_ON_INGRED_DES } = ACTIONS;

    const snackReducer = (state, action) => {
        switch (action.type) {

            case SORT_ON_ID_ASC: {
                const newList = state.sortedDisplayList.sort((a, b) => a.id - b.id)
                return { ...state, sortedDisplayList: [...newList] }
            }

            case SORT_ON_ID_DES: {
                const newList = state.sortedDisplayList.sort((a, b) => b.id - a.id)
                return { ...state, sortedDisplayList: [...newList] }
            }



            default: {
                return state;
            }


        }
    }

    const [snackState, dispatchSnack] = useReducer(snackReducer, { originalList: [...snacks], sortedDisplayList: [...snacks] })

    return (
        <>
            <SnackContext.Provider value={{ snackState, dispatchSnack }}>{children}</SnackContext.Provider>
        </>
    )
}