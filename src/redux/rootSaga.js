import { all } from "@redux-saga/core/effects";
import purchaseSaga from "../features/inventoryManagement/purchase/purchaseSaga";
import inventorySaga from '../features/inventoryManagement/inventory/inventorySaga';

export default function* rootSaga() {
  yield all([
    purchaseSaga(),
    inventorySaga(),
  ]);
}