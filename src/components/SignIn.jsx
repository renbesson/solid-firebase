import { A } from '@solidjs/router';
import { Show } from 'solid-js';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import firebase_app from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

const auth = getAuth(firebase_app);

export default function SignIn() {
	const { user } = useAuth();

	const handleSignIn = async (event) => {
		event.preventDefault();

		try {
			await signInWithEmailAndPassword(auth, event.target[0].value, event.target[1].value);
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	};

	return (
		<Show when={!user()}>
			<input type='checkbox' id='signInModal' className='modal-toggle' />
			<div className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box relative'>
					<label htmlFor='signInModal' className='btn btn-sm btn-circle absolute right-2 top-2'>
						✕
					</label>
					<h2 className='card-title font-semibold text-2xl'>Sign In</h2>
					<form className='form-control w-full gap-2' onSubmit={handleSignIn}>
						<div>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								id='email'
								name='email'
								autoComplete='email'
								type='email'
								required
								placeholder='Eg: bestpet@socialpet.ca'
								className='input input-bordered w-full'
							/>
						</div>

						<div>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<input
								id='current-password'
								name='current-password'
								autoComplete='current-password'
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
							<A href='/signin' className='text-secondary'>
								Don't have an Account?
							</A>
						</div>

						<div>
							<button type='submit' className='btn btn-primary w-full'>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</Show>
	);
}
