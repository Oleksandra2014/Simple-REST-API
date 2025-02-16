const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://simple-rest-api-257ec-default-rtdb.firebaseio.com"
  }); 

const db = admin.firestore();
const User = db.collection('Users'); 
const Expenses = db.collection('Expenses'); 
const Income = db.collection('Income');

module.exports = { db, User, Expenses, Income };

