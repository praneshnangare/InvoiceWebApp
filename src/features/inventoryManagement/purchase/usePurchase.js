import { ERROR, INITIAL } from "../../../helpers/constants";
import { useSelector, useDispatch } from "react-redux";
import { getPurchaseItems, addPurchaseItems } from "./purchaseSlice";
import useInventory from "../inventory/useInventory";
import { addLender } from "../inventory/inventorySlice";

const usePurchase = () => {
  const { storeState, purchaseItems } = useSelector((store) => store.purchase);
  const { lenders, updateLenders, addLenders } = useInventory();

  const dispatch = useDispatch();

  const fetchPurchaseItems = (selectedYear, selectedMonth) => {
      const payload = {
        year: selectedYear,
        month: selectedMonth,
      };
      dispatch(getPurchaseItems(payload));
  };
  const addPurchaseItem = (payload) => {
    dispatch(addPurchaseItems(payload));
    const { paidBy, amount } = payload;
    const lendersList = lenders;
    if (lendersList[paidBy]) {
      const data = {
        lenderData: { lendedAmount: lendersList[paidBy].lendedAmount + amount },
        lender: paidBy,
      };
      updateLenders(data);
    } else {
      const data = {
        lender: paidBy,
        lenderData: {
          lendedAmount: amount,
        },
      };
      addLenders(data);
    }
  };

  return {
    storeState,
    purchaseItems,
    fetchPurchaseItems,
    addPurchaseItem,
  };
};

export default usePurchase;
