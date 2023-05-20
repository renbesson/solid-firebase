import { Show } from 'solid-js';
import { getAuth, updateProfile } from '@firebase/auth';
import { firebaseApp } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

const auth = getAuth(firebaseApp);

export default function UpdateProfile() {
	const { user } = useAuth();

	const handleUpdateProfile = async (event) => {
		event.preventDefault();

		try {
			await updateProfile(auth.currentUser, {
				displayName: event.target[0].value,
				email: event.target[1].value,
			});
			window.location.reload();
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	};

	return (
		<Show when={user()}>
			<input type='checkbox' id='updateProfileModal' className='modal-toggle' />
			<div className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box relative'>
					<label
						htmlFor='updateProfileModal'
						className='btn btn-sm btn-circle absolute right-2 top-2'
					>
						✕
					</label>
					<h2 className='card-title font-semibold text-2xl'>Update Profile</h2>
					<form className='form-control w-full gap-2' onSubmit={handleUpdateProfile}>
						<div>
							<label className='label'>
								<span className='label-text'>Name</span>
							</label>
							<input
								id='updated-name'
								name='updated-name'
								autoComplete='updated-name'
								type='name'
								placeholder='Eg: Best Seller'
								className='input input-bordered w-full'
							/>
						</div>

						<div>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								id='updated-email'
								name='updated-email'
								autoComplete='updated-email'
								type='email'
								placeholder='Eg: bestseller@bell.ca'
								className='input input-bordered w-full'
							/>
						</div>

						<div>
							<button type='submit' className='btn btn-primary w-full'>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</Show>
	);
}
