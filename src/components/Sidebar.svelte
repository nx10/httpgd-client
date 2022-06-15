<script lang="ts">
    import type { HttpgdPlotId } from "httpgd/lib/types";
    import { httpgd, plots, selected_plot } from "../stores";

    let plot_id: HttpgdPlotId = null;

    $: {
        const p = $plots?.plots;
        if (p && p.length > 0) plot_id = p[0].id;
    }

    function plot_url(id: HttpgdPlotId) {
        return $httpgd?.getPlotURL({ id: id });
    }

    function remove_plot(id: HttpgdPlotId) {
        return $httpgd?.removePlot({ id: id });
    }

    function select_plot(id: HttpgdPlotId) {
        console.log('aa');
        $selected_plot = id;
    }

</script>

<div class="history" id="sidebar">
    {#if $plots}
        {#each $plots.plots as { id } (id)}
            <div class="history-item {$selected_plot === id ? "history-selected" : ""}">
                <img src={plot_url(id)} on:click="{() => select_plot(id)}" alt="thumbnail" />
                <span on:click="{() => remove_plot(id)}">&#10006;</span>
            </div>
        {/each}
    {/if}
</div>

<style lang="scss">
    @import "../style_vars";

    .history {
        width: $sidebar-width;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        position: fixed;
        top: 0;
        right: 0;
        transition: right $ttime;
        background-color: rgb(252, 252, 252);
    }

    .history.nohist {
        right: -$sidebar-width;
        visibility: hidden;
        transition: right $ttime, visibility $ttime;
    }

    .history-item {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin: 8px;
        cursor: pointer;
        position: relative;
        background-color: rgb(255, 255, 255);

        img {
            width: 100%;
            height: 12vw;
        }
        span {
            position: absolute;
            top: 0;
            right: 0;
            color: rgba(0, 0, 0, 0.5);
            text-decoration: none;
            font-weight: bold;
            font-size: 22px;
            padding: 0px 4px 0px 0px;
            margin: -2px 0px 0px 0px;
            display: none;
        }
        span:hover {
            color: $warn-color;
        }

        &:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
            span {
                display: inline;
            }
        }
    }

    .history-selected {
        outline: rgba(0, 119, 204, 0.3) solid 3px;
    }
</style>
