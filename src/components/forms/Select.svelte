<script lang="ts">
    interface SelectItem {
        id: any;
        text: string;
        title?: string;
    }

    export let selected_id: any;
    export let items: SelectItem[] = [];
</script>

<select class="select-input" bind:value={selected_id}>
    {#each items as item}
        <option value={item.id} title={item.title}>
            {item.text}
        </option>
    {/each}
</select>

<style lang="scss">
    @import "../../style_vars";
    .select-input {
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
</style>
