import purchaseReducer from "../features/inventoryManagement/purchase/purchaseSlice";
import inventoryReducer from './../features/inventoryManagement/inventory/inventorySlice';
import toastBannerReducer from './../features/toastBanner/toastBannerSlice';
export default {
  purchase: purchaseReducer,
  inventory: inventoryReducer,
  toastBanner: toastBannerReducer,
};