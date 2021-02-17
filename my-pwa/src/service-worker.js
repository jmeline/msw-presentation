/* eslint-disable no-restricted-globals */

const ignored = self.__WB_MANIFEST;

/*
 * ************************
 *  Custom service worker
 * ************************
 */

self.addEventListener("install", (event) => {
  // caching 
  console.log(`****Inside the install handler: ${event} *****`);
});

self.addEventListener("activate", (event) => {
  // update caching, if needed
  console.log(`****Inside the activate handler: ${event} *****`);
});

const fetchCats = async (x, y) => {
  console.log(`Responding with: CATS!!! https://placekitten.com/${x}/${y}`);
  return await fetch(`https://placekitten.com/${x}/${y}`, { mode: "no-cors" });
};

// listeners must run synchronously!
self.addEventListener("fetch", (event) => {
  console.log(`Intercepting ${event.request.method} to ${event.request.url}`);
  /* Evil cat people taking over... */
  if (/place-puppy/.test(event.request.url)) {
    const match = event.request.url.match(/(\d+)x(\d+)/);

    // adjust response. Perhaps pull data from the cache and return it?
    event.respondWith(fetchCats(match[1], match[2]));
  }
});
