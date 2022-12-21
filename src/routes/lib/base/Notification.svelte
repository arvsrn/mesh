<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let showing = false;

    $: {
        if (showing) {
            setTimeout(() => showing = false, 3000)
        }
    }
</script>

{#if showing}
<main transition:fade={{ duration: 80 }}>
    <slot></slot>
</main>
{/if}

<style>
    main {
        background: #1C1C1C;
        box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.15);
        border-radius: 4px;

        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 10px;
        gap: 10px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;

        color: #EDEDED;

        width: fit-content;
        height: fit-content;

        position: fixed;
        left: 50vw;
        transform: translateX(-50%);
        bottom: 24px;

        user-select: none;
    }
</style>