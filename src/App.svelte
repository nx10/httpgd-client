<script lang="ts">
	import ExportDialog from "./components/ExportDialog.svelte";
	import Toolbar from "./components/Toolbar.svelte";
	import Overlay from "./components/Overlay.svelte";
	import Sidebar from "./components/Sidebar.svelte";
	import PlotView from "./components/PlotView.svelte";

	import { httpgd, plots, selected_plot } from './stores.js';

	import { Httpgd } from "httpgd";

	const sparams = new URL(window.location.href).searchParams;

	const hgd =
		sparams.get("hgd") || sparams.get("host") || window.location.host;
	const token = sparams.get("token") || undefined;
	const ws = sparams.has("ws") ? sparams.get("ws") != "0" : true;
	const sidebar = sparams.has("sidebar")
		? sparams.get("sidebar") == "0"
		: false;
	

	httpgd.subscribe((httpgd) => {
		if (!httpgd) { return; }
		httpgd.onPlotsChanged((newState) => {
			$plots = newState;
			if (newState?.plots.length > 0) {
				$selected_plot = newState.plots[newState.plots.length-1].id;
			}
		});
		httpgd.connect().then(() => {
			console.log("Connected to " + httpgd.getInfo().version);
		});
	});

	$httpgd = new Httpgd(hgd, token, ws);

	let showExportDialog = true;
</script>

<div id="container">
	<Overlay />
	<ExportDialog />
	<div id="plotarea">
		<Toolbar />
		<!-- <div class="loader"></div> -->
		<PlotView />
	</div>
	<Sidebar />
</div>

<style lang="scss">
	@import "./style_vars";

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
