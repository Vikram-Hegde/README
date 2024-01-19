const Logo = () => {
	return (
		<h2 className="flex items-end gap-1 text-[var(--text-200)]">
			README
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1.75rem"
				height="1.75rem"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="m16 15l3-3l-1.05-1.075l-1.2 1.2V9h-1.5v3.125l-1.2-1.2L13 12zM4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm1.5-5H7v-4.5h1v3h1.5v-3h1V15H12v-5q0-.425-.288-.712T11 9H6.5q-.425 0-.712.288T5.5 10z"
				/>
			</svg>
		</h2>
	)
}

export default Logo
