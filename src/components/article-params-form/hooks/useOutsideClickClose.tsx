import { RefObject, useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	onClose,
	rootRef,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen, onClose]);
};
