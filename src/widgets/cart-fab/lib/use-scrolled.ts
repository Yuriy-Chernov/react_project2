import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD_PX = 240

function useScrolled(threshold = SCROLL_THRESHOLD_PX) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return scrolled
}

export { useScrolled }
