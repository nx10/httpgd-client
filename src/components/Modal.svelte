<script context="module" lang="ts">
    interface ModalHandle {
        open: () => void;
        close: () => void;
        isVisible: () => boolean;
    }

    type ModalId = string;

    let onTop: HTMLElement;
    const modals: { [key: ModalId]: ModalHandle } = {};

    export function getModal(id: ModalId): ModalHandle {
        return modals[id];
    }

    function registerModal(id: ModalId, handle: ModalHandle) {
        modals[id] = handle;
    }

    function unregisterModal(id: ModalId) {
        delete modals[id];
    }
</script>

<script lang="ts">
    import { onDestroy } from "svelte";

    let topDiv: HTMLElement;
    let visible: boolean = false;
    let prevOnTop: HTMLElement;

    export let id: ModalId = "";

    function closeModal() {
        if (!visible) {
            return;
        }
        window.removeEventListener("keydown", keyPress);
        onTop = prevOnTop;
        //if (onTop == null) document.body.style.overflow = "";
        visible = false;
    }

    function openModal() {
        if (visible) {
            return;
        }
        prevOnTop = onTop;
        onTop = topDiv;
        window.addEventListener("keydown", keyPress);

        //this prevents scrolling of the main window on larger screens
        //document.body.style.overflow = "hidden";

        visible = true;
        //Move the modal in the DOM to be the last child of <BODY> so that it can be on top of everything
        document.body.appendChild(topDiv);
    }

    function isVisible() {
        return visible;
    }

    function keyPress(ev: KeyboardEvent) {
        //only respond if the current modal is the top one
        if (ev.key == "Escape" && onTop == topDiv) closeModal(); //ESC
    }

    registerModal(id, {
        open: openModal,
        close: closeModal,
        isVisible: isVisible
    });

    onDestroy(() => {
        unregisterModal(id);
        window.removeEventListener("keydown", keyPress);
    });
</script>

<div id="modal" class:visible bind:this={topDiv} on:click={() => closeModal()}>
    <div id="modal-content" on:click|stopPropagation={() => {}}>
        <span id="modal-close" on:click={() => closeModal()}>&times;</span>
        <slot />
    </div>
</div>

<style lang="scss">
    @import "../style_vars";

    .visible {
        visibility: visible !important;
    }

    #modal {
        visibility: hidden;
        position: fixed;
        z-index: 10;
        padding-top: 10vh;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }

    #modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 8px 20px 20px 20px;
        width: 80%;
        height: 70%;

        display: flex;
        flex-direction: column;
    }

    #modal-close {
        color: #aaaaaa;
        float: right;
        font-size: 32px;
        font-weight: bold;

        display: flex;
        flex-direction: column;
        text-align: right;

        &:hover,
        &:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
    }
</style>
