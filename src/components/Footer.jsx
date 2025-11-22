import React from 'react'

export default function Footer() {
	return (
		<footer className="footer">
			<div className="container footer-inner">
				<div className="footer-col footer-brand">
					<div className="logo small"><span aria-hidden="true">📰</span> Daily&nbsp;Pulse</div>
					<p className="muted">Independent, modern journalism for the curious mind.</p>
				</div>
				<nav className="footer-col footer-links" aria-label="Footer">
					<h4>Company</h4>
					<ul>
						<li><a id="about" href="#about">About</a></li>
						<li><a id="contact" href="#contact">Contact</a></li>
						<li><a id="careers" href="#careers">Careers</a></li>
					</ul>
				</nav>
				<nav className="footer-col footer-links" aria-label="Legal">
					<h4>Legal</h4>
					<ul>
						<li><a id="policies" href="#policies">Policies</a></li>
						<li><a href="#privacy">Privacy</a></li>
						<li><a href="#terms">Terms</a></li>
					</ul>
				</nav>
				<nav className="footer-col footer-links" aria-label="Social">
					<h4>Follow</h4>
					<ul>
						<li><a href="https://twitter.com" target="_blank" rel="noreferrer">X</a></li>
						<li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
						<li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
					</ul>
				</nav>
			</div>
			<div className="container footer-note">
				<small className="muted">© {new Date().getFullYear()} Daily Pulse. All rights reserved.</small>
			</div>
		</footer>
	)
}


