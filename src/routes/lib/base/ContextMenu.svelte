<script lang="ts">
    import { fade } from "svelte/transition";
    import { clickOutside } from 'svelte-use-click-outside';

    export let options: Record<string, () => void>;
    export let position: number[] = [0, 0];
    
    export let showing: boolean = true;
</script>

<main class="dropdown" transition:fade={{ duration: 80 }} use:clickOutside={() => showing = false} style="width: fit-content; top: {position[0]}px; left: {position[1]}px;">
    {#each Object.entries(options) as [title, callback], i}
    <div on:click={() => {callback(); showing = false}}>{title}</div>
    {/each}
</main>

<style>
    main.dropdown {
        position: absolute;
        
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 4px 0px;

        background: #232323;
        border-radius: 4px;

        width: 100%;
        height: fit-content;
        z-index: 100;
        box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.15);
    }

    main.dropdown > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 16px;
        gap: 10px;

        width: 100%;
        height: 28px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;

        letter-spacing: 0.01em;

        color: #ededed;
        user-select: none;
    }

    main.dropdown > div:hover {
        background: #0A4481;
    }
</style>