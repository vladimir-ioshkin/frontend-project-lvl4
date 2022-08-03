import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const socket = io();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(init({ socket }));
