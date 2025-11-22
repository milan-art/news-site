import React from 'react'

function openShareWindow(url) {
	const w = 600
	const h = 520
	const y = window.top.outerHeight / 2 + window.top.screenY - ( h / 2)
	const x = window.top.outerWidth / 2 + window.top.screenX - ( w / 2)
	window.open(url, '_blank', `popup=yes,width=${w},height=${h},top=${y},left=${x}`)
}

export default function SocialShare({ url, title }) {
	const encodedUrl = encodeURIComponent(url)
	const encodedTitle = encodeURIComponent(title)
	const twitter = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
	const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
	const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

	const share = async () => {
		if (navigator.share) {
			try {
				await navigator.share({ url, title })
			} catch {}
			return
		}
		openShareWindow(twitter)
	}

	return (
		<div className="share">
			<button className="btn ghost" onClick={share} aria-label="Share">↗</button>
			<div className="share-list" role="group" aria-label="Share to">
				<button className="btn ghost" aria-label="Share on Twitter" onClick={() => openShareWindow(twitter)}>𝕏</button>
				<button className="btn ghost" aria-label="Share on Facebook" onClick={() => openShareWindow(facebook)}>f</button>
				<button className="btn ghost" aria-label="Share on LinkedIn" onClick={() => openShareWindow(linkedin)}>in</button>
			</div>
		</div>
	)
}


