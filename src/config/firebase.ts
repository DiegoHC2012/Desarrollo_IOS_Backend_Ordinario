var admin = require("firebase-admin");

var serviceAccount = require("../../ordinario-desarrollomovil-firebase-adminsdk-fbsvc-7df005391a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ordinario-desarrollomovil-default-rtdb.firebaseio.com"
});


export const db = admin. database(); 
export const auth = admin. auth();  
export const firestore = admin. firestore();