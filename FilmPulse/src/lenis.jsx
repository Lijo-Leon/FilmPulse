import Lenis from '@studio-freight/lenis'

let lenis

if (!window.__lenis__) {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smooth: true,
    smoothTouch: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  window.__lenis__ = lenis
} else {
  lenis = window.__lenis__
}

export default lenis
