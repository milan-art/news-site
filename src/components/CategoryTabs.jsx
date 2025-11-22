import React from 'react'

export default function CategoryTabs({ categories, active, onChange }) {
	return (
		<div className="tabs container" role="tablist" aria-label="News categories">
			{categories.map(cat => {
				const isActive = cat === active
				return (
					<button
						key={cat}
						role="tab"
						aria-selected={isActive}
						className={`tab ${isActive ? 'active' : ''}`}
						onClick={() => onChange?.(cat)}
					>
						{cat}
					</button>
				)
			})}
		</div>
	)
}


