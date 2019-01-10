// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebase_keys: {
    apiKey: 'AIzaSyBsw-ZKfX2TIH_ZnT1xoRuWMfwTBSMvmUE',
    authDomain: 'thenotes-7b9ac.firebaseapp.com',
    databaseURL: 'https://thenotes-7b9ac.firebaseio.com',
    projectId: 'thenotes-7b9ac',
    storageBucket: 'thenotes-7b9ac.appspot.com',
    messagingSenderId: '302375682314'
  },

  default_notes: [
    {
      heading: 'My first note',
      content: 'Notes that are generated',
      tags: ['TheNote', 'Startup'],
    },
    {
      heading: 'Second note in the app',
      content: 'Try all the features that the app provide for you',
      tags: ['Startup', 'Features'],
    },
    {
      heading: 'Note creation',
      content: 'You can create new note by clicking the + button',
      tags: ['Startup', 'tutorial']
    },
    {
      heading: 'Modify notes',
      content: 'You can modify the content of the notes by clicking on them',
      tags: ['Startup', 'tutorial']
    },
    {
      heading: 'Tags',
      content: `You can assign tags to notes in the edit view, try it by adding tags to this note.
        You can later filter notes based on the tag.`,
      tags: []
    }
  ],

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
