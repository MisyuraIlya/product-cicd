<!DOCTYPE html>
<html dir="rtl">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:type" content="article" />
        <title>מ.ר כלים</title>
        <meta name="description" content="מר כלים חד פעמי">
        <meta name="keywords" content="מר כלים" />
        <meta property="og:title" content="מר כלים">
        <meta property="og:description" content="מר כלים חד פעמי">
        <meta property="og:image" content="https://www.digiaws.net/mrkelim_backend/media/logo.png">
        <link rel="icon" href="favicon.ico">
        <link href="/build/main.css" rel="stylesheet">
        <link rel="manifest" href="/manifest.json">

        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-title" content="Mr Kelim">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

    </head>
    <body>
      <div id="root"></div>
      <script type="text/javascript" src="/build/bundle.js"></script>
      <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
      <script>
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
              console.log('ServiceWorker registered with scope:', registration.scope);
            })
            .catch(error => {
              console.error('ServiceWorker registration failed:', error);
            });
        }
      </script>
    </body>
</html>
