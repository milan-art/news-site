import React, { useEffect, useRef } from 'react'

export default function NewsletterModal({ open, onClose }) {
	const dialogRef = useRef(null)
	const firstInputRef = useRef(null)

	useEffect(() => {
		if (open) {
			firstInputRef.current?.focus()
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => { document.body.style.overflow = '' }
	}, [open])

	if (!open) return null

	return (
		<div className="modal-backdrop" role="presentation" onClick={onClose}>
			<div
				className="modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="newsletter-title"
				onClick={e => e.stopPropagation()}
				ref={dialogRef}
			>
				<button className="btn ghost modal-close" onClick={onClose} aria-label="Close">✕</button>
				<h3 id="newsletter-title">Join our newsletter</h3>
				<p className="muted">Weekly digest of the biggest stories. No spam.</p>
				<form onSubmit={(e) => { e.preventDefault(); onClose?.() }}>
					<label htmlFor="modal-email" className="sr-only">Email</label>
					<input ref={firstInputRef} id="modal-email" type="email" placeholder="you@example.com" required />
					<button className="btn solid" type="submit">Subscribe</button>
				</form>
			</div>
		</div>
	)
}


