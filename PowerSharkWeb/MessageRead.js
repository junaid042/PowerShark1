var app = angular.module('PowerSharkApp', ['ngMaterial']);

app.run(function () {
    // Initialize Firebase with your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyB0jGyi3S9wP7YzyW0izqZyiB5QzjndoUI",
        authDomain: "powershark-809b9.firebaseapp.com",
        projectId: "powershark-809b9",
        storageBucket: "powershark-809b9.appspot.com",
        messagingSenderId: "438565595185",
        appId: "1:438565595185:web:a17d2baf05da90a6f8cd10",
        measurementId: "G-BKDMGEHYL8"
    };
    firebase.initializeApp(firebaseConfig);
});

app.controller('PowerSharkCtrl', function ($scope, $mdToast, $log) {
    // Check user authentication status on page load
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in
            console.log('User authenticated:', user);
            $scope.userAuthenticated = true;
            $scope.$apply();
            // Apply the changes to update the view
            console.log(user.photoURL);
            $scope.Photo = user.photoURL;
        } else {
            // User is signed out
            console.log('User not authenticated');
            $scope.userAuthenticated = false;
            $scope.$apply(); // Apply the changes to update the view
        }
    });

    // Function to open the Firebase login dialog
    $scope.openLoginDialog = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // Handle successful authentication
            var user = result.user;
            console.log('User authenticated:', user);
        }).catch(function (error) {
            // Handle authentication error
            console.error('Authentication error:', error);
        });
    };

    // Function to logout the user
    $scope.logout = function () {
        firebase.auth().signOut().then(function () {
            console.log('User logged out');
        }).catch(function (error) {
            console.error('Logout error:', error);
        });
    };

    Office.onReady(function (info) {
        console.log("js file loaded");
    });
});