  import firebase from 'firebase'
  import firestore from 'firebase/firestore'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAv6Y1NLHMgXF9laJUbDdpH-X01mfZ56vY",
    authDomain: "burger-builder-f8213.firebaseapp.com",
    databaseURL: "https://burger-builder-f8213.firebaseio.com",
    projectId: "burger-builder-f8213",
    storageBucket: "burger-builder-f8213.appspot.com",
    messagingSenderId: "281873849256",
    appId: "1:281873849256:web:b52c3b609a092734"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
//   firebaseApp.firestore().settings({ timestampsInSnapshots:true })

  export default firebaseApp.firestore()