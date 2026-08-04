export function navigate(path: string) {
  if (window.location.pathname === path) {
    return;
  }

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("app:navigate"));
  window.scrollTo({ top: 0, behavior: "auto" });
}
