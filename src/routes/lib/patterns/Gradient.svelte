<script lang="ts">
    import chroma from "chroma-js";
    import type { Blob } from "../../../types";
    import Button from "../base/Button.svelte";
    import Dropdown from "../base/Dropdown.svelte";
    import IconButton from "../base/IconButton.svelte";
    import colors from 'nice-color-palettes';
    import ContextMenu from "../base/ContextMenu.svelte";
    import Notification from "../base/Notification.svelte";
    import { onMount } from "svelte";

    export let showWindow: (idx: number) => void;
    export let showEditBackgroundWindow: () => void;
    
    export let blobs: Blob[]; 

    let moving: boolean = false;
    let current: number = 0;

    const onMouseMove = (e: MouseEvent) => {
        if (moving) {
            const boundingRect = document.getElementById('overlay')?.getBoundingClientRect();
            if (!boundingRect) return;

            blobs[current].position[1] = e.x - boundingRect.left;
            blobs[current].position[0] = e.y - boundingRect.top;
            
            console.log(boundingRect.left, boundingRect.width, boundingRect.top, boundingRect.height, e.x, e.y);

            blobs[current].position[1] = Math.min(Math.max(blobs[current].position[1], 9), boundingRect.width - 9);
            blobs[current].position[0] = Math.min(Math.max(blobs[current].position[0], 9), boundingRect.height - 9);
            
            blobs = blobs;
        }

        mousePosition = [e.y, e.x];
    };

    const onTouchMove = (e: TouchEvent) => {
        if (moving) {
            const boundingRect = document.getElementById('overlay')?.getBoundingClientRect();
            if (!boundingRect) return;

            blobs[current].position[1] = e.touches[0].pageX - boundingRect.left;
            blobs[current].position[0] = e.touches[0].pageY - boundingRect.top;
            
            console.log(boundingRect.left, boundingRect.width, boundingRect.top, boundingRect.height, e.touches[0].pageX, e.touches[0].pageY);

            blobs[current].position[1] = Math.min(Math.max(blobs[current].position[1], 9), boundingRect.width - 9);
            blobs[current].position[0] = Math.min(Math.max(blobs[current].position[0], 9), boundingRect.height - 9);
            
            blobs = blobs;
        }

        mousePosition = [e.touches[0].pageY, e.touches[0].pageX];
    };

    let selected: "16:9" | "4:3" | "1:1" | "3:2" = "4:3";
    let showingHandles: boolean = true;
    let aspectRatio: string = "16 / 9";
    export let background: string = "#000000";

    let contextMenuPosition: number[] = [0, 0];
    let mousePosition: number[] = [0, 0];
    let showContextMenu: boolean = false;
    let showCopiedNotification: boolean = false;

    let main: SVGElement;
    let svgWidth: number = 700;
    let svgHeight: number = 393.75;

    let WIDTH: number = 700;

    $: selected, updateAspectRatio();

    onMount(() => {
        if (window.innerWidth < 800) {
            WIDTH = window.innerWidth - 100;
            updateAspectRatio();
        }
    })

    const generate = () => {
        let i = Math.floor(Math.random() * colors.length);
        
        blobs = [
            {
                color: colors[i][1],
                position: randomPosition(),
                blending: 'Normal',
                radius: 200,
            },
            {
                color: colors[i][2],
                position: randomPosition(),
                blending: 'Normal',
                radius: 200,
            },
            {
                color: colors[i][3],
                position: randomPosition(),
                blending: 'Normal',
                radius: 200,
            }
        ];

        background = colors[i][0];
    };

    const randomPosition = (): number[] => {
        const boundingRect = document.getElementById('overlay')?.getBoundingClientRect();
        if (!boundingRect) return [0, 0];

        let x = Math.floor(Math.random() * boundingRect.width);
        let y = Math.floor(Math.random() * boundingRect.height);

        return [y, x]
    };

    const add = () => {
        let i = Math.floor(Math.random() * colors.length);

        blobs = [...blobs, {
            color: colors[i][1],
            position: [200, 400],
            blending: "Normal",
            radius: 200,
        }];

        console.log(blobs);
    };

    const onContextMenu = () => {
        showContextMenu = true;
        contextMenuPosition = mousePosition;
    };

    const copy = () => {
        showCopiedNotification = true;
        navigator.clipboard.writeText(main.outerHTML);
    };

    const updateAspectRatio = (): number[] => {
        aspectRatio = selected.replace(':', '/');

        svgWidth = WIDTH;
        svgHeight = (WIDTH / parseInt(aspectRatio.split('/')[0])) * parseInt(aspectRatio.split('/')[1]);

        console.log(svgWidth, svgHeight);
        
        blobs[current].position[1] = Math.min(Math.max(blobs[current].position[1], 9), svgWidth - 9);
        blobs[current].position[0] = Math.min(Math.max(blobs[current].position[0], 9), svgHeight - 9);

        return [svgWidth, svgHeight];
    };

    let lastClicked: number | null = null;

    // custom double click handler because on:dblclick doesn't seem to work on mobile
    const onHandleClicked = (callback: () => void) => {
        if (lastClicked) {
            if ((new Date().getTime() - lastClicked) < 500)
                callback();
            lastClicked = null;
        } else {
            lastClicked = new Date().getTime();
        }
    };

    setTimeout(generate, 10);
</script>

<main style="width: {svgWidth}px; height: {svgHeight}px;">
    {#if showingHandles}
    <div class="overlay_" id="overlay" on:contextmenu|preventDefault={onContextMenu}>
        {#each blobs as blob, i}
        <div class="overlay-handle" on:click={() => onHandleClicked(() => showWindow(i))} style="left: {blob.position[1]}px; top: {blob.position[0]}px" on:mousedown={() => {current = i; moving = true}} on:touchstart={() => {current = i; moving = true}}></div>
        {/each}
    </div>
    {/if}

    <main class="buttons">
        <p>Right click to edit background & double click handles to edit blobs.</p>
        
        <IconButton handler={() => showingHandles = !showingHandles}>
            {#if showingHandles}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_17552)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00019 11C5.70033 11 3.67803 9.80581 2.52182 8C3.67803 6.19419 5.70033 5 8.00019 5C10.3 5 12.3223 6.19419 13.4785 8C12.3223 9.80581 10.3 11 8.00019 11ZM8.00019 4C10.8782 4 13.3776 5.6211 14.6351 8C13.3776 10.3789 10.8782 12 8.00019 12C5.12214 12 2.62273 10.3789 1.36523 8C2.62273 5.6211 5.12214 4 8.00019 4ZM8.00049 10C9.10506 10 10.0005 9.10457 10.0005 8C10.0005 6.89543 9.10506 6 8.00049 6C6.89592 6 6.00049 6.89543 6.00049 8C6.00049 9.10457 6.89592 10 8.00049 10Z" fill="currentColor"/>
                </g>
                <defs>
                <clipPath id="clip0_0_17552">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>    
            {:else}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_17556)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5085 7.80119C14.0639 7.27364 14.5436 6.66723 14.9295 6H13.7453C12.4798 7.81421 10.378 9 7.99986 9C5.62172 9 3.51992 7.81421 2.25446 6H1.07022C1.45619 6.66728 1.93589 7.27373 2.49134 7.80131L0.896484 9.39623L1.6036 10.1033L3.26094 8.44592C3.97166 8.96931 4.77213 9.37804 5.63506 9.64469L5.01804 11.866L5.98156 12.1336L6.60775 9.87929C7.05984 9.95862 7.52501 10 7.99986 10C8.47467 10 8.9398 9.95863 9.39185 9.87931L10.018 12.1336L10.9816 11.866L10.3646 9.64473C11.2276 9.37806 12.0281 8.96928 12.7389 8.44582L14.3965 10.1033L15.1036 9.39621L13.5085 7.80119Z" fill="currentColor"/>
                </g>
                <defs>
                <clipPath id="clip0_0_17556">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>     
            {/if}           
        </IconButton>
        <IconButton handler={generate}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6096 5.68765L13.4349 7.15603C13.4268 7.10387 13.418 7.05185 13.4084 7C13.2569 6.18064 12.9203 5.40189 12.419 4.72539C11.7169 3.77797 10.7289 3.08128 9.60075 2.73808C8.47259 2.39489 7.264 2.42337 6.15326 2.81933C5.36015 3.10206 4.64691 3.56145 4.06479 4.15764C3.83166 4.3964 3.61956 4.6571 3.43178 4.93718L3.43192 4.93728L4.26237 5.49406L4.26252 5.49416C4.79977 4.69282 5.58035 4.08538 6.4891 3.76143C7.39785 3.43748 8.38666 3.41418 9.30967 3.69496C10.2327 3.97574 11.041 4.54574 11.6154 5.32088C12.1002 5.97502 12.3966 6.74603 12.4774 7.55063L10.2774 6.08398L9.7227 6.91603L12.7227 8.91603L13.1041 9.1703L13.3905 8.81235L15.3905 6.31235L14.6096 5.68765ZM2.60962 7.18765L0.609619 9.68765L1.39049 10.3123L2.56519 8.84397C2.57329 8.89614 2.58213 8.94815 2.59172 9C2.74323 9.81936 3.07981 10.5981 3.58113 11.2746C4.2832 12.222 5.27119 12.9187 6.39935 13.2619C7.52751 13.6051 8.7361 13.5766 9.84684 13.1807C10.64 12.8979 11.3532 12.4386 11.9353 11.8424C12.168 11.6041 12.3797 11.344 12.5672 11.0646L12.5683 11.0628L12.5682 11.0627L11.7377 10.5059L11.7376 10.5058L11.7365 10.5074C11.1993 11.308 10.4192 11.9148 9.51101 12.2386C8.60225 12.5625 7.61344 12.5858 6.69044 12.305C5.76744 12.0243 4.95911 11.4543 4.38471 10.6791C3.89996 10.025 3.60346 9.25397 3.52271 8.44937L5.7227 9.91603L6.2774 9.08398L3.2774 7.08398L2.89598 6.8297L2.60962 7.18765Z" fill="currentColor" />
            </svg>                
        </IconButton>
        <Dropdown options={["16:9", "1:1", "4:3", "3:2"]} bind:selected={selected} layout={62.58} />
        <Button color="grey" handler={add}>Add</Button>
        <Button color="purple" handler={copy}>Copy</Button>
    </main>

    <svg class="main" bind:this={main} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 {svgWidth} {svgHeight}">
        <style>
            .multiply { mix-blend-mode: multiply }
            .normal { mix-blend-mode: normal }
            .overlay { mix-blend-mode: overlay }
            .screen { mix-blend-mode: screen }
            .darken { mix-blend-mode: darken }
            .lighten { mix-blend-mode: lighten }
            .color-dodge { mix-blend-mode: color-dodge }
            .saturation { mix-blend-mode: saturation }
            .color { mix-blend-mode: color }
            .luminosity { mix-blend-mode: luminosity }
            .hard-light { mix-blend-mode: hard-light }
            .soft-light { mix-blend-mode: soft-light }
            .difference { mix-blend-mode: difference }
            .exclusion { mix-blend-mode: exclusion }
            .hue { mix-blend-mode: hue }
        </style>
        
        <defs>
            <filter id="blur1" width="120%" height="120%" filterUnits="userSpaceOnUse" x="-10%" y="-10%">
                <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur"></feGaussianBlur>
            </filter>
        </defs>

        <rect width="{svgWidth}" height="{svgHeight}" fill="{background}"></rect>

        <g filter="url(#blur1)">
        {#each blobs as blob, _} 
        <circle cy={blob.position[0]} cx={blob.position[1]} r={blob.radius} fill={blob.color} class="{blob.blending.toLowerCase().replaceAll(' ', '-')}"></circle>
        {/each}
        </g>
    </svg>
</main>

{#if showContextMenu}
    <ContextMenu options={{ 'Edit Background': showEditBackgroundWindow }} position={contextMenuPosition} bind:showing={showContextMenu} />
{/if}

{#if showCopiedNotification}
    <Notification bind:showing={showCopiedNotification}>✨ Copied SVG to clipboard</Notification>
{/if}

<svelte:window on:mouseup={() => moving = false} on:touchend={() => moving = false} on:mousemove={onMouseMove} on:touchmove={onTouchMove} on:resize={() => {
    if (window.innerWidth < 800) {
        WIDTH = window.innerWidth - 50;
        const [width, height] = updateAspectRatio();

        for (let i = 0; i < blobs.length; i++) {
            blobs[i].position[1] = Math.min(Math.max(blobs[i].position[1], 9), width - 9);
            blobs[i].position[0] = Math.min(Math.max(blobs[i].position[0], 9), height - 9);
        }

        console.log('on:resize ', WIDTH);
    }
}}></svelte:window>

<style>
    main:not(.buttons) {
        width: 700px;

        position: relative;
        border-radius: 4px;

        transition: width 0.1s ease-in-out, height 0.1s ease-in-out;
    }

    main.buttons {
        position: absolute;
        width: 100%;
        height: 32px;
        bottom: -40px;
        left: 0px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
    }

    div.overlay_ {
        width: 100%;
        height: 100%;

        z-index: 50;
        position: absolute;
        top: 0px;
        left: 0px;
    }

    div.overlay-handle {
        position: absolute; 

        width: 18px;
        height: 18px;
        border-radius: 100px;

        margin-left: -9px;
        margin-top: -9px;

        background: #9E8CFC;
        border: 3px solid #FFFFFF;

        cursor: grab;
    }

    svg.main {
        position: absolute;
        width: 100%;
        height: 100%;

        border-radius: 4px;
    }

    p {
        font-family: Inter;
        font-size: 12px;
        font-weight: normal;
        
        color: #7e7e7e;
        margin-right: auto;
    }
</style>
