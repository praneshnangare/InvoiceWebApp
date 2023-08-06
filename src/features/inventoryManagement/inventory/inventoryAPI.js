import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export const getMaterialItems = async () => {
  try {
    const materialItemsRef = firebase.database().ref('materials');
    const snapshot = await materialItemsRef.get();
    if (snapshot.exists()) {
      const materialItems = snapshot.val();
      console.log("materials are " );
      console.log(materialItems)
      return materialItems;
    } else {
      console.log('No purchase items found');
      return {};
    }
  } catch (error) {
    console.error('Error fetching purchase items:', error);
    throw error;
  }
};
export const getLenders = async () => {
  try {
    const lendersRef = firebase.database().ref("lenders");
    const snapshot = await lendersRef.get();
    if (snapshot.exists()) {
      const lenders = snapshot.val();
      console.log(lenders);
      return lenders;
    } else {
      console.log("No lenders found");
      return {};
    }
  } catch (error) {
    console.error("Error fetching lenders:", error);
    throw error;
  }
};
export const addLender = async (payload) => {
  try {
    const { lender, ...rest } = payload;
    const lendersRef = firebase.database().ref("lenders");
    const newLenderRef = lendersRef.child(lender); // Use lenderlender as the key
    await newLenderRef.set(rest); // Set the lended amount as the value
    return lender;
  } catch (error) {
    console.error("Error adding lender:", error);
    throw error;
  }
};
export const updateLender = async (payload) => {
  try {
    const lenderRef = firebase.database().ref("lenders").child(payload.lender);
    await lenderRef.set(payload.lenderData);
  } catch (error) {
    console.error("Error updating lender:", error);
    throw error;
  }
};
