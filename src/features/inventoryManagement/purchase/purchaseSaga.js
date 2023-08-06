import { call, put, takeEvery } from "@redux-saga/core/effects";
import * as api from "./purchaseAPI";
import * as inventoryAPI from "./../inventory/inventoryAPI";

import {
  getPurchaseItemsSuccess,
  getPurchaseItemsFailure,
  addPurchaseItemsSuccess,
  addPurchaseItemsFailure,
  getPurchaseItems,
} from "./purchaseSlice";
import { showToastBanner } from "../../toastBanner/toastBannerSlice";

function* workPurchaseItemsFetch(action) {
  try {
    const data = yield call(api.getPurchaseItems, action.payload);
    console.log("items", data);

    yield put(getPurchaseItemsSuccess(data));
  } catch (e) {
    yield put(getPurchaseItemsFailure());
  }
}

function* workAddPurchaseItemsFetch(action) {
  try {
    const { data } = yield call(api.addPurchaseItems, action.payload);
    yield put(getPurchaseItems());
    yield put(addPurchaseItemsSuccess(data));
    yield put(
      showToastBanner({
        message: "Purchase added successfully.",
      })
    );
  } catch (e) {
    yield put(addPurchaseItemsFailure());
    yield put(
      showToastBanner({
        message: "We were unable to save your changes.",
        type: "error",
      })
    );
  }
}

export default function* purchaseSaga() {
  yield takeEvery("purchase/getPurchaseItems", workPurchaseItemsFetch);
  yield takeEvery("purchase/addPurchaseItems", workAddPurchaseItemsFetch);
}
