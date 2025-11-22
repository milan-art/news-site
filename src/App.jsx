import React, { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import NewsletterModal from './components/NewsletterModal.jsx'
import { categories, generateArticles } from './data/articles.js'
import { fetchPublishedArticles, getTrendingArticles } from './services/api.js'
import { getCategoryValue } from './utils/articleHelpers.js'
import Home from './pages/Home.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import NotFound from './pages/NotFound.jsx'

const NEWSLETTER_STORAGE_KEY = 'newsletterDismissedAt'
const THEME_STORAGE_KEY = 'theme'

export default function App() {
	const [activeCategory, setActiveCategory] = useState('Top Stories')
	const [searchQuery, setSearchQuery] = useState('')
	const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
	const [articles, setArticles] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [theme, setTheme] = useState(() => {
		const saved = localStorage.getItem(THEME_STORAGE_KEY)
		if (saved) return saved
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	})
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem(THEME_STORAGE_KEY, theme)
	}, [theme])

	// Fetch articles from API
	useEffect(() => {
		const loadArticles = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const fetchedArticles = await fetchPublishedArticles({ pageSize: 10, status: 'published' })
				setArticles(fetchedArticles)
			} catch (err) {
				console.error('Failed to fetch articles from API, using fallback data:', err)
				setError(err.message)
				// Fallback to mock data if API fails
				setArticles(generateArticles(60))
			} finally {
				setIsLoading(false)
			}
		}

		loadArticles()
	}, [])

	// Use fetched articles or fallback to mock data
	const allArticles = useMemo(() => {
		return articles.length > 0 ? articles : generateArticles(60)
	}, [articles])

	// Get trending articles: filter/sort by viewCount and featured, take top 4-6
	const trendingArticles = useMemo(() => {
		return getTrendingArticles(allArticles, 6)
	}, [allArticles])

	const filteredArticles = useMemo(() => {
		let list = allArticles
		if (activeCategory !== 'Top Stories') {
			list = list.filter(a => getCategoryValue(a.category) === activeCategory)
		}
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase()
			list = list.filter(a => 
				(a.title && a.title.toLowerCase().includes(q)) || 
				(a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
				(a.summary && a.summary.toLowerCase().includes(q)) ||
				(a.description && a.description.toLowerCase().includes(q))
			)
		}
		return list
	}, [allArticles, activeCategory, searchQuery])

	useEffect(() => {
		const lastDismiss = localStorage.getItem(NEWSLETTER_STORAGE_KEY)
		const aWeek = 1000 * 60 * 60 * 24 * 7
		const shouldShow = !lastDismiss || (Date.now() - Number(lastDismiss)) > aWeek
		const timeout = setTimeout(() => {
			if (shouldShow) setIsNewsletterOpen(true)
		}, 2500)
		return () => clearTimeout(timeout)
	}, [])

	const handleNewsletterDismiss = () => {
		localStorage.setItem(NEWSLETTER_STORAGE_KEY, String(Date.now()))
		setIsNewsletterOpen(false)
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'auto' })
	}, [location.pathname])

	useEffect(() => {
		if (searchQuery) {
			setActiveCategory('Top Stories')
		}
	}, [searchQuery])

	const handleSearchChange = (value) => {
		setSearchQuery(value)
	}

	const handleSearchSubmit = (value) => {
		setSearchQuery(value)
		if (location.pathname !== '/') {
			navigate('/')
		}
	}

	return (
		<div className="app">
			<Header
				theme={theme}
				onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
				onSearchChange={handleSearchChange}
				onSearchSubmit={handleSearchSubmit}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							trendingArticles={trendingArticles}
							categories={categories}
							activeCategory={activeCategory}
							onCategoryChange={setActiveCategory}
							articles={filteredArticles}
							allArticles={allArticles}
							isLoading={isLoading}
						/>
					}
				/>
				<Route path="/article/:id" element={<ArticleDetail articles={allArticles} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
			<NewsletterModal open={isNewsletterOpen} onClose={handleNewsletterDismiss} />
		</div>
	)
}


