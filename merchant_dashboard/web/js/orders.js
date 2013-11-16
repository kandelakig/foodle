// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
  "baseUrl": "js/app",
  "paths": {
    "lib": "../lib",
    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
    "azure": "https://ffu.azure-mobile.net/client/MobileServices.Web-1.0.0.min"
  }
});

// Load the main app module to start the app
requirejs(['main']);