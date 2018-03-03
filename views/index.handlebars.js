<!doctype html>
<html>
  <head>
    <title>Kronic</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Be a Programmer helps connects experienced volunteer programming mentors with people who want to become professional programmers" />
    <link rel="apple-touch-icon" sizes="57x57" href="/public/apple-icon-57x57.png?v=2">
    <link rel="apple-touch-icon" sizes="60x60" href="/public/apple-icon-60x60.png?v=2">
    <link rel="apple-touch-icon" sizes="72x72" href="/public/apple-icon-72x72.png?v=2">
    <link rel="apple-touch-icon" sizes="76x76" href="/public/apple-icon-76x76.png?v=2">
    <link rel="apple-touch-icon" sizes="114x114" href="/public/apple-icon-114x114.png?v=2">
    <link rel="apple-touch-icon" sizes="120x120" href="/public/apple-icon-120x120.png?v=2">
    <link rel="apple-touch-icon" sizes="144x144" href="/public/apple-icon-144x144.png?v=2">
    <link rel="apple-touch-icon" sizes="152x152" href="/public/apple-icon-152x152.png?v=2">
    <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-icon-180x180.png?v=2">
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png?v=2">
    <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png?v=2">
    <link rel="icon" type="image/png" sizes="96x96" href="/public/favicon-96x96.png?v=2">
    <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png?v=2">
    <link rel="manifest" href="/public/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/public/ms-icon-144x144.png?v=2">
    <meta name="theme-color" content="#ffffff">
        <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-106567509-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-106567509-1');
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script src="/dist/{{vendor}}"></script>
    <script src="/dist/{{app}}"></script>
    <script>
      //navigator.serviceWorker.getRegistrations().then(function(registrations) {
      //  for(let registration of registrations) {
      //  registration.unregister()
      // } })
      // Let's register our serviceworker
       navigator.serviceWorker.register('sw.js', {
        // The scope cannot be parent to the script url
        scope: './'
       });
      
    </script>
  </body>
</html>