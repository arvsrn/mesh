<script lang="ts">
    let x: number = 0, y: number = 0;
    
    let moving: boolean = false;
    let mainElement: HTMLElement;

    export let close: () => void;
    export let title: string;

    const onMouseDown = (event: MouseEvent) => {
        x = event.clientX;
        y = event.clientY;
        moving = true;
    };

    const onTouchStart = (event: TouchEvent) => {
        x = event.touches[0].pageX;
        y = event.touches[0].pageY;
        moving = true;
    };

    const onMouseMove = (event: MouseEvent) => {
        if (moving) {
            const dx = event.clientX - x;
            const dy = event.clientY - y;

            mainElement.style.top = (mainElement.offsetTop + dy) + "px";
            mainElement.style.left = (mainElement.offsetLeft + dx) + "px";
            
            x = event.clientX;
            y = event.clientY;
        }
    };

    const onTouchMove = (event: TouchEvent) => {
        if (moving) {
            const dx = event.touches[0].pageX - x;
            const dy = event.touches[0].pageY - y;

            mainElement.style.top = (mainElement.offsetTop + dy) + "px";
            mainElement.style.left = (mainElement.offsetLeft + dx) + "px";
            
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;
        }
    };
</script>

<main bind:this={mainElement} class="outer">
    <div on:mousedown|self={onMouseDown} on:touchstart|self={onTouchStart}>
        <h1 on:mousedown|self={onMouseDown}>{title}</h1>
        <button on:click={close}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="#DEDEDE" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
    </div>
    <main class="inner" on:touchstart={() => {}}>
        <slot></slot>
    </main>
</main>

<svelte:window on:mousemove={onMouseMove} on:mouseup={() => moving = false} on:touchmove={onTouchMove} ></svelte:window>

<style>
    * {
        box-sizing: border-box;
    }

    main.outer {
        user-select: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        position: absolute;
        
        width: fit-content;
        height: fit-content;
        left: 200px;
        top: 200px;

        background: #1C1C1C;

        box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        z-index: 100;

        width: fit-content;
        min-width: 240px;

        border: 1px solid #161616;
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px;
        gap: 10px;
        width: 32px;
        height: 32px;
        flex: none;
        background: transparent;
        border-radius: 4px;
        transition: opacity 0.15s, background 0.15s;
        opacity: 70%;
        margin-left: auto;
    }

    button:hover {
        opacity: 100%;
        background: rgba(255, 255, 255, 0.06);
    }

    button:active {
        scale: 0.953;
    }

    div {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
        height: fit-content;
        border-bottom: 1px solid #2E2E2E;
        padding: 4px 16px;
        padding-right: 4px;
    }
    
    h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        display: flex;
        align-items: center;
        letter-spacing: 0.005em;

        color: #EDEDED;
    }
    
    main.inner {
        width: 100%;
        height: fit-content;

        padding: 12px 10px;

        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    @media only screen and (max-width: 400px) {
        main.outer {
            width: 100vw !important;
            height: 80vh !important;
            position: absolute;
            bottom: 0px !important;
            top: auto !important;
            left: 0px !important;
        }

        main.inner {
            overflow-x: auto !important;
        }
    }
</style>