// src/sagas/inventorySaga.js
import { call, put, takeEvery } from "@redux-saga/core/effects";
import {
  getMaterialItemsSuccess,
  getMaterialItemsFailure,
  getLendersSuccess,
  getLendersFailure,
  addLenderSuccess,
  addLenderFailure,
  updateLenderSuccess,
  updateLenderFailure,
} from "./inventorySlice";
import * as api from "./inventoryAPI";

function* fetchMaterialItemsSaga() {
  try {
    const materialItems = yield call(api.getMaterialItems); // Call the API function to get material items
    yield put(getMaterialItemsSuccess(materialItems));
  } catch (error) {
    yield put(getMaterialItemsFailure());
  }
}
function* workGetLenders() {
  try {
    const lenders = yield call(api.getLenders);
    yield put(getLendersSuccess(lenders));
  } catch (e) {
    yield put(getLendersFailure());
  }
}
function* workAddLenders(action) {
  try {
    const lenders = yield call(api.addLender, action.payload);
    yield put(addLenderSuccess(lenders));
  } catch (e) {
    yield put(addLenderFailure());
  }
}
function* workUpdateLenders(action) {
  try {
    const lenders = yield call(api.updateLender, action.payload);
    yield put(updateLenderSuccess(lenders));
  } catch (e) {
    yield put(updateLenderFailure());
  }
}
export default function* inventorySaga() {
  yield takeEvery("inventory/getMaterialItems", fetchMaterialItemsSaga);
  yield takeEvery("inventory/getLenders", workGetLenders);
  yield takeEvery("inventory/addLender" , workAddLenders);
  yield takeEvery("inventory/updateLender" , workUpdateLenders)
}
