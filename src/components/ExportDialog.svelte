<script lang="ts">
	import clickOutside from "../clickOutside";
    import { plots, selected_plot } from "../stores";


</script>

<script context="module" lang="ts">
	let show_export_dialog = false;

	export function close_modal() {
		console.log("close modal")
		show_export_dialog = false;
	}
	export function open_modal() {
		console.log("open modal")
		show_export_dialog = true;
	}
</script>

{#if show_export_dialog}
<div id="exp-modal" class="modal">
	<div class="modal-content" use:clickOutside={close_modal}>
		<span id="exp-modal-close" on:click="{close_modal}">&times;</span>

		<div class="export-preview">
			<img id="exp-image" alt="Preview" src="plot-none.svg" />
		</div>

		<div class="export-options">
			<div class="export-tools" style="float: left;">
				Size:
				<input
					type="text"
					id="ie-width"
					class="num-input"
					value="800"
				/>
				<span>&times;</span>
				<input
					type="text"
					id="ie-height"
					class="num-input"
					value="600"
				/>
				<span>~</span>
				<input
					type="text"
					id="ie-scale"
					class="num-input"
					value="100"
				/>
				<span style="font-size: 20;">%</span>
			</div>

			<div class="export-tools" style="float: right;">
				<select id="ie-format" />
				<input
					id="ie-btn-open"
					class="but-input"
					type="button"
					value="Open"
				/>
				<input
					id="ie-btn-download"
					class="but-input"
					type="button"
					value="Download"
				/>
			</div>
		</div>
	</div>
</div>
{/if}

<style lang="scss">
	@import '../style_vars';

	.modal {
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

	.modal-content {
		background-color: #fefefe;
		margin: auto;
		padding: 8px 20px 20px 20px;
		width: 80%;
		height: 70%;

		display: flex;
		flex-direction: column;
	}

	#exp-modal-close {
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

			.num-input {
				width: 80px;
			}

			#ie-btn-open {
				margin-left: 10px;
			}
		}
	}

	.num-input,
	select {
		padding: 8px 16px;
		margin: 8px 0px;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.invalid-input {
		background-color: $warn-color-light;
	}

	.num-input:hover,
	.num-input:focus {
		border-color: $highlight-color;
		outline-color: $highlight-color;
	}

	.but-input {
		background-color: #888;
		color: white;
		padding: 8px 16px;
		margin: 8px 0px;
		border: none;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background-color: $highlight-color;
		}
	}
</style>
