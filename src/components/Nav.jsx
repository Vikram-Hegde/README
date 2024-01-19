import Topic from './Topic'
import Logo from './Logo'
import { useContext } from 'react'
import AppContext from '../AppContext'

const Nav = () => {
	const { topics, addNewSection } = useContext(AppContext)
	return (
		<nav className="p-3 bg-accent-100 text-[var(--text-200)] inline-[30ch]">
			<Logo />
			<h2 className="uppercase text-sm tracking-wider mt-9 mb-3">Sections</h2>
			<ul>
				{topics.map(({ id, topic }) => (
					<Topic key={id} topic={topic} id={id} />
				))}
			</ul>
			<button
				onClick={addNewSection}
				className="p-2 w-full bg-accent-200 @hover:bg-accent-300 flex items-center justify-center gap-2 font-medium rounded mt-3"
			>
				<i className="i-solar-add-square-linear" />
				Add new section
			</button>
		</nav>
	)
}

export default Nav
