import React, { useState } from 'react'

export default function SearchBar({ onChange, onSubmit, autoFocus = false }) {
	const [value, setValue] = useState('')
	return (
		<form
			className="search"
			role="search"
			aria-label="Site search"
			onSubmit={e => {
				e.preventDefault()
				onSubmit?.(value)
			}}
		>
			<input
				type="search"
				placeholder="Search articles"
				value={value}
				onChange={e => {
					setValue(e.target.value)
					onChange?.(e.target.value)
				}}
				aria-label="Search articles"
				autoFocus={autoFocus}
			/>
			<button className="btn ghost" type="submit" aria-label="Search">🔎</button>
		</form>
	)
}


