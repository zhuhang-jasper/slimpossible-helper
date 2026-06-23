// Open Lark/Larksuite links in the native app on mobile, with a safe fallback.
//
// Lark's AppLink (https://applink.larksuite.com/client/docs/open) opens the native
// app — BUT when the app isn't installed it shows a "download Lark" page instead of
// the content. So we can't just point the href at the applink.
//
// Instead: the <a> keeps the REAL doc URL as its href (so no-JS users, desktop, and
// phones without Lark all get the actual content). On mobile we intercept the click,
// fire the applink to try the app, and let the browser continue to the real URL as
// the fallback. If the app DOES take over, the page is backgrounded before the
// fallback matters, so the user lands in the app.
//
// Docs: https://open.larksuite.com/document/.../applink-protocol/supported-protocol/open-docs
const APPLINK = "https://applink.larksuite.com/client/docs/open";

const isMobile = () =>
  typeof navigator !== "undefined" && /android|iphone|ipad|ipod/i.test(navigator.userAgent);

// onClick handler for a Lark link. On mobile it nudges the native app open via the
// applink while leaving the anchor's normal navigation (to the real URL) intact as
// the fallback. On desktop it does nothing — the plain href opens as usual.
export function openLarkApp(url) {
  if (!url || !isMobile()) {
    return;
  }
  const applink = `${APPLINK}?URL=${encodeURIComponent(url)}`;
  // Fire the applink in a hidden iframe so it can try to hand off to the app without
  // navigating this page away from the real-URL fallback the <a> is already loading.
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = applink;
  document.body.appendChild(iframe);
  setTimeout(() => iframe.remove(), 1500);
}
