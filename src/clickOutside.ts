export default function clickOutside(
  node: HTMLElement,
  onEventFunction: (event: MouseEvent) => void
) {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as HTMLElement)) {
      onEventFunction(event);
    }
  };

  document.addEventListener('mousedown', handleClick);

  return {
    destroy() {
      document.removeEventListener('mousedown', handleClick);
    }
  };
}
