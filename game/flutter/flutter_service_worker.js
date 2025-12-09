'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "da722092259503d971befdc6f0300a16",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"index.html": "526ba83580c003beff2f2f523d3fa017",
"/": "526ba83580c003beff2f2f523d3fa017",
"assets/fonts/MaterialIcons-Regular.otf": "8adc7cae7e6bc3ef6aa4f92be154e39c",
"assets/AssetManifest.bin": "20c1cfba6c6b60a18a30c38bee926f72",
"assets/AssetManifest.bin.json": "f14af5803de1a1df4672e44affa5d709",
"assets/assets/npc/9401963/Inosuke_01.png": "6fe31643b6abb6db09f4d509b0f3f8f2",
"assets/assets/npc/9401963/Inosuke_00.png": "2286380460b74cbc698c2a91725deee1",
"assets/assets/npc/9401963/stand_0.png": "b2d17f15ba79518e03cc4a071fc242ec",
"assets/assets/npc/9401963/Inosuke_02.png": "375aa2a2061f1a6bc99000c619aa048d",
"assets/assets/npc/9401962/eye_1.png": "ef5c0dcf5461e0bd4439bbae21163fe2",
"assets/assets/npc/9401962/Kanao_01.png": "5d86af4df5aeb2f59da258c151723521",
"assets/assets/npc/9401962/Kanao_00.png": "37d9a4033ecdc0b72088fb7aae13fe7a",
"assets/assets/npc/9401962/eye_0.png": "0bac627febbc19e495ff9e855a2361e2",
"assets/assets/npc/9401962/eye_3.png": "d28c35f27f4aed1d7fb25e58b96d78f9",
"assets/assets/npc/9401962/stand_0.png": "0bac627febbc19e495ff9e855a2361e2",
"assets/assets/npc/9401962/eye_2.png": "8943239964f73c3e2d5be9ca2049db33",
"assets/assets/npc/9401962/Kanao_03.png": "5d86af4df5aeb2f59da258c151723521",
"assets/assets/npc/9401962/Kanao_02.png": "0664c50c0dfbcb3ad8b11380658ac8ae",
"assets/assets/npc/9401962/eye_4.png": "0bac627febbc19e495ff9e855a2361e2",
"assets/assets/npc/9401960/Nezuko_00.png": "a7b8c9e59d41dd9de0e06c7b7145f5d3",
"assets/assets/npc/9401960/eye_1.png": "3b8ad90928f6219f934727997b7bfa08",
"assets/assets/npc/9401960/eye_0.png": "2fd377297581ab7af80b85c697039ec0",
"assets/assets/npc/9401960/eye_3.png": "27968812bb40d9b5c6e259c4b62bc534",
"assets/assets/npc/9401960/Nezuko_03.png": "be5bdd78042ba5d664178bc8b85d1b57",
"assets/assets/npc/9401960/stand_0.png": "385c04f7cb486e72ad9b0b2c2a07d137",
"assets/assets/npc/9401960/eye_2.png": "5c1c6a63392561ed2913d2e5d60938d7",
"assets/assets/npc/9401960/Nezuko_01.png": "be5bdd78042ba5d664178bc8b85d1b57",
"assets/assets/npc/9401960/eye_4.png": "2fd377297581ab7af80b85c697039ec0",
"assets/assets/npc/9401960/Nezuko_02.png": "e54eed2aaa52d402b62e7885e1725260",
"assets/assets/npc/9401960.json": "bd1a9590cd21bbd905129db3cfc0d944",
"assets/assets/npc/9401961/eye_1.png": "1b2afa748840b8ea02e2c1619c0936cf",
"assets/assets/npc/9401961/eye_0.png": "94cb64ea0b4e9e0e69c9525dc35bd2d4",
"assets/assets/npc/9401961/eye_3.png": "2e8293a6ea29e32b9aa21f944abed4a6",
"assets/assets/npc/9401961/Zenitsu_00.png": "2f9d512036fd226aba3b8f84bc013ed1",
"assets/assets/npc/9401961/Zenitsu_02.png": "bad83301d2b78d0fb24e7872833410ca",
"assets/assets/npc/9401961/stand_0.png": "c66c6700882f07b4a5cd3d8eb9551c78",
"assets/assets/npc/9401961/eye_2.png": "d6dfc3fd0ec055b303dcaaa78e0df2c5",
"assets/assets/npc/9401961/Zenitsu_01.png": "3d63412044e66bda244ae5784c8ab55d",
"assets/assets/npc/9401961/eye_4.png": "94cb64ea0b4e9e0e69c9525dc35bd2d4",
"assets/assets/npc/9401963.json": "01ac247ed83f16bd362703c253d53c15",
"assets/assets/npc/9401961.json": "32142d23b90b14d0745cca65b1d950f9",
"assets/assets/npc/9401962.json": "95f734fde0ec82d55f4671c1bf8093e4",
"assets/assets/back/back_0.png": "c5e7ad3806b846e397c9af849673336f",
"assets/assets/mob/9833843.json": "386329b73e44502f4029eae78df287b7",
"assets/assets/mob/5120503.json": "47d95608db09b154f705b3b5068865da",
"assets/assets/mob/1541175.json": "3643ea80193d3ce1d458d34029da2644",
"assets/assets/mob/5120504.json": "1640fd3c9adb8d4852f63fe2119d2803",
"assets/assets/mob/7130602.json": "2d64d45e23e3864b185e74c5d8af4ab8",
"assets/assets/mob/8147001.json": "890016a7b9cebe7ca8984913ef7ed17c",
"assets/assets/mob/9833842.json": "386329b73e44502f4029eae78df287b7",
"assets/assets/mob/5120504/die1_0.png": "2076c268218fbf091701df3916d290af",
"assets/assets/mob/5120504/die1_1.png": "031ed367c69437ee33844a71cba81aac",
"assets/assets/mob/5120504/stand_1.png": "c21492d8cb5b4b56a7faee07d402d9ac",
"assets/assets/mob/5120504/stand_2.png": "8fc5ad5c0095f16aae7a47187659d8fe",
"assets/assets/mob/5120504/move_4.png": "73a3575944ebb0c017bf3de2c6ef427b",
"assets/assets/mob/5120504/move_0.png": "acf0f1f21c5edeb912c414b1bf76ae50",
"assets/assets/mob/5120504/stand_5.png": "4610e3d95e1277e3ed8ee9c2f3f86362",
"assets/assets/mob/5120504/stand_4.png": "cec4449795f76700b35004361581a406",
"assets/assets/mob/5120504/stand_0.png": "e7b9f2a8a2700a2d7a19fbe9f79382f8",
"assets/assets/mob/5120504/move_2.png": "facfb1b15f7c7cf55927171741e5fdfd",
"assets/assets/mob/5120504/die1_5.png": "5ba500024681548600405426c5b9f7fb",
"assets/assets/mob/5120504/die1_4.png": "c4ff6243e63d86f203e4934ab12dc321",
"assets/assets/mob/5120504/move_3.png": "5dbc48dde0de85b08f71e07d042a7365",
"assets/assets/mob/5120504/move_5.png": "e76b8a44af940e464c30a08bb067f99f",
"assets/assets/mob/5120504/die1_2.png": "1a347b6f432e43270c126b7485aa999c",
"assets/assets/mob/5120504/stand_3.png": "d9f225ccb4c8fea63eda8260b75e0fc2",
"assets/assets/mob/5120504/move_1.png": "1a241a5efcab2ac91cfec2584d4a6c9a",
"assets/assets/mob/5120504/die1_3.png": "704879ca7fc6788e89a14f288252ff4e",
"assets/assets/mob/5120504/hit1_0.png": "0d68c13a1dce5262f67cbd0db06438d4",
"assets/assets/mob/9833844.json": "386329b73e44502f4029eae78df287b7",
"assets/assets/mob/9300027.json": "a1e15111be7a95bad4e76582e9f02bf2",
"assets/assets/mob/9001007.json": "855407761c8db01f8f58896ea108ffdb",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "151b0bacf84aaf6bbb1b0550962540f9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/AssetManifest.json": "7ffbe9932f6e3ffa31482198bc25eec1",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"manifest.json": "1c26cff2fabef77b28a5f94cbe910414",
"main.dart.js": "a35b926850a8645c2ced30c736e9be74",
"flutter_bootstrap.js": "4e52de7c4b0843d74f7a5b0105a06c55",
"favicon.png": "5dcef449791fa27946b3d35ad8803796"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
