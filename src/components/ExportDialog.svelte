<script context="module" lang="ts">
	import { httpgd, httpgd_renderers } from "../stores";
	import { getModal } from "./Modal.svelte";

	const MODAL_ID = "export_plot";
	export function close_export_dialog() {
		getModal(MODAL_ID).close();
	}
	export function open_export_dialog() {
		getModal(MODAL_ID).open();
	}
	export function export_dialog_visible(): boolean {
		return getModal(MODAL_ID).isVisible();
	}
</script>

<script lang="ts">
	import Modal from "./Modal.svelte";
	import { httpgd_selected_plot } from "../stores";
	import NumInput from "./forms/NumInput.svelte";
	import Button from "./forms/Button.svelte";
	import Select from "./forms/Select.svelte";

	const MIN_PREVIEW_SIZE: number = 1;
	const MAX_PREVIEW_SIZE: number = 10000;
	const MIN_PREVIEW_ZOOM: number = 0.01;
	const MAX_PREVIEW_ZOOM: number = 10000;

	$: plot_url =
		$httpgd?.getPlotURL({
			id: $httpgd_selected_plot,
			width: 800,
			height: 600,
		}) || "plot-none.svg";

	$: renderers_items = $httpgd_renderers?.map((ren) => {
		return {
			id: ren.id,
			text: `${ren.name} (*${ren.ext})`,
			title: ren.descr,
		};
	});

	let selected_renderer_id = "svg";
</script>

<Modal id={MODAL_ID}>
	<div class="export-preview">
		<img id="exp-image" alt="Preview" src={plot_url} />
	</div>

	<div class="export-options">
		<div class="export-tools" style="float: left;">
			Size:
			<NumInput
				value="800"
				min={MIN_PREVIEW_SIZE}
				max={MAX_PREVIEW_SIZE}
			/>
			<span>&times;</span>
			<NumInput
				value="600"
				min={MIN_PREVIEW_SIZE}
				max={MAX_PREVIEW_SIZE}
			/>
			<span>~</span>
			<NumInput
				value="100"
				min={MIN_PREVIEW_ZOOM}
				max={MAX_PREVIEW_ZOOM}
			/>
			<span style="font-size: 20;">%</span>
		</div>

		<div class="export-tools" style="float: right;">
			<Select
				bind:selected_id={selected_renderer_id}
				items={renderers_items}
			/>
			<Button value="Open" />
			<Button value="Download" />
		</div>
	</div>
</Modal>

<style lang="scss">
	@import "../style_vars";

	.export-preview {
		text-align: center;

		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		align-items: center;
		justify-content: center;

		img {
			background-color: rgba(0, 0, 0, 0.2);
			width: auto;
			max-width: 100%;
			max-height: 100%;
			max-height: -webkit-fill-available; // Fixes RStudio webview. Remove when they update their web engine.
			box-shadow: $default-shadow;
		}
	}

	.export-options {
		font-family: $font-family;
		font-size: 16px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;

		margin-bottom: -14px;
		margin-top: 6px;

		.export-tools {
			span {
				vertical-align: middle;
				font-size: 24px;
				color: #888;
			}

			:global(.select-input) {
				margin-right: 10px;
			}

			:global(.num-input) {
				width: 80px;
			}
		}
	}
</style>
