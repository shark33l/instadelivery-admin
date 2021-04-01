import firebase from'./firebase.js'

const collectionName = "orders"

const db = firebase.firestore();
const ordersRef = db.collection(collectionName)

// Add new Data
const firebaseFunctions = { 
    setTrackingData : async(data, callback) => {
        try {
            await ordersRef.doc(data.invoice).set(data);
            callback(null)
        } catch (error) {
            console.log(error);
            callback(error)
        }
    },
    getAllTrackingData : async() => {
        try {
            const snapshot = await ordersRef.orderBy('invoice','desc').get();
            let response = snapshot.docs.map(doc => doc.data())
            return {error: false, response: response};
        } catch(error){
            console.log(error);
            return {error: true};
        }
    },
    searchTrackingData : async(searchTerm) => {
        const db = firebase.firestore();
        try{
            const snapshot = await db.collection(collectionName).where('invoice', '==', (searchTerm.trim()).toUpperCase()).get();
            let response = snapshot.docs.map(doc => doc.data())
            return {error: false, response: response};
        } catch(error){
            console.log(error);
            return {error: true};
        }
    }
}

export default firebaseFunctions;