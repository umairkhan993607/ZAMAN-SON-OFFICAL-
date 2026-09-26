// Paste your Firebase Web App config here.
const firebaseConfig={apiKey:"PASTE_YOUR_API_KEY",authDomain:"PASTE_YOUR_PROJECT.firebaseapp.com",projectId:"PASTE_YOUR_PROJECT_ID",storageBucket:"PASTE_YOUR_STORAGE_BUCKET",messagingSenderId:"PASTE_YOUR_SENDER_ID",appId:"PASTE_YOUR_APP_ID"};
firebase.initializeApp(firebaseConfig); const db=firebase.firestore(), auth=firebase.auth(), storage=firebase.storage();
