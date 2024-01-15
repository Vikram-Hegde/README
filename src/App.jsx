import { useMemo, useState } from 'react'
import './App.css'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { defaultData } from './assets/data.js'
import Nav from './components/Nav'

let counter = 1

function App() {
	const [topics, setTopics] = useState(defaultData)
	const [selectedSectionID, setSelectedSectionID] = useState(topics[0].id)

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

	const updateTopicOrContent = (id, topicOrContent, newContent) => {
		setTopics((oldSections) =>
			oldSections.map((section) =>
				section.id === id
					? { ...section, [topicOrContent]: newContent }
					: section
			)
		)
	}

	return (
		<>
			<Nav
				topics={topics}
				addNewSection={addNewSection}
				selectedSectionID={selectedSectionID}
				setSelectedSectionID={setSelectedSectionID}
			/>
			<header className="p-3 flex items-center justify-end">
				{/* on click show a tick mark briefly */}
				<button className="p-3 bg-gray-100 hover:bg-gray-200 flex rounded-2 outline-gray-300">
					<i className="i-solar-copy-outline" />
				</button>
			</header>
			<main className="p-4">
				<input
					type="text"
					value={selectedSection.topic}
					onChange={(e) =>
						updateTopicOrContent(selectedSectionID, 'topic', e.target.value)
					}
					className="w-full p-2 border-1 border-gray-200 outline-gray-300 border-solid text-xl font-bold mb-2 rounded-md hover:bg-gray-100 focus:bg-gray-100"
				/>
				<MarkdownEditor
					enablePreview={false}
					value={selectedSection.content}
					onChange={(value) =>
						updateTopicOrContent(selectedSectionID, 'content', value)
					}
				/>
			</main>
			<section className="preview | p-4">
				<MarkdownEditor.Markdown source={preview} />
			</section>
		</>
	)
}

export default App
