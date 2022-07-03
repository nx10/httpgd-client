<script lang="ts">
  import ExportDialog from './components/ExportDialog.svelte';
  import Toolbar from './components/Toolbar.svelte';
  import Overlay from './components/Overlay.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import PlotView from './components/PlotView.svelte';

  const DELAY_FADE_OUT = 4000;

  import {
    httpgd,
    httpgd_plots,
    httpgd_selected_plot,
    httpgd_connected,
    httpgd_renderers,
    show_sidebar
  } from './stores.js';

  import {Httpgd} from 'httpgd';
  import {Timer} from './utils';
  import {onDestroy} from 'svelte';

  const sparams = new URL(window.location.href).searchParams;

  const hgd = sparams.get('hgd') || sparams.get('host') || window.location.host;
  const token = sparams.get('token') || undefined;
  const ws = sparams.has('ws') ? sparams.get('ws') != '0' : true;
  const sidebar = sparams.has('sidebar')
    ? sparams.get('sidebar') == '0'
    : false;

  onDestroy(
    httpgd.subscribe(httpgd => {
      if (!httpgd) {
        return;
      }
      httpgd.onPlotsChanged(newState => {
        $httpgd_plots = newState;
        if (newState?.plots.length > 0) {
          $httpgd_selected_plot = newState.plots[newState.plots.length - 1].id;
        }
      });
      httpgd.onConnectionChanged(connected => {
        $httpgd_connected = connected;
      });
      httpgd
        .connect()
        .then(() => {
          console.log(`Connected to ${httpgd.getInfo().version.httpgd}`);
          $httpgd_renderers = httpgd.getRenderers();
        })
        .catch(error => {
          console.log(error);
        });
    })
  );

  $httpgd = new Httpgd(hgd, token, ws);

  let fadeout_toolbar = false;

  const fadeout_timer = new Timer(
    () => (fadeout_toolbar = true),
    DELAY_FADE_OUT
  );
  onDestroy(() => fadeout_timer.stop());

  fadeout_timer.start();

  function mousemove() {
    fadeout_toolbar = false;
    fadeout_timer.restart();
  }
  function mouseleave() {
    fadeout_timer.finish();
  }
</script>

<div id="container">
  <Overlay />
  <ExportDialog />
  <div
    id="plotarea"
    class:nohist={!$show_sidebar}
    on:mousemove={() => mousemove()}
    on:mouseleave={() => mouseleave()}
  >
    <Toolbar bind:fadeout={fadeout_toolbar} />
    <!-- <div class="loader"></div> -->
    <PlotView />
  </div>
  <Sidebar />
</div>

<style lang="scss">
  @import './style_vars';

  :global(html) {
    height: 100%;
  }

  :global(body) {
    margin: 0;
    height: 100%;
  }

  #container {
    height: 100%;
    display: relative;
  }

  #plotarea {
    height: 100%;
    width: 100% - $sidebar-width;
    position: relative;
    transition: width $ttime;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  #plotarea.nohist {
    width: 100%;
    transition: width $ttime;
  }
</style>
