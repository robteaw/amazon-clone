var firebaseConfig = {
  apiKey: "AIzaSyDt6CTWdEQ5ZwFkqJgbrK8TFFIp45Trbt0",
  authDomain: "clone-9353b.firebaseapp.com",
  projectId: "clone-9353b",
  storageBucket: "clone-9353b.appspot.com",
  messagingSenderId: "220684796067",
  appId: "1:220684796067:web:f5cabb0d3195505d07ff16",
  measurementId: "G-G260QW5G98",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();
