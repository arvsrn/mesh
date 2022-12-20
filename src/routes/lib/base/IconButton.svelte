<script lang="ts">
    export let handler: () => void;
</script>

<button on:click={handler}>
    <slot></slot>
</button>

<style>
    button {
        width: 27px;
        height: 27px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background: transparent;
        color: #EDEDED;

        border: none;
        outline: none;

        border-radius: 4px;
    }

    button:hover {
        background: #232323;
    }

    button:active {
        background: #282828;
    }
</style>