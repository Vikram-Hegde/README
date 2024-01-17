import PropTypes from 'prop-types'

const Button = ({ children, onClick, className }) => (
	<button
		onClick={onClick}
		className={`p-2 bg-gray-200 flex items-center justify-center gap-2 font-medium rounded ${className}`}
	>
		{children}
	</button>
)

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
}

export default Button
