import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AppwriteService from './services/AppwriteService.js';

AppwriteService.init();

if (!sessionStorage.getItem('_session')) {
  AppwriteService.createSession('danikp0101@mail.ru', 'QwaszX@123');
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
