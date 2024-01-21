import PropTypes from 'prop-types'
import { useContext } from 'react'
import AppContext from '../AppContext'

const Topic = ({ topic, id }) => {
	const { selectedSectionID, setSelectedSectionID, removeSection } =
		useContext(AppContext)
	return (
		<li
			className={`flex gap-2 justify-between rounded-md ${
				selectedSectionID === id ? 'bg-accent-200' : ''
			}`}
		>
			<a
				href={`#${id}`}
				className="p-2 w-full | topic"
				onClick={() => setSelectedSectionID(id)}
				title={`Select: ${topic}`}
			>
				{topic}
			</a>
			<button
				onClick={() => removeSection(id)}
				className="p-2 bg-inherit text-[var(--text-300)] rounded-inherit hover:text-red-400"
			>
				<i className="i-solar-trash-bin-2-linear" />
			</button>
		</li>
	)
}

Topic.propTypes = {
	topic: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
}

export default Topic
