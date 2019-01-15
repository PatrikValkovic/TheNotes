export const environment = {
  production: true,

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
      heading: 'Welcome',
      content: 'Welcome in the TheNotes application. We are happy to see you here.',
      tags: ['TheNotes', 'Welcome'],
    },
    {
      heading: 'Notes creation',
      content: 'You can create new notes by clicking "Create note" on the top.',
      tags: ['TheNotes', 'Startup', 'Tutorial'],
    },
    {
      heading: 'Notes modification',
      content: 'You can modify existing notes by simply clicking on them. The window for editing will open for you.',
      tags: ['TheNotes', 'Startup', 'Tutorial'],
    },
    {
      heading: 'Tags',
      content: 'You can assign multiple tags to every note. You can later filter the notes based on the tag combination.',
      tags: ['TheNotes', 'Startup', 'Tutorial'],
    },
    {
      heading: 'Filtering',
      content: 'You can filter based on the content of the notes. The search bar on the top shows you only notes with specific content. You can also use tags to filter only notes with specific tag. The tag selection is on the right. You can hide this by clicking on the menu button on the left top corner.',
      tags: ['TheNotes', 'Startup', 'Tutorial'],
    },
    {
      heading: 'Creation of the app',
      content: 'The application was created to practise Angular framework. The application uses Firebase as the backend service. You can find source codes here: https://github.com/PatrikValkovic/TheNotes.',
      tags: ['TheNotes', 'History'],
    },
  ]
};
