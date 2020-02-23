import handleRequest from "./handleRequest.js";

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request, event))
});


