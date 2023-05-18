import AppBar from './components/AppBar';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
	return (
		<AuthProvider>
			<AppBar>
				<p class='text-4xl text-green-700 text-center py-20'>Hello Tailwind!</p>
			</AppBar>
		</AuthProvider>
	);
}
