// src/hooks/useInventory.js
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterialItems,
  getLenders,
  addLender,
  updateLender,
} from "./inventorySlice";
import { ERROR, INITIAL } from "../../../helpers/constants";

const useInventory = () => {
  const dispatch = useDispatch();
  const { materialItems, storeState, lenders, lendersState } = useSelector(
    (state) => state.inventory
  );

  const fetchMaterialItems = () => {
    if (storeState === INITIAL) {
      dispatch(getMaterialItems());
    }
  };
  const fetchLendersList = () => {
    if (lendersState === INITIAL || lendersState === ERROR) {
      console.log("lending");
      dispatch(getLenders());
    }
  };
  const addLenders = (payload) => {
    dispatch(addLender(payload));
  };
  const updateLenders = (payload) => {
    dispatch(updateLender(payload));
  };
  return {
    storeState,
    materialItems,
    fetchMaterialItems,
    fetchLendersList,
    lenders,
    addLenders,
    updateLenders,
  };
};

export default useInventory;
