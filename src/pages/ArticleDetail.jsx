import React, { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import SocialShare from '../components/SocialShare.jsx'
import { getCategoryName, getCategoryValue, getImageUrl, getSummary, getArticleDate, getAuthor } from '../utils/articleHelpers.js'

function renderBlock(block) {
	switch (block.type) {
		case 'paragraph':
			return <p key={block.id}>{block.text}</p>
		case 'heading':
			return <h3 key={block.id}>{block.text}</h3>
		case 'list':
			return (
				<ul key={block.id} className="article-list">
					{block.items.map((item, idx) => (
						<li key={idx}>{item}</li>
					))}
				</ul>
			)
		case 'image':
			return (
				<figure key={block.id} className="article-image">
					<img src={block.src} alt={block.alt} loading="lazy" />
					<figcaption className="muted">{block.alt}</figcaption>
				</figure>
			)
		default:
			return null
	}
}

export default function ArticleDetail({ articles }) {
	const { id } = useParams()
	const location = useLocation()
	const article = articles.find(a => String(a.id) === id)

	const similar = useMemo(() => {
		if (!article) return []
		const articleCategory = getCategoryValue(article.category)
		const articleTagIds = article.tags ? article.tags.map(tag => typeof tag === 'object' ? tag.id || tag.name : tag) : []
		
		return articles
			.filter(a => {
				if (a.id === article.id) return false
				const sameCategory = getCategoryValue(a.category) === articleCategory
				const hasMatchingTag = a.tags && article.tags && a.tags.some(tag => {
					const tagId = typeof tag === 'object' ? tag.id || tag.name : tag
					return articleTagIds.includes(tagId)
				})
				return sameCategory || hasMatchingTag
			})
			.slice(0, 8)
	}, [article, articles])

	const shareUrl = typeof window !== 'undefined'
		? `${window.location.origin}${location.pathname}`
		: ''

	if (!article) {
		return (
			<main className="detail-main">
				<section className="detail-section article-not-found">
					<h1>Story not found</h1>
					<p className="muted">We couldn’t find the article you’re looking for. Explore the latest coverage instead.</p>
					<Link className="btn solid" to="/">Back to headlines</Link>
				</section>
			</main>
		)
	}

	const [liked, setLiked] = useState(false)
	const [likeCount, setLikeCount] = useState(() => (article.viewCount || 0) + (article.popularity || 0) % 250)

	const toggleLike = () => {
		setLiked(prev => !prev)
		setLikeCount(count => count + (liked ? -1 : 1))
	}

	const dateInfo = getArticleDate(article)
	const author = getAuthor(article)
	const heroStyle = {
		'--hero-image': `url(${getImageUrl(article)})`
	}

	return (
		<>
			<header className="detail-hero" style={heroStyle}>
				<div className="detail-hero-inner container">
					<nav className="breadcrumbs" aria-label="Breadcrumb">
						<Link to="/">Home</Link>
						<span aria-hidden="true">/</span>
						<Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Latest</Link>
						<span aria-hidden="true">/</span>
						<span>{getCategoryName(article.category)}</span>
					</nav>
					<div className="detail-hero-content">
						<span className="pill">{getCategoryName(article.category)}</span>
						<h1>{article.title}</h1>
						<p className="lead">{getSummary(article)}</p>
						<div className="detail-meta">
							<div className="detail-author">
								<img src={author.avatar} alt={`${author.name} avatar`} loading="lazy" />
								<div>
									<strong>{author.name}</strong>
									<span className="muted">{author.role}</span>
								</div>
							</div>
							<div className="detail-date muted">
								<time dateTime={dateInfo.iso}>{dateInfo.display}</time> {article.readTime ? `· ${article.readTime}` : ''}
							</div>
						</div>
					</div>
				</div>
			</header>

			<main id="main" className="detail-main">
				<article className="article-detail detail-section">
					<div className="article-toolbar">
						<div className="article-datestamp muted">
							<time dateTime={dateInfo.iso}>{dateInfo.display}</time> • Updated daily coverage
						</div>
						<div className="article-toolbar-actions">
							<button className={`btn ghost like-btn ${liked ? 'liked' : ''}`} onClick={toggleLike} aria-pressed={liked}>
								{liked ? '♥' : '♡'} {likeCount.toLocaleString()}
							</button>
							<SocialShare url={shareUrl} title={article.title} />
						</div>
					</div>

					<section className="article-body">
						{article.contentHtml ? (
							<div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
						) : article.body ? (
							article.body.map(renderBlock)
						) : (
							<p>No content available.</p>
						)}
					</section>

					{article.tags && article.tags.length > 0 && (
						<section className="article-tags" aria-label="Article tags">
							{article.tags.map((tag, index) => {
								const tagName = typeof tag === 'object' ? tag.name || tag.id : tag
								const tagKey = typeof tag === 'object' ? tag.id || tag.name : tag
								return (
									<span key={tagKey || index} className="pill">{tagName}</span>
								)
							})}
						</section>
					)}
				</article>

				<section className="similar-news detail-section" aria-label="Similar news">
					<div className="section-header">
						<h2>Similar News</h2>
						<p className="muted">More stories curated for you</p>
					</div>
					<div className="similar-track">
						{similar.map(item => {
							const itemDate = getArticleDate(item)
							return (
								<Link key={item.id} to={`/article/${item.id}`} className="similar-card">
									<img src={getImageUrl(item)} alt={item.imageAlt || item.title} loading="lazy" />
									<div>
										<span className="pill">{getCategoryName(item.category)}</span>
										<h3>{item.title}</h3>
										<time className="muted" dateTime={itemDate.iso}>{itemDate.display}</time>
									</div>
								</Link>
							)
						})}
					</div>
				</section>

				<section className="article-comments detail-section" aria-label="Comments">
					<h2>Join the conversation</h2>
					<p className="muted">Share your perspective. We moderate for respectful dialogue.</p>
					<form className="comment-form" onSubmit={e => e.preventDefault()}>
						<label htmlFor="comment-name" className="sr-only">Name</label>
						<input id="comment-name" type="text" placeholder="Your name" required />
						<label htmlFor="comment-body" className="sr-only">Comment</label>
						<textarea id="comment-body" placeholder="Add your comment..." rows={4} required />
						<div className="comment-actions">
							<button type="submit" className="btn solid">Post comment</button>
							<button type="button" className="btn outline">Preview</button>
						</div>
					</form>
				</section>
			</main>
		</>
	)
}


