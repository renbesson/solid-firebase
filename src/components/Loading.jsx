export default function Loading() {
	return (
		<div class='flex justify-center items-center h-full'>
			<div
				class=' text-primary inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
				role='status'
			></div>
		</div>
	);
}
