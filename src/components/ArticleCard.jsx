import React from 'react'
import { Link } from 'react-router-dom'
import SocialShare from './SocialShare.jsx'
import { getCategoryName, getImageUrl, getSummary, getArticleDate } from '../utils/articleHelpers.js'

export default function ArticleCard({ article }) {
	const shareUrl = typeof window !== 'undefined'
		? `${window.location.origin}/article/${article.id}`
		: ''

	const dateInfo = getArticleDate(article)
	
	return (
		<article className="card" aria-labelledby={`title-${article.id}`}>
			<Link to={`/article/${article.id}`} className="card-media" aria-label={article.title}>
				<img src={getImageUrl(article)} alt={article.imageAlt || article.title} loading="lazy" />
			</Link>
			<div className="card-body">
				<div className="card-meta">
					<span className="pill">{getCategoryName(article.category)}</span>
					<time className="muted" dateTime={dateInfo.iso}>{dateInfo.display}</time>
				</div>
				<h3 id={`title-${article.id}`} className="card-title">{article.title}</h3>
				<p className="card-summary">{getSummary(article)}</p>
				<div className="card-actions">
					<Link className="btn link" to={`/article/${article.id}`} aria-label={`Read ${article.title}`}>Read more →</Link>
					<SocialShare url={shareUrl} title={article.title} />
				</div>
			</div>
		</article>
	)
}

