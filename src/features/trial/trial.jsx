import MainLayout from './../../components/MainLayout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Button from '../../components/Button';

const firebaseConfig = {
  apiKey: "AIzaSyASjytXBD7oy-7P-6h4vS37rTyOIFEtMTo",
  authDomain: "praneshenterprises.firebaseapp.com",
  databaseURL: "https://praneshenterprises-default-rtdb.firebaseio.com",
  projectId: "praneshenterprises",
  storageBucket: "praneshenterprises.appspot.com",
  messagingSenderId: "106800480963",
  appId: "1:106800480963:web:cb31db41160bbb8fbed876",
  measurementId: "G-TS2PP2VBFP"
};
firebase.initializeApp(firebaseConfig)
const Trial = () => {
  const handleClick  = () => {
    const database = firebase.database();
    const dataRef = database.ref('purchaseItems'); // Replace 'data' with the desired location in the database

    // Set the value of the reference to the data
    // dataRef.push({
    //   name: 'John',
    //   age: 25,
    //   email: 'john@example.com',
    //   life: ["one", "two", "three"]
    // });
    dataRef.get().then((snapshot) => {
      if(snapshot.exists()){
        const purchaseItems = snapshot.val();
        console.log(purchaseItems);
      } else {
        console.log("no items");
      }
    }).catch((error) => {
      console.error(error);
    })

  } 
  const rightComponent =  (
    
      <>
        <Button onClick={handleClick}>Hello there</Button>
        <Button
        variant="contained"
        color="success"
        size="large"
        label="Login with Google"
        loading={false}
        onClick={handleClick}
      ></Button>
      </>
    )
  
  return <>
  <MainLayout rightComponent = {rightComponent} ></MainLayout>
  </>
}

export default Trial;