import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

firebase.initializeApp(firebaseConfig);

const FirebaseContext = createContext({
  database: null,
});

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = (props) => {
  const database = firebase.database();
  return (
    <FirebaseContext.Provider value={{ database }}>
      {props.children ?? <Outlet />}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
