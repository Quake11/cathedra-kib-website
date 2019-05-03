importScripts('https://www.gstatic.com/firebasejs/5.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.1/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '305082275656'
});

const messaging = firebase.messaging();
