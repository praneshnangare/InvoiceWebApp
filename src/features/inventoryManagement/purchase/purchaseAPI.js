import firebase from "firebase/compat/app";
import "firebase/compat/database";

export const getPurchaseItems = async (data) => {
  try {
    // const currentDate = new Date();
    // const currentYear = currentDate.getFullYear();
    // const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    console.log(data);
    const purchaseItemsRef = firebase.database().ref(`purchases/${data.year}/${data.month}`);
    const snapshot = await purchaseItemsRef.get();
    
    if (snapshot.exists()) {
      const purchaseItems = snapshot.val();
      console.log(purchaseItems);
      return purchaseItems;
    } else {
      console.log('No purchase items found');
      return {};
    }
  } catch (error) {
    console.error('Error fetching purchase items:', error);
    throw error;
  }
};

export const addPurchaseItems = async (purchaseItemData) => {
  try {
    const { date } = purchaseItemData;
    const [year, month] = date.split("-");
    const monthStr = String(Number(month));
    const yearRef = firebase.database().ref(`purchases/${year}`);
    const monthRef = yearRef.child(monthStr);

    // Check if the year node exists, if not, create it
    const yearSnapshot = await yearRef.once("value");
    if (!yearSnapshot.exists()) {
      await yearRef.set(true);
    }

    // Check if the month node exists, if not, create it
    const monthSnapshot = await monthRef.once("value");
    if (!monthSnapshot.exists()) {
      await monthRef.set(true);
    }

    // Push the purchase item data to the specific month
    const newPurchaseItemRef = monthRef.push();
    await newPurchaseItemRef.set(purchaseItemData);
    return newPurchaseItemRef.key;
  } catch (error) {
    console.error("Error adding purchase item:", error);
    throw error;
  }
};
