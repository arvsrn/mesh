<script lang="ts">
    import ContextMenu from "../lib/base/ContextMenu.svelte";
    import { BlobDataFrom } from "../../parse";
    import type { Blob, Gradient } from "../../types";
    import Badge from "../lib/Badge.svelte";
    import Notification from "../lib/base/Notification.svelte";
    import { onMount } from "svelte";

    let mounted: boolean = false;
    onMount(() => mounted = true);
    
    let showMenu: boolean = false;
    let contextMenuPosition: number[] = [0, 0];
    let mousePosition: number[] = [0, 0];
    const aspectRatio: string = "4/3";
    
    const gradients: Gradient[] = [
        {"background":"#ffff","blur":75,"blobs":[{"position":[409,235],"color":"#5c79e5","blending":"Normal","radius":200},{"color":"#ff0037","position":[251,9],"blending":"Normal","radius":300},{"position":[9,34],"color":"#ff0037","blending":"Normal","radius":300},{"position":[516,686],"color":"#ff0037","blending":"Normal","radius":300},{"position":[224,435],"color":"#5c79e5","blending":"Normal","radius":200}]},
        {"background":"#1C1C1C","blur":75,"blobs":[{"color":"#b086fc","position":[222,21],"blending":"Normal","radius":200},{"position":[14,419],"color":"#b086fc","blending":"Normal","radius":200},{"position":[164,441],"color":"#50ff81","blending":"Overlay","radius":80},{"position":[58,643],"color":"#5073ff","blending":"Overlay","radius":80},{"position":[9,22],"color":"#b086fc","blending":"Normal","radius":200},{"position":[147,290],"color":"#ff9740","blending":"Normal","radius":150},{"position":[52,86],"color":"#ff8c54","blending":"Lighten","radius":150}]},
        {"background":"#FFF4E5","blur":75,"blobs":[{"color":"#cfb88c","position":[443,524],"blending":"Normal","radius":200},{"color":"#1c4a5a","position":[38,178],"blending":"Normal","radius":200},{"position":[339,226],"color":"#1c4a5a","blending":"Normal","radius":200},{"position":[155,33],"color":"#1c4a5a","blending":"Normal","radius":100}]},
        {"background":"#FFF1C2","blur":75,"blobs":[{"color":"#fc7d58","position":[138,416],"blending":"Normal","radius":200},{"position":[344,191],"color":"#fc7d58","blending":"Normal","radius":200},{"position":[477,552],"color":"#ff7c24","blending":"Normal","radius":200}]}
    ];

    let svgWidth: number = 700, svgHeight: number = 525;
    let current: number = 0;
    let showCopiedNotification = false;

    const onResize = () => {
        if (!mounted) return;
        
        if (window.innerWidth < 750) {
            svgWidth = window.innerWidth - 100;
            svgHeight = (svgWidth / parseInt(aspectRatio.split('/')[0])) * parseInt(aspectRatio.split('/')[1]);
        }
    };

    $: {
        if (mounted) onResize();
    }
</script>

<Badge />

<svelte:head>
    <style>
        body {
            overflow-y: auto;
        }

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background: #333;
        }
    </style>
</svelte:head>

{#if mounted}
<main>
    <main>
        <h1 style="font-family: Inter; font-size: 24px; font-weight: 900; color: white;">Gallery</h1>
        <p style="font-family: Inter; font-size: 14px; font-weight: normal; color: #a0a0a0; width: {svgWidth}px">Beautiful pre-made gradients. Right click to copy SVG or open in editor.</p>

        <div class="gradients" style="width: {svgWidth}px; height: fit-content;">
            {#each gradients as blobs, i}
            <div class="gradient" data-animate style="width: {svgWidth}px !important; height: {svgHeight}px !important; --stagger: {i + 1}" id="gradient_{i}" on:contextmenu|preventDefault={() => {contextMenuPosition = mousePosition; showMenu = true; current = i}}>
                <svg class="main" width={svgWidth} height={svgHeight} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 700 525">
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
                            <feGaussianBlur stdDeviation="{blobs.blur}" result="effect1_foregroundBlur"></feGaussianBlur>
                        </filter>
                    </defs>
                
                    <rect width="700" height="525" fill="{blobs.background}"></rect>
            
                    <g filter="url(#blur1)">
                    {#each blobs.blobs as blob, _} 
                    <circle cy={blob.position[0]} cx={blob.position[1]} r={blob.radius} fill={blob.color} class="{blob.blending.toLowerCase().replaceAll(' ', '-')}"></circle>
                    {/each}
                    </g>
                </svg>
            </div>
            {/each}
        </div>
    </main>
</main>
{/if}

{#if showMenu}
    <ContextMenu options={{ 'Copy SVG': () => {
        navigator.clipboard.writeText(document.getElementById(`gradient_${current}`)?.children[0].outerHTML || "");
        showCopiedNotification = true;
    }, 'Open in editor →': () => window.location.assign('/?src=' + BlobDataFrom.blobs(gradients[current])) }} position={contextMenuPosition} bind:showing={showMenu} />
{/if}

{#if showCopiedNotification}
    <Notification bind:showing={showCopiedNotification}>✨ Copied SVG to clipboard</Notification>
{/if}

<svelte:window on:mousemove={(e) => mousePosition = [e.pageY, e.pageX]} on:resize={onResize}></svelte:window>

<style>
    * {
        box-sizing: content-box;
    }
    
    main {
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 150px 0px;
        align-items: center;
    }

    main > main {
        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
    }

    div.gradients {
        width: 60vw;
        height: fit-content;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;

        margin-top: 32px;
        margin-bottom: 100px;
    }
    
    div.gradient {
        width: fit-content;
        height: fit-content;

        border-radius: 8px;
        border: 2px solid transparent;
        padding: 2px;
        
        transition: border 0.1s ease-in;
        cursor: pointer;

        opacity: 0%;
    }

    div.gradient:hover {
        border: 2px solid #7e7e7e;
    }

    div.gradient > svg {
        border-radius: 4px;
    }

    [data-animate] {
        animation: enter;
        animation-duration: 0.8s;

        animation-delay: calc(var(--stagger) * 80ms);
        -webkit-animation-delay: calc(var(--stagger) * 80ms);
        
        animation-fill-mode: forwards;
    }

    @keyframes enter {
        from {
            opacity: 0%;
            transform: translateY(10px);
        }

        to {
            opacity: 100%;
            transform: translateY(0px);
        }
    }
</style>
