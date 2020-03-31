/* eslint-disable */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({ modulePathPrefix: 'workbox-v5.1.2' });

const precacheManifest = [];

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
/* eslint-enable */
