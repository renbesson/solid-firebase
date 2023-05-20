import { Toaster } from 'solid-toast';
import AppBar from './components/AppBar';
import { AuthProvider } from './lib/AuthContext';
import { timedToast } from './components/CustomToast';

export default function App() {
	return (
		<>
			<p class='text-4xl text-green-700 text-center py-20'>Hello Tailwind!</p>
		</>
	);
}
