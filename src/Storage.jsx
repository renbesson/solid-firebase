import { timedToast } from './components/CustomToast';
import { storage } from './lib/firebase';
import { useStorage } from './lib/firebaseHooks';
import { Match, Switch, createResource } from 'solid-js';
import Loading from './components/Loading';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';

const fetchFiles = async () => await useStorage(ref(storage, 'places'));

export default function Storage() {
	const [data, { refetch }] = createResource(fetchFiles);
	let form;

	const handleAddFile = async (event) => {
		event.preventDefault();
		const file = event.target[0].files[0];
		if (!file) return timedToast('Please select a file first.');
		try {
			const fileRef = ref(storage, `places/${file.name}`);
			const snapshot = await uploadBytes(fileRef, file);
			refetch();
		} catch (error) {
			console.error(error);
			throw new Error(error.message);
		}
	};

	const handleDeleteFile = async (event) => {
		event.preventDefault();

		try {
			const fileRef = ref(storage, event.target.id);
			deleteObject(fileRef);
			refetch();
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
				<p class='text-4xl text-primary text-center py-20'>Storage Example</p>

				<div class='flex flex-col md:flex-row justify-center gap-10'>
					<div class='card w-96 shadow-lg shadow-secondary self-center'>
						<div class='card-body'>
							<form ref={form} class='form-control w-full gap-2' onSubmit={handleAddFile}>
								<div class='mb-3'>
									<label
										for='formFile'
										class='mb-2 inline-block text-neutral-700 dark:text-neutral-200'
									>
										Upload a File
									</label>
									<input
										class='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
										id='fileInput'
										type='file'
										accept='image/png, image/gif, image/jpeg'
									/>
								</div>

								<div class='card-actions justify-end'>
									<button class='btn btn-primary'>Upload</button>
								</div>
							</form>
						</div>
					</div>

					<div class='card w-96 shadow-lg shadow-secondary self-center md:self-auto'>
						{data()?.map(({ url, fullPath }) => (
							<figure>
								<img src={url} id={fullPath} alt='' />
								<button
									className='btn btn-error absolute right-0 top-0'
									id={fullPath}
									onClick={handleDeleteFile}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6'
										id={fullPath}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
										/>
									</svg>
								</button>
							</figure>
						))}
						<div className='card-actions justify-end'></div>
					</div>
				</div>
			</Match>
		</Switch>
	);
}
