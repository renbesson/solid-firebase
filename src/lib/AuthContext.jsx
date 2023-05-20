import { createContext, createEffect, createSignal, useContext } from 'solid-js';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);

const AuthContext = createContext();

export function AuthProvider(props) {
	const [user, setUser] = createSignal(null);
	const [loading, setLoading] = createSignal(true);

	createEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userData) => {
			if (userData) {
				setUser(userData);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ user, loading }}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
