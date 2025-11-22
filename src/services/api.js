const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

/**
 * Fetches published articles from the API
 * @param {Object} params - Query parameters
 * @param {number} params.pageSize - Number of articles to fetch
 * @param {string} params.status - Article status (default: 'published')
 * @returns {Promise<Array>} Array of articles
 */
export async function fetchPublishedArticles({ pageSize = 10, status = 'published' } = {}) {
	try {
		const url = new URL(`${API_BASE_URL}/api/articles`)
		url.searchParams.append('status', status)
		url.searchParams.append('pageSize', pageSize.toString())

		const response = await fetch(url.toString())
		
		if (!response.ok) {
			throw new Error(`API error: ${response.status} ${response.statusText}`)
		}

		const data = await response.json()
		
		// Handle different response formats
		// If the API returns { articles: [...] } or { data: [...] }, extract the array
		if (data.articles) {
			return data.articles
		}
		if (data.data) {
			return data.data
		}
		if (Array.isArray(data)) {
			return data
		}
		
		return []
	} catch (error) {
		console.error('Error fetching articles:', error)
		throw error
	}
}

/**
 * Filters and sorts articles for trending carousel
 * Prioritizes articles with high viewCount and featured status
 * @param {Array} articles - Array of articles
 * @param {number} limit - Maximum number of articles to return (default: 6)
 * @returns {Array} Top trending articles
 */
export function getTrendingArticles(articles, limit = 6) {
	if (!articles || articles.length === 0) {
		return []
	}

	// Sort by: featured first, then by viewCount (descending), then by createdAt (descending)
	const sorted = [...articles].sort((a, b) => {
		// Featured articles first
		if (a.featured && !b.featured) return -1
		if (!a.featured && b.featured) return 1
		
		// Then by viewCount (higher is better)
		const viewCountA = a.viewCount || 0
		const viewCountB = b.viewCount || 0
		if (viewCountA !== viewCountB) {
			return viewCountB - viewCountA
		}
		
		// Finally by createdAt (newer is better)
		const dateA = new Date(a.createdAt || a.dateISO || 0)
		const dateB = new Date(b.createdAt || b.dateISO || 0)
		return dateB - dateA
	})

	return sorted.slice(0, limit)
}

