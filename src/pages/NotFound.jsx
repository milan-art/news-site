import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<main className="detail-main">
			<section className="detail-section article-not-found">
				<h1>Page not found</h1>
				<p className="muted">The page you are looking for might have been removed or is temporarily unavailable.</p>
				<Link className="btn solid" to="/">Go back home</Link>
			</section>
		</main>
	)
}


