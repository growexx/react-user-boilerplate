Boilerplate supports firebase cloud messaging setup. 

To support firebase cloud messaging, following are the steps taken. 

1. Changes in **app.js** file
- Added following line in import
***import 'file-loader?name=firebase-messaging-sw.js!./firebase-messaging-sw';***
- Added following line at the end of the file.
***require('offline-plugin/runtime').install();***

2. Added one service worker file named ***firebase-messaging-sw.js*** in the app folder. (  app/firebase-messaging-sw.js )
3. Caching and service worker related changes in ***webpack.dev.babel.js*** for support of service worker in boilerplate.

    **new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',
      safeToUseOptionalCaches: true,
      ServiceWorker: {
        events: true,
        entry: path.join(process.cwd(), 'app/firebase-messaging-sw.js'),
      },
      excludes: ['.htaccess'],
      caches: {},
    })**

4. Firebase util file with messaging support. ( app/utils/firebase.js )

