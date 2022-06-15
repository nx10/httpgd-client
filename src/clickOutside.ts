export default function clickOutside(node, onEventFunction: (event: MouseEvent) => void) {
    const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target)) {
			onEventFunction(event);
		}
	};

    document.addEventListener("mousedown", handleClick);

    return {
        destroy() {
            document.removeEventListener("mousedown", handleClick);
        }
    }
}