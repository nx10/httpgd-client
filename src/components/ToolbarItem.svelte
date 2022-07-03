<script lang="ts">
  export let title: string;
  export let shortcut: string;
  export let danger = false;
</script>

<span title={`${title} (${shortcut})`} class="tooltip" class:danger on:click>
  <slot />
  <span class="tooltiptext">{title}</span>
</span>

<style lang="scss">
  @import '../style_vars';

  .tooltip {
    margin: 0px -2px 0px -2px;

    &:hover {
      color: $highlight-color;
    }
    &.danger:hover {
      fill: $warn-color;
    }

    position: relative;
    display: inline-block;

    .tooltiptext {
      visibility: hidden;
      font-size: 12px;
      font-weight: normal;
      width: 80px;
      background-color: rgb(71, 71, 71);
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0px;
      position: absolute;
      z-index: 1;
      top: 150%;
      left: 50%;
      margin-left: -40px;
      opacity: 0;
      transition: opacity 0.2s;

      &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent rgb(71, 71, 71) transparent;
      }
    }

    &:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }

    & > :global(.icon) {
      width: 24px;
      height: 24px;
      position: relative;
      top: 5px;
      fill: rgba(0, 0, 0, 0.5);

      &:hover {
        fill: $highlight-color;
      }
    }

    &.danger > :global(.icon:hover) {
      fill: $warn-color;
    }
  }
</style>
