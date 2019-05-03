// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  firebase: {
    apiKey: 'AIzaSyBtdo1IYCf5N8fhxeX8fp7gGrwpojBYR_Y',
    authDomain: 'cathedra-is-website.firebaseapp.com',
    databaseURL: 'https://cathedra-is-website.firebaseio.com',
    projectId: 'cathedra-is-website',
    storageBucket: 'cathedra-is-website.appspot.com',
    messagingSenderId: '305082275656'
  }
  /*   firebase: {
    apiKey: 'AIzaSyCb_aUvYONsuu5el8StsI5ceY--04Vpq2w',
    authDomain: 'kib-website-test.firebaseapp.com',
    databaseURL: 'https://kib-website-test.firebaseio.com',
    projectId: 'kib-website-test',
    storageBucket: 'kib-website-test.appspot.com',
    messagingSenderId: '167427981230'
  } */
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
