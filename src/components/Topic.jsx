import PropTypes from 'prop-types'

const Topic = ({
	topic,
	id,
	selectedSectionID,
	setSelectedSectionID,
	removeSection,
}) => {
	return (
		<li
			className={`flex gap-3 justify-between ${
				selectedSectionID === id ? 'bg-gray-200' : ''
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
				className="p-2 text-gray-400 hover:text-red-400"
			>
				<i className="i-solar-trash-bin-2-linear" />
			</button>
		</li>
	)
}

Topic.propTypes = {
	topic: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	selectedSectionID: PropTypes.string.isRequired,
	setSelectedSectionID: PropTypes.func.isRequired,
	removeSection: PropTypes.func.isRequired,
}

export default Topic
