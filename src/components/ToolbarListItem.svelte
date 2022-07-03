<script lang="ts">
    export let title: string;
    export let shortcut: string;
    export let danger: boolean = false;
</script>

<span title={`${title} (${shortcut})`} class:danger on:click>
    <slot />
    <span class="title">{title}</span>
    <span class="drop-kbd">{shortcut}</span>
</span>

<style lang="scss">
    @import "../style_vars";

    span {
        width: 100%;
        padding: 10px 14px 10px 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        fill: rgba(0, 0, 0, 0.5);

        & > :global(svg) {
            padding: 0px;
            padding-right: 10px;
            min-width: 24px;
            min-height: 24px;
            flex: 0;
        }

        & > .title {
            padding: 0px;
            padding-top: 4px;
            margin: 0px;
            flex: 1;
        }

        & > .drop-kbd {
            padding: 0px;
            padding-top: 4px;
            padding-left: 12px;
            color: rgba(0, 0, 0, 0.3);
            flex: 0;
        }
        
        & > .drop-kbd:hover {
            color: rgba(0, 0, 0, 0.3);
        }

        &.danger:hover {
            color: $warn-color;
            fill: $warn-color;

            & > .title:hover {
                color: $warn-color;
            }


            & > :global(svg) {
                fill: $warn-color;
            }
        }

        &:hover {
            background: #ebebeb;
            color: $highlight-color;
            & > :global(svg) {
                fill: $highlight-color;
            }
        }

        
    }
</style>
