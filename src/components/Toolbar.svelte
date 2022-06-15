<script lang="ts">
    import ToolbarItem from "./ToolbarItem.svelte";
    import ToolbarListItem from "./ToolbarListItem.svelte";
    import { data } from "../toolbarData";
    import { plots, selected_plot } from "../stores";
    import { open_modal } from "./ExportDialog.svelte";

    import iconArrowLeft from "../icons/arrow-left.svg";
    import iconArrowRight from "../icons/arrow-right.svg";
    import iconCopy from "../icons/copy.svg";
    import iconCross from "../icons/cross.svg";
    import iconDownload from "../icons/download.svg";
    import iconExport from "../icons/export.svg";
    import iconHamburger from "../icons/hamburger.svg";
    import iconImage from "../icons/image.svg";
    import iconMagnifyMinus from "../icons/magnify-minus.svg";
    import iconMagnifyPlus from "../icons/magnify-plus.svg";
    import iconTrash from "../icons/trash.svg";
    import iconVdots from "../icons/vdots.svg";

    function showDropdown(e: MouseEvent) {
        (e.target as HTMLElement).classList.add("drop-open");
    }
    function hideDropdown(e: MouseEvent) {
        (e.target as HTMLElement).classList.remove("drop-open");
    }

    $: plot_index = $plots?.plots.findIndex((e) => e.id == $selected_plot);
    $: plot_count = $plots?.plots.length;

    function click_export() {
        open_modal();
    }
</script>

<div id="toolbar">
    <div id="tb-tools">
        <span>
            <ToolbarItem title="Previous" shortcut="&larr;"
                >{@html iconArrowLeft}</ToolbarItem
            >
            <ToolbarItem title="Newest" shortcut="N"
                >{`${plot_index || 0}/${plot_count || 0}`}</ToolbarItem
            >
            <ToolbarItem title="Next" shortcut="&rarr;"
                >{@html iconArrowRight}</ToolbarItem
            >
        </span>
        <span>
            <ToolbarItem title="Zoom out" shortcut="-"
                >{@html iconMagnifyMinus}</ToolbarItem
            >
            <ToolbarItem title="Reset zoom" shortcut="0">100%</ToolbarItem>
            <ToolbarItem title="Zoom in" shortcut="+"
                >{@html iconMagnifyPlus}</ToolbarItem
            >
        </span>
        <span>
            <ToolbarItem title="Delete" shortcut="D"
                >{@html iconCross}</ToolbarItem
            >
        </span>
        <span
            class="drop"
            on:mouseenter={showDropdown}
            on:mouseleave={hideDropdown}
        >
            <span title="More" id="tb-more">
                {@html iconVdots}
            </span>
            <ul>
                <li>
                    <ToolbarListItem title="Download SVG" shortcut="S"
                        >{@html iconDownload}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem title="Download PNG" shortcut="P"
                        >{@html iconImage}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem title="Copy PNG" shortcut="C"
                        >{@html iconCopy}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem title="Clear all plots" shortcut="Alt+D"
                        >{@html iconTrash}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem title="Export" shortcut="E"
                        on:click="{click_export}">{@html iconExport}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem title="Show history" shortcut="H"
                        >{@html iconHamburger}</ToolbarListItem
                    >
                </li>
            </ul>
        </span>
    </div>
</div>

<style lang="scss">
    @import "../style_vars";

    #toolbar {
        float: left;
        position: absolute;
        right: 0px;
        top: 0px;
        font-family: $font-family;
        font-size: 18px;
        font-weight: bold;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: rgba(253, 253, 254, 0.8);
        border-color: rgba(253, 253, 254, 0.8);
        border-radius: 2px;
    }

    #tb-tools {
        white-space: nowrap;
        & > span {
            padding: 2px 2px 2px 2px;
            margin: 0px 2px 0px 2px;
            color: rgba(0, 0, 0, 0.5);
            cursor: pointer;
        }
    }

    #tb-more {
        & > :global(.icon) {
            width: 24px;
            height: 24px;
            position: relative;
            top: 5px;
            fill: rgba(0, 0, 0, 0.5);

            &:hover {
                fill: $highlight-color;
            }
        }
    }

    :global(.icon-warn:hover) {
        fill: $warn-color;
    }

    .fade-out {
        opacity: 0;
        transform: translateY(-100px);
        transition: opacity 0.5s, transform 0.5s step-end 0.5s;
    }

    .drop {
        position: relative;
        display: inline-block;
        height: 34px;
        ul {
            position: absolute;
            right: -2px;
            top: 20px;
            transition: all $ttime ease;
            transform: scale(0);
            transform-origin: top right;
            box-shadow: $default-shadow;
            padding: 0px;
            background-color: #fff;
            font-size: 16px;
            font-weight: bold;

            li {
                display: block;
                width: 100%;
            }
        }
    }

    :global(.drop-open ul) {
        transform: scale(1) !important;
    }

    .notransition {
        transition: none !important;
    }
</style>
