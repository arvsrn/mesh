<script lang="ts">
    import chroma, { random } from "chroma-js";
    import { onMount } from "svelte";

    export let lightness = 80;
    
    let colorPickerInput: HTMLInputElement;
    let boundingRect: HTMLElement;

    let moving: boolean = false;
    let location: number[] = [0, 0];
    
    export let color: string = "#000000";

    export const updateColor = (hex: string) => {
        if (!mounted) return;
        
        try {
            let cielab = chroma(hex).lab();
        
            location[0] = cielab[1] + (boundingRect.clientWidth / 2);
            location[1] = cielab[2] + (boundingRect.clientHeight / 2);

            lightness = cielab[0];
            color = hex;
            console.log('done');
        } catch {}
    }

    $: color, updateColor(color);
    $: {
        if (mounted) 
            updateColor(color);
    }

    let mounted: boolean = false;
    onMount(() => mounted = true);
    
    const colorFromLocation = () => {
        if (!mounted) return;
        
        let a = location[0] - (boundingRect.clientWidth / 2);
        let b = location[1] - (boundingRect.clientHeight / 2);

        color = chroma.lab(lightness, a, b).hex();
    };

    const onMouseMove = (e: MouseEvent) => {
        if (moving) {
            let bounds = boundingRect.getBoundingClientRect()
            if (!bounds) return;

            location[0] = Math.min(Math.max(e.y - bounds.y, 12), boundingRect.clientWidth - 10);
            location[1] = Math.min(Math.max(e.x - bounds.x, 12), boundingRect.clientHeight - 10);

            location = location;
        }
    };

    const onTouchMove = (e: TouchEvent) => {
        if (moving) {
            let bounds = boundingRect.getBoundingClientRect()
            if (!bounds) return;

            location[0] = Math.min(Math.max(e.touches[0].pageY - bounds.y, 12), boundingRect.clientWidth - 10);
            location[1] = Math.min(Math.max(e.touches[0].pageX - bounds.x, 12), boundingRect.clientHeight - 10);

            location = location;
        }
    };

    $: location, colorFromLocation();
</script>

<main bind:this={boundingRect} style="background: {color};" on:contextmenu|preventDefault={() => {}} on:mousedown={(event) => {
    let bounds = boundingRect.getBoundingClientRect()
    if (!bounds) return;

    location[0] = event.y - bounds.y;
    location[1] = event.x - bounds.x;
    location = location;

    moving = true;
}} on:touchstart={(event) => {
    let bounds = boundingRect.getBoundingClientRect()
    if (!bounds) return;

    location[0] = event.touches[0].pageY - bounds.y;
    location[1] = event.touches[0].pageX - bounds.x;
    location = location;

    moving = true;
}}>
    <div 
        class="handle" style="margin-top: {location[0] - 12}px; margin-left: {location[1] - 12}px" 
        on:mousedown={() => {
            moving = true;
        }} class:grabbing={moving}
    ></div>

    <p class="top-left">Bluish</p>
    <p class="top-right">Greenish</p>
    <p class="bottom-left">Pinkish</p>
    <p class="bottom-right">Redish</p>
</main>

<svelte:window on:mousemove={onMouseMove} on:mouseup={() => moving = false} on:touchend={() => moving = false} on:touchmove={onTouchMove}></svelte:window>

<style>
    * {
        padding: 0px;
        margin: 0px;
    }

    .top-left {
        top: 10px;
        left: 10px;
    }

    .top-right {
        top: 10px;
        right: 10px;
    }

    .bottom-left {
        bottom: 10px;
        left: 10px;
    }

    .bottom-right {
        bottom: 10px;
        right: 10px;
    }
    
    p {
        position: absolute;
        
        font-size: 12px;
        font-family: 'Inter';
        font-weight: bold;

        user-select: none;
        color: white;
        pointer-events: none;
    }

    main {
        position: relative;
        width: 100%;
        z-index: 3;
        aspect-ratio: 1 / 1;

        border-radius: 6px;
    }

    div {
        position: absolute;

        width: 22px;
        height: 22px;
        border-radius: 100px;

        margin-left: -12px;
        margin-top: -12px;

        background: #9E8CFC;
        border: 3px solid #FFFFFF;

        cursor: grab;
        z-index: 100;
    }

    .grabbing {
        cursor: grabbing !important ;
    }
</style>
