import React from 'react'

export default function AdBanner({ size = 'rect', label = 'Advertisement' }) {
	return (
		<div className={`ad ad-${size}`} role="complementary" aria-label={label} tabIndex={0}>
			<div className="ad-inner">
				<span className="muted">{label}</span>
			</div>
		</div>
	)
}


