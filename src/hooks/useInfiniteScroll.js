import { useEffect, useRef } from 'react'

export default function useInfiniteScroll({ enabled = true, root = null, rootMargin = '600px', threshold = 0, onLoadMore }) {
	const sentinelRef = useRef(null)
	const hasCalledRef = useRef(false)

	useEffect(() => {
		if (!enabled) return
		const el = sentinelRef.current
		if (!el) return

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					if (!hasCalledRef.current) {
						hasCalledRef.current = true
						onLoadMore?.()
						// allow future calls after brief delay to prevent burst
						setTimeout(() => { hasCalledRef.current = false }, 150)
					}
				}
			}
		}, { root, rootMargin, threshold })

		observer.observe(el)
		return () => observer.disconnect()
	}, [enabled, root, rootMargin, threshold, onLoadMore])

	return { sentinelRef }
}


