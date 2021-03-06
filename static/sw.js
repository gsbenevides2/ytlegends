/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "favicon.ico",
    "revision": "75beccdf3d6ee180e58c9aed74e09b53"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "6a097e229a9555d52dcee6aab9d44773"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "87d41d344c550654caf48caafc8915cd"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "c77db3070db6c18e7c9af79f1b4f7c6f"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "6d9136ac96590519c95da63e18f345fb"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "1bf7335edb027532f6efa8d2bd05f06b"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "cc59e50ffe1ec538fde83c0e907e5b47"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "7994b76a109ff55acc92afc63d2182ef"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "60ac2808c76162dbd952ae9fe8b6da5c"
  },
  {
    "url": "index.html",
    "revision": "763d936b7fad02cb00fbe523abf12cc8"
  },
  {
    "url": "manifest.json",
    "revision": "06cfead53820aab655b523b1cce2abf6"
  },
  {
    "url": "scripts.js",
    "revision": "7f8e78b4b359da8bebe1e65aae8987fd"
  },
  {
    "url": "styles.css",
    "revision": "dea278caec44dfda8f0d393cf27b006c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
