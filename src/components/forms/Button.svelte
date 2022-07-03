<script lang="ts">
    export let value: string = "Button";
</script>

<input class="but-input" type="button" bind:value on:click />

<style lang="scss">
	@import "../../style_vars";

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