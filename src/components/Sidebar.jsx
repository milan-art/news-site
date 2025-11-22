import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AdBanner from './AdBanner.jsx'
import { getImageUrl } from '../utils/articleHelpers.js'

export default function Sidebar({ articles }) {
	const popular = useMemo(() => {
		return [...articles].sort((a, b) => {
			// Sort by viewCount first, then popularity if available
			const viewsA = a.viewCount || 0
			const viewsB = b.viewCount || 0
			if (viewsA !== viewsB) return viewsB - viewsA
			return (b.popularity || 0) - (a.popularity || 0)
		}).slice(0, 6)
	}, [articles])

	return (
		<div className="sidebar-inner">
			<section aria-label="Popular stories" className="sidebar-card">
				<h3 className="sidebar-title">Popular</h3>
				<ol className="popular-list">
					{popular.map(a => (
						<li key={a.id}>
							<Link to={`/article/${a.id}`} className="popular-item">
								<img src={getImageUrl(a) || a.thumbUrl} alt={a.imageAlt || a.title} loading="lazy" />
								<span>{a.title}</span>
							</Link>
						</li>
					))}
				</ol>
			</section>
			<AdBanner size="rect" />
			<section aria-label="Newsletter" className="sidebar-card">
				<h3 className="sidebar-title">Newsletter</h3>
				<p className="muted">Get the top stories in your inbox.</p>
				<form onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="newsletter-email" className="sr-only">Email</label>
					<input id="newsletter-email" type="email" placeholder="you@example.com" required />
					<button className="btn solid" type="submit">Subscribe</button>
				</form>
			</section>
			<AdBanner size="wide" />
		</div>
	)
}


