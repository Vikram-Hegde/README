import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import './App.css'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { sections } from './assets/data.js'
import Nav from './components/Nav'
import Logo from './components/Logo'
import Button from './components/Button.jsx'
import AppContext from './AppContext.js'
import useLocalStorage from './useLocalStorage.js'

let counter = 1

function App() {
	const [topics, setTopics] = useLocalStorage('topics', sections)
	const [selectedSectionID, setSelectedSectionID] = useState(topics[0].id)
	const [copied, setCopied] = useState(false)
	const [isPreview, setIsPreview] = useState(false)
	const [showMenu, setShowMenu] = useState(false)

	document.body.classList.toggle('nav-active', showMenu)

	const handleToggleNav = (e) => {
		e.stopPropagation()
		setShowMenu(true)
	}

	useLayoutEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			document.documentElement.setAttribute('data-color-mode', 'light')
			window
				.matchMedia('(prefers-color-scheme: light)')
				.addEventListener('change', (e) => {
					if (e.matches) {
						document.documentElement.setAttribute('data-color-mode', 'light')
					} else {
						document.documentElement.setAttribute('data-color-mode', 'dark')
					}
				})
		}
	}, [])

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

	const selectedSection = useMemo(() => {
		const index = topics.findIndex(({ id }) => id === selectedSectionID)
		if (index === -1) {
			setSelectedSectionID(topics[topics.length - 1].id)
			return topics[topics.length - 1]
		}
		return topics[index]
	}, [selectedSectionID, topics])

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
		setTopics((oldSections) => {
			const index = oldSections.findIndex((section) => section.id === id)
			const newSections = [...oldSections]
			if (topicOrContent === 'topic')
				newSections[index] = {
					...newSections[index],
					id: newContent.toLowerCase().replaceAll(' ', '-'),
					topic: newContent,
				}
			else newSections[index] = { ...newSections[index], content: newContent }
			return newSections
		})
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

	const generateMarkdown = () => {
		const blob = new Blob([preview], { type: 'text/plain' })
		const link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = 'README.md'
		link.click()
	}

	return (
		<>
			<AppContext.Provider
				value={{
					topics,
					selectedSectionID,
					setSelectedSectionID,
					removeSection,
					addNewSection,
				}}
			>
				<Nav />
			</AppContext.Provider>
			<header className="p-3 flex items-center justify-end gap-3">
				<Button onClick={handleToggleNav} className="menu">
					<i className="i-solar-hamburger-menu-outline" />
				</Button>
				<div className="logo mr-auto">
					<Logo />
				</div>
				<Button
					onClick={() => setIsPreview((old) => !old)}
					className="preview-button"
				>
					{isPreview ? (
						<i className="i-solar-pen-2-linear" />
					) : (
						<i className="i-solar-eye-outline" />
					)}
				</Button>
				<Button onClick={generateMarkdown}>
					<i className="i-solar-file-download-outline" />
				</Button>
				<Button onClick={copyToClipboard}>
					{copied ? (
						<i className="i-solar-check-square-linear" />
					) : (
						<i className="i-solar-copy-outline" />
					)}
				</Button>
			</header>
			<main className={`${isPreview ? 'editor-hidden' : ''} p-4`}>
				<input
					type="text"
					value={selectedSection?.topic}
					onChange={(e) =>
						updateTopicOrContent(selectedSectionID, 'topic', e.target.value)
					}
					className="w-full p-2 text-xl font-medium mb-2 rounded-md "
				/>
				<MarkdownEditor
					enablePreview={false}
					value={selectedSection?.content}
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
