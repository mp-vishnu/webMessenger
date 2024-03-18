import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCoigZFIhVB14ZKbF0JsTfY7Wl0aMg9UpU",
    authDomain: "web-messenger-a7f66.firebaseapp.com",
    projectId: "web-messenger-a7f66",
    storageBucket: "web-messenger-a7f66.appspot.com",
    messagingSenderId: "759362828019",
    appId: "1:759362828019:web:6eb8a50ea5486f3934a986"
  };
  
  const app=initializeApp(firebaseConfig);

  export default app;