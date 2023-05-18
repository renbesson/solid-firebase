import { A } from '@solidjs/router';
import { Show } from 'solid-js';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from '@firebase/auth';
import firebase_app from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

const auth = getAuth(firebase_app);

export default function SignUp() {
	const { user } = useAuth();

	const handleSignUp = async (event) => {
		event.preventDefault();

		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				event.target[1].value,
				event.target[2].value
			);

			await updateProfile(result.user, {
				displayName: event.target[0].value,
			});
			window.location.reload();
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	};

	return (
		<Show when={!user()}>
			<input type='checkbox' id='signUpModal' className='modal-toggle' />
			<div className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box relative'>
					<label htmlFor='signUpModal' className='btn btn-sm btn-circle absolute right-2 top-2'>
						✕
					</label>
					<h2 className='card-title font-semibold text-2xl'>Sign Up</h2>
					<form className='form-control w-full gap-2' onSubmit={handleSignUp}>
						<div>
							<label className='label'>
								<span className='label-text'>Name</span>
							</label>
							<input
								id='name'
								name='name'
								autoComplete='name'
								type='name'
								required
								placeholder='Eg: Best Seller'
								className='input input-bordered w-full'
							/>
						</div>

						<div>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								id='new-email'
								name='new-email'
								autoComplete='new-email'
								type='email'
								required
								placeholder='Eg: bestseller@bell.ca'
								className='input input-bordered w-full'
							/>
						</div>

						<div>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<input
								id='new-password'
								name='new-password'
								autoComplete='new-password'
								type='password'
								required
								minLength={8}
								placeholder='Type you password'
								className='input input-bordered w-full'
							/>
						</div>

						<div className='flex justify-between text-sm'>
							<a href='#' className='text-primary'>
								Forgot your password?
							</a>
							<A href='/signup' className='text-secondary'>
								Have an Account?
							</A>
						</div>

						<div>
							<button type='submit' className='btn btn-primary w-full'>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</Show>
	);
}
