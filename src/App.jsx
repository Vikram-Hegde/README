import { useEffect, useMemo, useState } from 'react'
import './App.css'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { defaultData } from './assets/data.js'
import Nav from './components/Nav'
import Logo from './components/Logo'

let counter = 1

function App() {
	const [topics, setTopics] = useState(defaultData)
	const [selectedSectionID, setSelectedSectionID] = useState(topics[0].id)
	const [copied, setCopied] = useState(false)
	const [isPreview, setIsPreview] = useState(false)
	const [showMenu, setShowMenu] = useState(false)

	document.body.classList.toggle('nav-active', showMenu)

	const handleToggleNav = (e) => {
		e.stopPropagation()
		setShowMenu(true)
	}

	useEffect(() => {
		const handleNavClose = (e) => {
			if (document.querySelector('.nav-active') && showMenu) {
				const target = e.target
				if (!target.closest('nav')) {
					setShowMenu(false)
				}
			}
		}
		document.addEventListener('click', handleNavClose)
		return () => {
			document.removeEventListener('click', handleNavClose)
		}
	}, [showMenu])

	const selectedSection = topics.find(({ id }) => id === selectedSectionID)

	const preview = useMemo(() => {
		return topics.reduce((acc, { topic, content }) => {
			return acc + `## ${topic}\n\n${content}\n\n`
		}, '')
	}, [topics])

	const addNewSection = () => {
		setTopics((oldSections) => {
			const sections = [
				...oldSections,
				{
					topic: `New Section ${counter++}`,
					get id() {
						return this.topic.toLowerCase().replaceAll(' ', '-')
					},
					content: 'This is a new section',
				},
			]
			setSelectedSectionID(sections[sections.length - 1].id)
			return sections
		})
	}

	const removeSection = (id) => {
		if (id === selectedSectionID) {
			setSelectedSectionID(topics[topics.length - 2].id)
		}
		setTopics((oldSections) =>
			oldSections.filter((section) => section.id !== id)
		)
	}

	const updateTopicOrContent = (id, topicOrContent, newContent) => {
		setTopics((oldSections) =>
			oldSections.map((section) =>
				section.id === id
					? { ...section, [topicOrContent]: newContent }
					: section
			)
		)
	}

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(preview)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<>
			<Nav
				topics={topics}
				addNewSection={addNewSection}
				selectedSectionID={selectedSectionID}
				setSelectedSectionID={setSelectedSectionID}
				removeSection={removeSection}
				showMenu={showMenu}
				setShowMenu={setShowMenu}
			/>
			<header className="p-3 flex items-center justify-end gap-3">
				<button
					onClick={handleToggleNav}
					className="menu p-3 bg-gray-100 hover:bg-gray-200 flex rounded-2 outline-gray-300"
				>
					<i className="i-solar-hamburger-menu-outline" />
				</button>
				<div className="logo mr-auto">
					<Logo />
				</div>
				<button
					onClick={() => setIsPreview((old) => !old)}
					className="p-3 bg-gray-100 hover:bg-gray-200 flex rounded-2 outline-gray-300 | preview-button"
				>
					{isPreview ? (
						<i className="i-solar-pen-2-linear" />
					) : (
						<i className="i-solar-eye-outline" />
					)}
				</button>
				<button
					onClick={copyToClipboard}
					className="p-3 bg-gray-100 hover:bg-gray-200 flex rounded-2 outline-gray-300"
				>
					{copied ? (
						<i className="i-solar-check-square-linear" />
					) : (
						<i className="i-solar-copy-outline" />
					)}
				</button>
			</header>
			<main className={`${isPreview ? 'editor-hidden' : ''} p-4`}>
				<input
					type="text"
					value={selectedSection.topic}
					onChange={(e) =>
						updateTopicOrContent(selectedSectionID, 'topic', e.target.value)
					}
					className="w-full p-2 border-1 border-gray-200 outline-gray-300 bg-gray-50 border-solid text-xl font-medium mb-2 rounded-md hover:bg-gray-100 focus:bg-gray-100"
				/>
				<MarkdownEditor
					enablePreview={false}
					value={selectedSection.content}
					onChange={(value) =>
						updateTopicOrContent(selectedSectionID, 'content', value)
					}
				/>
			</main>
			<section className={`preview | p-4 ${isPreview ? '' : 'preview-hidden'}`}>
				<MarkdownEditor.Markdown source={preview} />
			</section>
		</>
	)
}

export default App
