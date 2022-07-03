<script context="module" lang="ts">
  let IMAGE_ELEMENT: HTMLImageElement = null;

  export function set_image_element(img: HTMLImageElement) {
    IMAGE_ELEMENT = img;
  }

  export function get_image_element() {
    return IMAGE_ELEMENT;
  }
</script>

<script lang="ts">
  import {onDestroy, onMount} from 'svelte';
  import type {HttpgdPlotId} from 'httpgd/lib/types';
  import {
    httpgd,
    httpgd_selected_plot,
    show_sidebar,
    zoom_factor,
    plot_height,
    plot_width
  } from '../stores';
  import {TimedCallLimiterQueued, Timer} from '../utils';

  const COOLDOWN_RESIZE = 200;

  let img_element: HTMLImageElement;
  let stretch = false;

  function resize_to_img() {
    if (!img_element) return;
    const rect = img_element.getBoundingClientRect();
    $plot_width = rect.width;
    $plot_height = rect.height;
  }

  onMount(() => {
    set_image_element(img_element);
    resize_to_img();
  });

  $: plot_url =
    $httpgd?.getPlotURL({
      id: $httpgd_selected_plot,
      width: $plot_width,
      height: $plot_height,
      zoom: $zoom_factor
    }) || 'plot-none.svg';

  const resize = new TimedCallLimiterQueued(() => {
    resize_to_img();
  }, COOLDOWN_RESIZE);

  // Time resize after sidebar toggle animation
  const sidebar_toggle_timer = new Timer(() => resize_to_img(), 302);

  onDestroy(
    show_sidebar.subscribe(() => {
      sidebar_toggle_timer.restart();
    })
  );
</script>

<svelte:window on:resize={() => resize.call()} />

<img
  class:stretch
  alt="Plot"
  crossorigin="anonymous"
  src={plot_url}
  bind:this={img_element}
/>

<style lang="scss">
  //@import "../style_vars";

  img {
    width: 100%;
    height: 100%;
  }
</style>
