/**
 * Extracts the category name from either a string or an object
 * @param {string|Object} category - Category as string or object with {id, name, color}
 * @returns {string} Category name
 */
export function getCategoryName(category) {
	if (!category) return ''
	if (typeof category === 'string') return category
	if (typeof category === 'object' && category.name) return category.name
	return String(category)
}

/**
 * Gets the category value for comparison/filtering
 * @param {string|Object} category - Category as string or object
 * @returns {string} Category name for comparison
 */
export function getCategoryValue(category) {
	return getCategoryName(category)
}

/**
 * Gets the image URL from various possible field names
 * Prefers regular URLs over base64 data URLs
 * Constructs full URLs from relative paths if needed
 * @param {Object} article - Article object
 * @returns {string} Image URL
 */
export function getImageUrl(article) {
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
	
	// Helper to check if a URL is a regular URL (not base64 data URL)
	const isRegularUrl = (url) => {
		if (!url) return false
		// Skip base64 data URLs
		if (url.startsWith('data:')) return false
		return true
	}
	
	// Helper to construct full URL from relative path
	const makeFullUrl = (url) => {
		if (!url) return ''
		// If it's already a full URL (http/https), return as is
		if (url.startsWith('http://') || url.startsWith('https://')) {
			return url
		}
		// If it's a relative path, prepend API base URL
		if (url.startsWith('/')) {
			return `${API_BASE_URL}${url}`
		}
		// If it's a base64 data URL, return empty (we don't want base64)
		if (url.startsWith('data:')) {
			return ''
		}
		// Otherwise, assume it's a relative path and construct full URL
		return `${API_BASE_URL}/${url}`
	}
	
	// Try regular URL fields first (prefer imageUrl, image, then heroImageUrl)
	const imageUrl = article.imageUrl || article.image || article.heroImageUrl || ''
	
	if (!imageUrl) return ''
	
	// If it's a base64 data URL, skip it
	if (imageUrl.startsWith('data:')) {
		return ''
	}
	
	// Return the URL (will be made full if it's relative)
	return makeFullUrl(imageUrl)
}

/**
 * Gets the summary/excerpt text from various possible field names
 * @param {Object} article - Article object
 * @returns {string} Summary text
 */
export function getSummary(article) {
	return article.excerpt || article.summary || article.description || ''
}

/**
 * Formats a date for display
 * @param {string|Date} date - ISO date string or Date object
 * @returns {Object} Object with iso and display properties
 */
export function formatDate(date) {
	if (!date) {
		const now = new Date()
		return {
			iso: now.toISOString(),
			display: now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
		}
	}
	
	const d = new Date(date)
	if (isNaN(d.getTime())) {
		const now = new Date()
		return {
			iso: now.toISOString(),
			display: now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
		}
	}
	
	return {
		iso: d.toISOString(),
		display: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
	}
}

/**
 * Gets formatted date information from article
 * @param {Object} article - Article object
 * @returns {Object} Object with dateISO and dateDisplay
 */
export function getArticleDate(article) {
	// Try publishedAt first, then createdAt, then dateISO
	const date = article.publishedAt || article.createdAt || article.dateISO
	return formatDate(date)
}

/**
 * Gets author information with fallbacks
 * @param {Object} article - Article object
 * @returns {Object} Author object with name, role, avatar
 */
export function getAuthor(article) {
	if (!article.author) {
		return {
			name: 'Unknown Author',
			role: 'Contributor',
			avatar: 'https://i.pravatar.cc/96?img=1'
		}
	}
	
	if (typeof article.author === 'string') {
		return {
			name: article.author,
			role: 'Contributor',
			avatar: 'https://i.pravatar.cc/96?img=1'
		}
	}
	
	return {
		name: article.author.name || 'Unknown Author',
		role: article.author.role || article.author.email?.split('@')[0] || 'Contributor',
		avatar: article.author.avatar || `https://i.pravatar.cc/96?img=${(article.author.id || article.author.name || '').charCodeAt(0) % 70}`
	}
}
