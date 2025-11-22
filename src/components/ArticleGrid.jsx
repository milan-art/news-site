import React, { useMemo, useState } from 'react'
import ArticleCard from './ArticleCard.jsx'
import useInfiniteScroll from '../hooks/useInfiniteScroll.js'

const PAGE_SIZE = 12

export default function ArticleGrid({ articles }) {
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
	const visibleArticles = useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount])
	const hasMore = visibleCount < articles.length

	const { sentinelRef } = useInfiniteScroll({
		enabled: hasMore,
		onLoadMore: () => setVisibleCount(c => Math.min(c + PAGE_SIZE, articles.length))
	})

	// Reset when filter changes
	React.useEffect(() => {
		setVisibleCount(PAGE_SIZE)
	}, [articles])

	return (
		<section className="container" aria-label="Article grid">
			<div className="grid">
				{visibleArticles.map(a => (
					<ArticleCard key={a.id} article={a} />
				))}
			</div>
			<div
				ref={sentinelRef}
				aria-hidden="true"
				className="sentinel"
			/>
			{!articles.length && (
				<p className="muted" role="status">No articles match your filters.</p>
			)}
		</section>
	)
}


