import { precacheAndRoute } from "workbox-precaching"

declare const self: ServiceWorkerGlobalScope

// The "self.__WB_MANIFEST" is a special variable that will be
// replaced by Workbox with the list of all your files (pages, css, js...).

precacheAndRoute(self.__WB_MANIFEST || [])
