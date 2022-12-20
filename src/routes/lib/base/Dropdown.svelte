<script lang="ts">
    import { fade } from "svelte/transition";
    import { clickOutside } from 'svelte-use-click-outside';

    export let layout: "flex" | "fill" | "fit" | number = 175;

    const fromLayout = () => {
        if (layout == "flex") return "flex: 1;";
        if (layout == "fill") return "width: 100%;";
        if (layout == "fit") return "width: fit-content;";
        else return `width: ${layout}px;`;
    }

    export let options: string[];
    export let selected = options[0];
    let showing: boolean = false;
</script>

<main class="container">
    <button style={fromLayout()} on:click={() => showing = true}>
        {selected}
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.18179 6.68182C4.35753 6.50609 4.64245 6.50609 4.81819 6.68182L7.49999 9.36363L10.1818 6.68182C10.3575 6.50609 10.6424 6.50609 10.8182 6.68182C10.9939 6.85756 10.9939 7.14248 10.8182 7.31822L7.81819 10.3182C7.73379 10.4026 7.61934 10.45 7.49999 10.45C7.38064 10.45 7.26618 10.4026 7.18179 10.3182L4.18179 7.31822C4.00605 7.14248 4.00605 6.85756 4.18179 6.68182Z" fill="#A0A0A0"/>
        </svg>
    </button>
    {#if showing}
    <main class="dropdown" transition:fade={{ duration: 80 }} use:clickOutside={() => showing = false}>
        {#each options as option}
        <div on:click={() => {selected = option; showing = false}}>{option}</div>
        {/each}
    </main>
    {/if}
</main>

<style>
    * {
        box-sizing: border-box;
    }

    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        gap: 1px;

        height: 32px;

        border: 1px solid transparent;
        border-radius: 4px;

        background: transparent;
        outline: none;

        color: #EDEDED;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 13px;
        letter-spacing: 0.005em;

        user-select: none;
        position: relative;
    }

    button:hover {
        border: 1px solid #343434;
    }

    main.dropdown {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        
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
        height: 32px;

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

    main.container {
        position: relative;
        width: fit-content;
    }
</style>