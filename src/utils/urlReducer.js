export default function urlRecucer(url) {
  if (!url) return;
  if (url <= 15) {
    return url;
  }

  return url.substring(0, 10).concat("...").concat(url.slice(-8));
}
