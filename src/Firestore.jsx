import { addDoc, collection, deleteDoc, doc, query, setDoc } from 'firebase/firestore';
import { timedToast } from './components/CustomToast';
import { db } from './lib/firebase';
import { useCollection } from './lib/firebaseHooks';
import { Match, Show, Switch } from 'solid-js';
import Loading from './components/Loading';

export default function Firestore() {
	const data = useCollection(collection(db, 'places'));
	let form = null;

	const handleAddCity = async (event) => {
		event.preventDefault();

		try {
			await addDoc(collection(db, 'places'), {
				city: event.target[0].value,
				country: event.target[1].value,
			});
			form.reset();
		} catch (error) {
			console.error(error);
			throw new Error(error.message);
		}
	};

	const handleDeleteCity = async (event) => {
		event.preventDefault();

		try {
			await deleteDoc(doc(db, 'places', event.target.id));
		} catch (error) {
			console.error(error);
			throw new Error(error.message);
		}
	};

	return (
		<Switch>
			<Match when={data.loading}>
				<Loading />
			</Match>
			<Match when={data.error}>
				<p>`Error occurred: ${error}`</p>
			</Match>
			<Match when={!data.loading && !data.error}>
				<p class='text-4xl text-primary text-center py-20'>Firestore Example</p>

				<div class='flex flex-col md:flex-row justify-center gap-10'>
					<div class='card w-96 shadow-lg shadow-secondary self-center'>
						<div class='card-body'>
							<form ref={form} class='form-control w-full gap-2' onSubmit={handleAddCity}>
								<div>
									<label class='label'>
										<span class='label-text'>City</span>
									</label>
									<input
										id='city'
										name='city'
										autoComplete='city'
										type='text'
										required
										placeholder='Eg: Barcelona'
										class='input input-bordered w-full'
									/>
								</div>

								<div>
									<label class='label'>
										<span class='label-text'>Country</span>
									</label>
									<input
										id='country'
										name='country'
										autoComplete='country'
										type='text'
										required
										placeholder='Eg: Spain'
										class='input input-bordered w-full'
									/>
								</div>

								<div class='card-actions justify-end'>
									<button class='btn btn-primary'>Add City</button>
								</div>
							</form>
						</div>
					</div>

					<div class='card w-96 shadow-lg shadow-secondary self-center md:self-auto'>
						<table class='table self-center w-full'>
							<thead>
								<tr>
									<th>City</th>
									<th>Country</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{data?.data?.map((row, index) => (
									<tr key={index}>
										<td>{row.city}</td>
										<td>{row.country}</td>
										<td>
											<button className='btn btn-error btn-sm w-full' id={row.id} onClick={handleDeleteCity}>
												X
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</Match>
		</Switch>
	);
}
