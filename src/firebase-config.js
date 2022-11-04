import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyAuQAi1FfoDrtUMMt69ZBtTffev4Fr4fFQ",
  
    authDomain: "movie-app-2104b.firebaseapp.com",
  
    projectId: "movie-app-2104b",
  
    storageBucket: "movie-app-2104b.appspot.com",
  
    messagingSenderId: "900565361271",
  
    appId: "1:900565361271:web:26d59d5909a5a2ad5adc72",
  
    measurementId: "G-KERPC7QCX5"
  
  };
  
  const app = initializeApp(firebaseConfig);
  export const auth =getAuth(app)