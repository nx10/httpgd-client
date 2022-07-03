<script lang="ts">
    export let value: string = "0";
    export let min: number = 0;
    export let max: number = 100;


    function validate(num: string) {
        if (!num.match(/^\d+$/)) return false;
        const v = parseInt(num);
        return (v >= min) && (v <= max);
    }
    
    $: invalid = !validate(value);
</script>

<input type="text" class="num-input" class:invalid bind:value />

<style lang="scss">
	@import "../../style_vars";

    .num-input {
		padding: 8px 16px;
		margin: 8px 0px;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;

        &:hover,
	    &:focus {
            border-color: $highlight-color;
            outline-color: $highlight-color;
	    }
	}

	.invalid {
		background-color: $warn-color-light;
        
        &:hover,
	    &:focus {
            border-color: $warn-color;
            outline-color: $warn-color;
	    }
	}

	
</style>