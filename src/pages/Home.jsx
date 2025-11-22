import React from 'react'
import Hero from '../components/Hero.jsx'
import CategoryTabs from '../components/CategoryTabs.jsx'
import ArticleGrid from '../components/ArticleGrid.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function Home({
	trendingArticles,
	categories,
	activeCategory,
	onCategoryChange,
	articles,
	allArticles,
	isLoading
}) {
	return (
		<main id="main" className="container layout">
			<section className="main-column" aria-label="Featured and latest news">
				<Hero articles={trendingArticles} isLoading={isLoading} />
				<CategoryTabs categories={categories} active={activeCategory} onChange={onCategoryChange} />
				<ArticleGrid articles={articles} />
			</section>
			<aside className="sidebar" aria-label="Sidebar">
				<Sidebar articles={allArticles} />
			</aside>
		</main>
	)
}


