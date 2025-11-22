import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { getCategoryName, getImageUrl, getSummary } from '../utils/articleHelpers.js'

export default function Hero({ articles, isLoading }) {
	const scrollerRef = useRef(null)

	const scrollBy = (dir) => {
		const el = scrollerRef.current
		if (!el) return
		const amount = el.clientWidth * 0.9
		el.scrollBy({ left: dir * amount, behavior: 'smooth' })
	}

	if (isLoading) {
		return (
			<section className="hero" aria-label="Trending stories">
				<div className="hero-controls container">
					<h2 className="section-title">Trending</h2>
				</div>
				<div className="hero-track">
					<div className="hero-loading" style={{ padding: '2rem', textAlign: 'center' }}>
						<p className="muted">Loading trending stories...</p>
					</div>
				</div>
			</section>
		)
	}

	if (!articles || articles.length === 0) {
		return (
			<section className="hero" aria-label="Trending stories">
				<div className="hero-controls container">
					<h2 className="section-title">Trending</h2>
				</div>
				<div className="hero-track">
					<div className="hero-empty" style={{ padding: '2rem', textAlign: 'center' }}>
						<p className="muted">No trending stories available.</p>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className="hero" aria-label="Trending stories">
			<div className="hero-controls container">
				<h2 className="section-title">Trending</h2>
				<div className="hero-nav">
					<button className="btn ghost" onClick={() => scrollBy(-1)} aria-label="Previous">
						←
					</button>
					<button className="btn ghost" onClick={() => scrollBy(1)} aria-label="Next">
						→
					</button>
				</div>
			</div>
			<div className="hero-track" ref={scrollerRef}>
				{articles.map(article => (
					<Link key={article.id} to={`/article/${article.id}`} className="hero-card" aria-label={article.title}>
						<img src={getImageUrl(article)} alt={article.imageAlt || article.title} loading="lazy" />
					<div className="hero-card-content">
						<span className="pill">{getCategoryName(article.category)}</span>
						<h3 className="hero-title">{article.title}</h3>
						<p className="muted">{getSummary(article)}</p>
					</div>
					</Link>
				))}
			</div>
		</section>
	)
}


