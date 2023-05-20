import { onSnapshot } from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { onCleanup } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import { storage } from './firebase';

export function useCollection(query) {
	const [state, setState] = createStore({
		data: null,
		loading: true,
		error: null,
	});

	function batchData(snapshot) {
		if (snapshot.empty) return null;
		const batch = snapshot.docs.map((doc) => {
			const data = doc.data();
			if (data) {
				Object.defineProperty(data, 'id', {
					value: doc.id.toString(),
					writable: false,
				});
			}

			return data;
		});

		return batch;
	}

	const unsubscribe = onSnapshot(
		query,
		(snapshot) => {
			setState(
				reconcile({
					loading: false,
					data: batchData(snapshot),
					error: null,
				})
			);
		},
		(error) => {
			setState(
				reconcile({
					loading: false,
					data: null,
					error,
				})
			);
		}
	);

	onCleanup(() => {
		unsubscribe();
	});
	return state;
}

export async function useStorage(storageRef) {
	const { items } = await listAll(storageRef);
	let urls = await Promise.all(
		items.map(async (item) => {
			const fullPath = item.fullPath;
			const itemRef = ref(storage, fullPath);
			try {
				const url = await getDownloadURL(itemRef);
				return { url, fullPath };
			} catch (error) {
				return { ...item, error };
			}
		})
	);

	return urls;
}
