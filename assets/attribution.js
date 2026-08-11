/* Vision attribution glue.
 *
 * Tracked links (visionclipping.com/<slug>) land here carrying ?vx_cid=, the
 * click id minted by the link tracker. A visitor browses before booking, so
 * the id is kept in localStorage for 30 days and appended to the booking-form
 * embed whenever they reach /book/ — that is what lets a form submission be
 * traced back to the exact social bio or video the person came from.
 *
 * Does nothing at all for visitors who never arrived through a tracked link.
 */
(function () {
  var KEY = "vx_cid";
  var TS = "vx_cid_at";
  var TTL = 30 * 24 * 3600 * 1000;
  try {
    var p = new URLSearchParams(location.search).get("vx_cid");
    if (p && /^c_[0-9a-f]{8,32}$/i.test(p)) {
      localStorage.setItem(KEY, p);
      localStorage.setItem(TS, String(Date.now()));
    }
    var at = Number(localStorage.getItem(TS) || 0);
    var cid = localStorage.getItem(KEY);
    if (!cid || !at || Date.now() - at > TTL) return;

    var apply = function () {
      var f = document.getElementById("vc-form-booking");
      if (f && f.src && f.src.indexOf("vx_cid=") === -1) {
        f.src += (f.src.indexOf("?") === -1 ? "?" : "&") + "vx_cid=" + encodeURIComponent(cid);
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", apply);
    } else {
      apply();
    }
  } catch (e) { /* attribution must never break the page */ }
})();
