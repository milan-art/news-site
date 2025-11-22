import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'

export default function Header({ theme, onToggleTheme, onSearchChange, onSearchSubmit }) {
	const [searchOpen, setSearchOpen] = useState(false)

	useEffect(() => {
		document.body.style.overflow = searchOpen ? 'hidden' : ''
		return () => { document.body.style.overflow = '' }
	}, [searchOpen])

	useEffect(() => {
		const handler = (event) => {
			if (event.key === 'Escape') setSearchOpen(false)
		}
		if (searchOpen) {
			window.addEventListener('keydown', handler)
		}
		return () => window.removeEventListener('keydown', handler)
	}, [searchOpen])

	const handleSearchChange = (value) => {
		onSearchChange?.(value)
	}

	const handleSearchSubmit = (value) => {
		onSearchSubmit?.(value)
		if (searchOpen) setSearchOpen(false)
	}

	return (
		<header className="header" role="banner">
			<div className="container header-inner">
				<div className="brand">
					<Link to="/" className="logo" aria-label="Daily Pulse Home">
						<span aria-hidden="true">📰</span> Daily&nbsp;Pulse
					</Link>
				</div>
				<div className="header-actions">
					<button
						className="btn ghost search-toggle"
						type="button"
						aria-label="Open search"
						onClick={() => setSearchOpen(true)}
					>
						🔎
					</button>
					<div className="desktop-search">
						<SearchBar onChange={handleSearchChange} onSubmit={handleSearchSubmit} />
					</div>
					<button className="btn ghost" onClick={onToggleTheme} aria-label="Toggle dark mode">
						{theme === 'dark' ? '🌙' : '☀️'}
					</button>
					<button className="btn outline" aria-label="Log in">Log in</button>
					<button className="btn solid" aria-label="Sign up">Sign up</button>
				</div>
			</div>
			{searchOpen && (
				<div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search articles">
				 <div className="search-sheet">
						<button className="btn ghost close-search" onClick={() => setSearchOpen(false)} aria-label="Close search">✕</button>
						<SearchBar onChange={handleSearchChange} onSubmit={handleSearchSubmit} autoFocus />
					</div>
				</div>
			)}
		</header>
	)
}


