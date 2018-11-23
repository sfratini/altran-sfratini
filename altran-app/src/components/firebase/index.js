import app from "firebase/app"

  var config = {
    apiKey: "AIzaSyC3wCRYInD0IaPJf4Ogv6ZCG_krdeKNARA",
    authDomain: "altran-sfratini.firebaseapp.com",
    databaseURL: "https://altran-sfratini.firebaseio.com",
    projectId: "altran-sfratini",
    storageBucket: "altran-sfratini.appspot.com",
    messagingSenderId: "78769286837"
  };

  
  class Firebase {
    constructor() {
      app.initializeApp(config);
    }
  }
  
  export default Firebase;