import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AppwriteService from './services/AppwriteService.js';

AppwriteService.init();

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
