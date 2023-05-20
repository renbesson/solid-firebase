import { createEffect, createSignal, onCleanup } from 'solid-js';
import toast from 'solid-toast';

export const timedToast = (message) => {
	// Toast with a countdown timer
	const duration = 3000;

	toast.custom(
		(t) => {
			// Start with 100% life
			const [life, setLife] = createSignal(100);
			const startTime = Date.now();
			createEffect(() => {
				if (t.paused) return;
				const interval = setInterval(() => {
					const diff = Date.now() - startTime - t.pauseDuration;
					setLife(100 - (diff / duration) * 100);
				});

				onCleanup(() => clearInterval(interval));
			});

			return (
				<div
					class={`${
						t.visible ? 'animate-enter' : 'animate-leave'
					} bg-transparent backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg min-w-[350px]`}
				>
					<div class='flex gap-2'>
						<div class='flex flex-1 flex-col'>
							<div className='text-white text-shadow'>
								{message}
							</div>
						</div>
						<div class='flex items-center'>
							<button
								class='btn btn-xs btn-primary'
								onClick={() => toast.dismiss(t.id)}
							>
								x
							</button>
						</div>
					</div>
					<div class='relative pt-4'>
						<div class='w-full h-1 rounded-full bg-cyan-900'></div>
						<div
							class='h-1 top-4 absolute rounded-full bg-secondary'
							style={{ width: `${life()}%` }}
						></div>
					</div>
				</div>
			);
		},
		{
			duration: duration,
		}
	);
};
