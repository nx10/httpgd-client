<script lang="ts">
    import { onMount } from 'svelte';
	import type { HttpgdPlotId } from "httpgd/lib/types";
	import { httpgd, plots, selected_plot } from "../stores";
	import { TimedCallLimiterQueued } from "../utils";

    let width = 600;
    let height = 400;
    let img_element: HTMLImageElement;

    function resize_to_img() {
        if (!img_element) return;
        const rect = img_element.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
    }

    onMount(async () => {
		resize_to_img();
	});

    $: plot_url = $httpgd?.getPlotURL({ id: $selected_plot, width: width, height: height }) || 'plot-none.svg';

    const resize = new TimedCallLimiterQueued(() => {
        resize_to_img();
    }, 200);


    $: {
        console.log(plot_url);
    }

</script>

<svelte:window on:resize={() => resize.call()}/>

<img id="drawing" alt="Plot" crossorigin="anonymous" src="{plot_url}" bind:this={img_element} />

<style lang="scss">
    @import "../style_vars";

    #drawing {
        width: 100%;
        height: 100%;
        background-color: brown;
    }
</style>
