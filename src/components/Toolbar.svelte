<script lang="ts">
    import ToolbarItem from "./ToolbarItem.svelte";
    import ToolbarListItem from "./ToolbarListItem.svelte";
    import {
        httpgd,
        httpgd_plots,
        httpgd_renderers,
        httpgd_selected_plot,
        show_sidebar,
        zoom,
        zoom_level,
        zoom_factor,
        zoom_percent,
        plot_width,
        plot_height,
    } from "../stores";
    import { KbdShortcutRegisty } from '../keyboard';
    import { copyClipboardPNG, copyImgSVGasPNG, downloadImgPNG, downloadImgSVG, downloadURL } from '../utils';
    import { open_export_dialog, export_dialog_visible } from "./ExportDialog.svelte";

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
    import { get_image_element } from "./PlotView.svelte";

    let dropopen: boolean = false;
    export let fadeout: boolean = false;

    function showDropdown() {
        dropopen = true;
    }
    function hideDropdown() {
        dropopen = false;
    }

    function zoomReset() {
        $zoom_level = 0;
    }

    $: plot_index = $httpgd_plots?.plots.findIndex(
        (e) => e.id == $httpgd_selected_plot
    );
    $: plot_count = $httpgd_plots?.plots.length;

    $: plot_index_nav_string = `${
        plot_index !== undefined ? plot_index + 1 : 0
    }/${plot_count || 0}`;

    
    function plots_navigate(offset: number) {
        if (!$httpgd_plots?.plots?.length) return;
        let index = plot_index + offset;
        while (index < 0) {
            index += $httpgd_plots?.plots?.length;
        }
        $httpgd_selected_plot = $httpgd_plots.plots[index % $httpgd_plots.plots.length].id
    }

    function plots_navigate_newest() {
        if (!$httpgd_plots?.plots?.length) return;
        $httpgd_selected_plot = $httpgd_plots.plots[$httpgd_plots.plots.length - 1].id;
    }

    function toggle_sidebar() {
        $show_sidebar = !$show_sidebar;
    }

    function clear_plots() {
        $httpgd?.clearPlots();
    }
    function remove_selected() {
        $httpgd.removePlot({
            id: $httpgd_selected_plot
        });
    }

    function downloadSVG(): void {
        downloadImgSVG(get_image_element(), 'plot.svg');
    }

    $: png_renderer_available = $httpgd_renderers?.findIndex((v) => v.id === "png") !== -1;

    function downloadPNG(): void {
        if (!png_renderer_available) {
            console.log('Fallback PNG render from SVG client side.');
            downloadImgPNG(get_image_element(), 'plot.png');
            return;
        }
        downloadURL($httpgd.getPlotURL({
            width: $plot_width,
            height: $plot_height,
            zoom: $zoom_factor,
            download: 'plot.png',
            id: $httpgd_selected_plot,
            renderer: 'png',
        }));
        
    }

    function copyPNG(): void {
        if (!png_renderer_available) {
            console.log('Fallback PNG render from SVG client side.');
            copyImgSVGasPNG(get_image_element());
            return;
        }

        copyClipboardPNG($httpgd.getPlotURL({
            width: $plot_width,
            height: $plot_height,
            zoom: $zoom_factor,
            id: $httpgd_selected_plot,
            renderer: 'png',
        }))
    }

    
    let shortcuts = new KbdShortcutRegisty([
            {
                keys: [37, 40],
                f: () => plots_navigate(-1),
            },
            {
                keys: [39, 38],
                f: () => plots_navigate(1),
            },
            {
                keys: [78],
                f: () => plots_navigate_newest(),
            },
            {
                keys: [187],
                f: () => zoom(1),
            },
            {
                keys: [189],
                f: () => zoom(-1),
            },
            {
                keys: [48],
                f: () => zoomReset(),
            },
            {
                altKey: true,
                keys: [68],
                f: () => clear_plots(),
            },
            {
                keys: [46, 68],
                f: () => remove_selected(),
            },
            {
                keys: [83],
                f: () => downloadSVG(),
            },
            {
                keys: [80],
                f: () => downloadPNG(),
            },
            {
                keys: [67],
                f: () => copyPNG(),
            },
            {
                keys: [72],
                f: () => open_export_dialog(),
            },
            {
                keys: [69],
                f: () => open_export_dialog(),
            },
        ]);

    function handleKeydown(ev: KeyboardEvent) {
        if (export_dialog_visible()) return;
        shortcuts.handle(ev);
    }

    function close_drop_and(f: () => void) {
        return () => {
            hideDropdown();
            f();
        };
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div id="toolbar" class:fadeout>
    <div id="tb-tools">
        <span>
            <ToolbarItem
                title="Previous"
                shortcut="&larr;"
                on:click={() => plots_navigate(-1)}
                >{@html iconArrowLeft}</ToolbarItem
            >
            <ToolbarItem
                title="Newest"
                shortcut="N"
                on:click={plots_navigate_newest}
                >{plot_index_nav_string}</ToolbarItem
            >
            <ToolbarItem
                title="Next"
                shortcut="&rarr;"
                on:click={() => plots_navigate(1)}
                >{@html iconArrowRight}</ToolbarItem
            >
        </span>
        <span>
            <ToolbarItem title="Zoom out" shortcut="-" on:click={() => zoom(-1)}
                >{@html iconMagnifyMinus}</ToolbarItem
            >
            <ToolbarItem
                title="Reset zoom"
                shortcut="0"
                on:click={() => zoomReset()}>{$zoom_percent}</ToolbarItem
            >
            <ToolbarItem title="Zoom in" shortcut="+" on:click={() => zoom(1)}
                >{@html iconMagnifyPlus}</ToolbarItem
            >
        </span>
        <span>
            <ToolbarItem title="Delete" shortcut="D" danger on:click={remove_selected}
                >{@html iconCross}</ToolbarItem
            >
        </span>
        <span
            class="drop"
            class:dropopen
            on:mouseenter={showDropdown}
            on:mouseleave={hideDropdown}
        >
            <span title="More" id="tb-more">
                {@html iconVdots}
            </span>
            <ul>
                <li>
                    <ToolbarListItem
                        title="Download SVG"
                        shortcut="S"
                        on:click={close_drop_and(downloadSVG)}
                        >{@html iconDownload}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem
                        title="Download PNG"
                        shortcut="P"
                        on:click={close_drop_and(downloadPNG)}
                        >{@html iconImage}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem
                        title="Copy PNG"
                        shortcut="C"
                        on:click={close_drop_and(copyPNG)}
                        >{@html iconCopy}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem
                        title="Clear all plots"
                        shortcut="Alt+D"
                        danger
                        on:click={close_drop_and(clear_plots)}
                        >{@html iconTrash}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem
                        title="Export"
                        shortcut="E"
                        on:click={close_drop_and(open_export_dialog)}
                        >{@html iconExport}</ToolbarListItem
                    >
                </li>
                <li>
                    <ToolbarListItem
                        title="Show history"
                        shortcut="H"
                        on:click={close_drop_and(toggle_sidebar)}
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

    .fadeout {
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

    .dropopen :global(ul) {
        transform: scale(1) !important;
    }

    .notransition {
        transition: none !important;
    }
</style>
