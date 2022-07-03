<script lang="ts">
  import type {HttpgdPlotId} from 'httpgd/lib/types';
  import {onDestroy} from 'svelte';
  import {
    httpgd,
    httpgd_plots,
    httpgd_selected_plot,
    show_sidebar,
    plot_width,
    plot_height,
    zoom_factor
  } from '../stores';
  import {get_image_element} from './PlotView.svelte';

  function plot_url(id: HttpgdPlotId) {
    return $httpgd?.getPlotURL({
      id: id,
      width: 400,
      height: 350,
      zoom: 1
    });
  }

  function remove_plot(id: HttpgdPlotId) {
    return $httpgd?.removePlot({id: id});
  }

  function select_plot(id: HttpgdPlotId) {
    $httpgd_selected_plot = id;
  }
</script>

<div class="history" class:nohist={!$show_sidebar} id="sidebar">
  {#if $httpgd_plots}
    {#each $httpgd_plots.plots as { id } (id)}
      <div
        class="history-item {$httpgd_selected_plot === id
          ? 'history-selected'
          : ''}"
      >
        <img
          src={plot_url(id)}
          on:click={() => select_plot(id)}
          alt="thumbnail"
        />
        <span on:click={() => remove_plot(id)}>&#10006;</span>
        <span class="thumbid" on:click={() => select_plot(id)}>{id}</span>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @import '../style_vars';

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

      &:hover {
        color: $warn-color;
      }

      &.thumbid {
        font-family: $font-family;
        font-size: 16px;
        bottom: 0;
        left: 0;
        top: auto;
        right: auto;
        //position: relative;

        //margin: 3px;
        //margin-right: 300px ;
        width: calc(100% - 4px);
        //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        text-align: center;

        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 0, 0, 0.4);

        &:hover {
          color: rgba(255, 255, 255, 1);
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
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

    .thumbid {
      color: rgba(255, 255, 255, 1);
      background-color: rgb(65, 144, 201) !important;
    }
  }
</style>
