"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("../../ordinario-desarrollomovil-firebase-adminsdk-fbsvc-7df005391a.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ordinario-desarrollomovil-default-rtdb.firebaseio.com"
});
exports.db = admin.firestore();
