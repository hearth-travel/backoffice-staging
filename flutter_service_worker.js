'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "41b052722128f6c06259167929670186",
"favicon.ico": "9e459b35230283f1362af3fe8cfaf128",
"index.html": "efd57855c6decb5509d1ca687ccf41b6",
"/": "efd57855c6decb5509d1ca687ccf41b6",
"main.dart.js": "e1b0ac8ac94c9b6e487d7c4eb3f3e91b",
"img/hearth.svg": "f4a1f2f7d949b073afbe802e7c1631f3",
"img/logo.svg": "ec9d1b83f2283db1aef7ac0358432780",
"icons/favicon.ico": "9e459b35230283f1362af3fe8cfaf128",
"icons/Icon-192.png": "8085f8f653c0c5074d58e37f6862a9b7",
"icons/Icon-512.png": "538b426dcfbad76c5175a72e1c3c12df",
"style.css": "8e0a9d7a5c6b469756337fbc40c9f281",
"manifest.json": "b603afd30978295fcebd73950138ab69",
"assets/AssetManifest.json": "6dde5686ba6ee9aad0dfed0ca7e12e6f",
"assets/NOTICES": "b74f2894daa286e317235e19d174a8e1",
"assets/FontManifest.json": "168955920fc8e7fc185a7134c070b0f8",
"assets/fonts/Albra-Light.otf": "15223dc94787e4ad0193eaffcf3097a6",
"assets/fonts/Albra-Bold.otf": "2661e59a174c43400cecb47a7fbb1194",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/assets/frontimg/frontimg-14.jpg": "e3f9af6de9aa71c298b10ce8de4b1552",
"assets/assets/frontimg/frontimg-13.jpg": "4352cf8f35c586ff2d9f5ef8409c4278",
"assets/assets/frontimg/frontimg-12.jpg": "6d8b2783de2fc9c7fc7a36ff203d9e4f",
"assets/assets/frontimg/frontimg-10.jpg": "381420d682142e4c601c7227374dd0f3",
"assets/assets/frontimg/frontimg-11.jpg": "483a1e6c727be29ac33d2b8cc654d276",
"assets/assets/frontimg/frontimg-9.jpg": "a87a4f281d6c15e3ad7e709bb5818451",
"assets/assets/frontimg/frontimg-8.jpg": "9da7567770f0dfa701e8a1fa08369dcc",
"assets/assets/frontimg/frontimg-3.jpg": "6cc0c373c68be96f58528723665fac9e",
"assets/assets/frontimg/frontimg-2.jpg": "2b90047b48a5443ee0bff59996be292b",
"assets/assets/frontimg/frontimg-1.jpg": "3d23253426f5ef1a7c11ffbf1163cb69",
"assets/assets/frontimg/frontimg-5.jpg": "74424223c149c505c7a5eb9eadd9bf07",
"assets/assets/frontimg/frontimg-4.jpg": "6b32e97c4f8b989a82a56fd6dfc89ace",
"assets/assets/frontimg/frontimg-6.jpg": "f07e5d7bb1645b4eb39d03712bb42d4d",
"assets/assets/frontimg/frontimg-7.jpg": "b252e7478002928b6b77ee18134a437d",
"assets/assets/hearth.svg": "e1d345c91832fd8230dd752ffbf1a25d",
"assets/assets/group.svg": "85b8b8f5ce7a7da72253496eaa4ed298",
"assets/assets/avatar_promoter/avatar4.jpg": "42771d25b8896bbe96b0b4e0c3a5e592",
"assets/assets/avatar_promoter/avatar3.jpg": "369bf78f98f773af6c9784a8029df4c4",
"assets/assets/avatar_promoter/avatar2.jpg": "be9f09779d5ccb0414954db2236c01cb",
"assets/assets/avatar_promoter/avatar0.jpg": "4c65a516a69b081432934a986e571fdb",
"assets/assets/avatar_promoter/avatar1.jpg": "86f78f8581261312b76f1ce7af3a9811",
"assets/assets/plus.svg": "1d74d02e410c19211bcf5fda0b4d7ffa",
"assets/assets/img/invite_banner.jpg": "50020d43b1e6cf8609abc8054b0936ce",
"assets/assets/img/textbusiness_banner.png": "5834e8db351895daad2809d4a09ec8e9",
"assets/assets/img/poi_bg.jpg": "1c264b775f7d6734c8288a3905fbaf0c",
"assets/assets/img/banner_inivite_ver.jpg": "5ea087a284600c8c8dff862a514cf578",
"assets/assets/img/business_banner.jpg": "5b6fcea095bebed91c00b82c2a3bccd5",
"assets/assets/single.svg": "135c4fb97031515fb54a9f2938c4e794",
"assets/assets/logo.svg": "ec9d1b83f2283db1aef7ac0358432780",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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