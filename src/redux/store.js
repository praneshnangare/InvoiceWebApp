import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export default configureStore(
  {
    reducer: rootReducer,
    middleware: [sagaMiddleware]
  }
);

sagaMiddleware.run(rootSaga);
