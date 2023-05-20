/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Route, Router, Routes } from '@solidjs/router';

import App from './App';
import { AuthProvider } from './lib/AuthContext';
import AppBar from './components/AppBar';
import { Toaster } from 'solid-toast';
import Firestore from './Firestore';
import Storage from './Storage';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
	);
}

render(
	() => (
		<AuthProvider>
			<Toaster position='top-center' />
			<Router>
				<AppBar>
					<Routes>
						<Route path='/' component={App} />
						<Route path='/firestore' component={Firestore} />
						<Route path='/storage' component={Storage} />
					</Routes>
				</AppBar>
			</Router>
		</AuthProvider>
	),
	root
);
