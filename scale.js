// Scales each fixed 1080x1350 page to fit its frame on screen.
(function () {
  var PAGE_W = 1080;
  var frames = document.querySelectorAll('.page-frame');
  function fit(frame) {
    frame.style.setProperty('--s', frame.clientWidth / PAGE_W);
  }
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (e) { fit(e.target); });
    });
    frames.forEach(function (f) { ro.observe(f); });
  } else {
    var all = function () { frames.forEach(fit); };
    window.addEventListener('resize', all);
    all();
  }
})();
