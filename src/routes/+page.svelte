<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import type { Blob } from "../types";
    import Badge from "./lib/Badge.svelte";
    import ColorPicker from "./lib/base/ColorPicker.svelte";
    import Divider from "./lib/base/Divider.svelte";
    import Window from "./lib/base/Window.svelte";
    import Gradient from "./lib/patterns/Gradient.svelte";
    import LabeledDropdown from "./lib/patterns/LabeledDropdown.svelte";
    import LabeledInput from "./lib/patterns/LabeledInput.svelte";

    let blobs: Blob[] = [
        {
            position: [100, 100],
            color: "#ff00ff",
            blending: "",
            radius: 100,
        }
    ];
    let currentBlob: number = 0;
    let showEditWindow: boolean = false;
    let showEditBackgroundWindow: boolean = false;
    let editWindowTitle: string = "";
    let backgroundColor: string = "";

    let loaded: boolean = false;
    onMount(() => loaded = true);
</script>

<Badge />

<main>
    {#if loaded}
        <div in:fade={{ duration: 100 }}>
            <Gradient bind:blobs={blobs} bind:background={backgroundColor} showWindow={(idx) => {
                showEditBackgroundWindow = false;
                showEditWindow = true;
                editWindowTitle = "Edit Blob#" + idx;
                currentBlob = idx;
            }} showEditBackgroundWindow={() => {
                showEditWindow = false;
                showEditBackgroundWindow = true;
            }} />
        </div>
    {/if}
</main>

{#if showEditWindow}
<Window title={editWindowTitle} close={() => showEditWindow = false}>
    <div style="width: 100%; height: fit-content; margin-bottom: 8px;">
        <ColorPicker bind:color={blobs[currentBlob].color} />
    </div>
    
    <LabeledInput label="Color" bind:value={blobs[currentBlob].color} />
    <Divider />
    
    <LabeledInput label="Radius" bind:value={blobs[currentBlob].radius} />
    <LabeledDropdown label="Blending mode" options={["Normal", "Overlay", "Hard light", "Soft light", "Multiply", "Screen", "Darken", "Lighten", "Color dodge", "Saturation", "Luminosity", "Difference", "Exclusion", "Hue"]} bind:selected={blobs[currentBlob].blending} />

    <!--
        <div style="margin-left: auto; width: fit-content; height: fit-content;">
            <Button color="purple" cursor="pointer">Save</Button>
        </div>
    -->
</Window>
{:else if showEditBackgroundWindow}
<Window title="Gradient Properties" close={() => showEditBackgroundWindow = false}>
    <div style="width: 100%; height: fit-content; margin-bottom: 8px;">
        <ColorPicker bind:color={backgroundColor} />
    </div>
    
    <LabeledInput label="Color" bind:value={backgroundColor} />
</Window>
{/if}

<style>
    main {
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        justify-content: center;
    }

    p {
        font-family: Inter;
        font-size: 14px;
        font-weight: normal;
        
        color: #ededed;
    }
</style>
