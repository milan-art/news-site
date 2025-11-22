const seededRandom = (seed) => {
	let x = Math.sin(seed) * 10000
	return x - Math.floor(x)
}

export const categories = ['Top Stories', 'Politics', 'Sports', 'Tech', 'Entertainment']

const authors = [
	{
		name: 'Maya Patel',
		role: 'Senior Editor',
		avatar: 'https://i.pravatar.cc/96?img=7'
	},
	{
		name: 'Ethan Chen',
		role: 'Investigative Reporter',
		avatar: 'https://i.pravatar.cc/96?img=12'
	},
	{
		name: 'Lauren Santos',
		role: 'Global Affairs Correspondent',
		avatar: 'https://i.pravatar.cc/96?img=24'
	},
	{
		name: 'David Brooks',
		role: 'Tech & Innovation Analyst',
		avatar: 'https://i.pravatar.cc/96?img=46'
	}
]

function makeDate(daysAgo) {
	const d = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
	return {
		iso: d.toISOString(),
		display: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
	}
}

const paragraphTemplates = [
	`In a week defined by rapid developments, {{topic}} continues to shape the broader narrative. Analysts note that the latest signals point to a pivotal inflection as stakeholders reassess both short-term impact and long-term direction.`,
	`Our reporting team spoke with insiders and reviewed newly surfaced documents to understand how {{topic}} evolved and why it matters now more than ever. The findings reveal a layered story of innovation, tension, and opportunity.`,
	`Experts caution that the next steps will determine whether {{topic}} accelerates or encounters turbulence. Communities affected by these moves are already outlining contingency plans to keep decision-makers accountable.`,
	`At the center of the conversation is a renewed call for transparency. Leaders emphasize that keeping audiences informed with verified updates helps close the gap between noise and signal when headlines move fast.`
]

function buildBody(category, topic, imageSeed) {
	const paragraphs = paragraphTemplates.map((template, index) => ({
		type: 'paragraph',
		id: `p-${index}`,
		text: template.replace('{{topic}}', topic)
	}))

	const inlineImages = [
		{
			type: 'image',
			id: 'img-1',
			src: `https://picsum.photos/seed/${encodeURIComponent(imageSeed)}-detail/1200/720`,
			alt: `${category} detail illustration`
		},
		{
			type: 'image',
			id: 'img-2',
			src: `https://picsum.photos/seed/${encodeURIComponent(imageSeed)}-extra/1200/760`,
			alt: `${category} additional context image`
		}
	]

	const sectionHeader = {
		type: 'heading',
		id: 'h-1',
		text: 'Key Takeaways'
	}

	const list = {
		type: 'list',
		id: 'l-1',
		items: [
			`Stakeholders closely monitor how ${topic} reverberates across industries.`,
			`Data teams surface new signals daily, separating hype from measurable change.`,
			`Community leaders are designing inclusive frameworks to ensure equitable outcomes.`,
			`Next-quarter milestones could redefine the tone of the conversation entirely.`
		]
	}

	return [paragraphs[0], inlineImages[0], paragraphs[1], sectionHeader, list, paragraphs[2], inlineImages[1], paragraphs[3]]
}

export function generateArticles(count = 40) {
	const list = []
	for (let i = 1; i <= count; i++) {
		const category = categories[1 + (i % (categories.length - 1))]
		const { iso, display } = makeDate(Math.floor(seededRandom(i) * 20))
		const popularity = Math.floor(seededRandom(i * 13) * 1000)
		const trending = seededRandom(i * 7) > 0.65
		const id = i
		const imageSeed = `news-${i}`
		const topic = ['global markets', 'national debate', 'tech disruption', 'sports analytics', 'media trends'][i % 5]
		const headlineLead = [
			'Breaking developments reshape',
			'Inside the rise of',
			'What to know about',
			'Experts weigh in on',
			'New data reveals',
			'Behind the scenes of'
		][i % 6]
		const title = `${headlineLead} ${topic}`
		const summary = [
			'A concise overview of the key events and what they mean for readers.',
			'We outline the facts, the context, and the implications behind the headlines.',
			'A closer look at the forces shaping today’s most important stories.',
			'From data to decisions: understanding the signal in the noise.',
			'What matters, why it matters, and what comes next.'
		][i % 5]
		const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(imageSeed)}/960/540`
		const thumbUrl = `https://picsum.photos/seed/${encodeURIComponent(imageSeed)}/120/80`
		const author = authors[i % authors.length]
		const body = buildBody(category, topic, imageSeed)
		const tags = [category, topic.split(' ')[0], 'Analysis']

		list.push({
			id,
			category,
			title,
			summary,
			imageUrl,
			thumbUrl,
			imageAlt: `${category} — illustrative image`,
			dateISO: iso,
			dateDisplay: display,
			popularity,
			trending,
			author,
			readTime: `${8 + (i % 6)} min read`,
			body,
			tags
		})
	}
	return list
}



