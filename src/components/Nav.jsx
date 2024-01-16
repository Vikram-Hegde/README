import Topic from './Topic'
import Logo from './Logo'
import PropTypes from 'prop-types'

const Nav = ({
	topics,
	addNewSection,
	selectedSectionID,
	setSelectedSectionID,
	removeSection,
}) => {
	return (
		<nav className={`p-3 bg-gray-100 inline-[30ch]`}>
			<Logo />
			<h2 className="uppercase text-sm tracking-wider mt-9 mb-3 text-gray-400">
				Sections
			</h2>
			<ul>
				{topics.map(({ id, topic }) => (
					<Topic
						key={id}
						topic={topic}
						id={id}
						selectedSectionID={selectedSectionID}
						setSelectedSectionID={setSelectedSectionID}
						removeSection={removeSection}
					/>
				))}
			</ul>
			<button
				onClick={addNewSection}
				className="p-2 w-full bg-gray-200 flex items-center justify-center gap-2 font-medium rounded mt-3"
			>
				<i className="i-solar-add-square-linear" />
				Add new section
			</button>
		</nav>
	)
}

Nav.propTypes = {
	topics: PropTypes.array.isRequired,
	addNewSection: PropTypes.func.isRequired,
	selectedSectionID: PropTypes.string.isRequired,
	setSelectedSectionID: PropTypes.func.isRequired,
	removeSection: PropTypes.func.isRequired,
	showMenu: PropTypes.bool.isRequired,
	setShowMenu: PropTypes.func.isRequired,
}

export default Nav
