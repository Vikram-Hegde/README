import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'virtual:uno.css'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
)
