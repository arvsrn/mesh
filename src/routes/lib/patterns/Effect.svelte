<script lang="ts">
    import Dropdown from "../base/Dropdown.svelte";
    import IconButton from "../base/IconButton.svelte";

    export let options: string[];
    let hovering: boolean = false;
</script>

<main on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
    <div>
        <IconButton handler={() => {}}>
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_15_201)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.5C7.77614 0.5 8 0.723858 8 1V3C8 3.27614 7.77614 3.5 7.5 3.5C7.22386 3.5 7 3.27614 7 3V1C7 0.723858 7.22386 0.5 7.5 0.5ZM2.1967 2.6967C2.39196 2.50144 2.70854 2.50144 2.90381 2.6967L4.31802 4.11091C4.51328 4.30617 4.51328 4.62276 4.31802 4.81802C4.12276 5.01328 3.80617 5.01328 3.61091 4.81802L2.1967 3.40381C2.00144 3.20854 2.00144 2.89196 2.1967 2.6967ZM0.5 7.5C0.223858 7.5 0 7.72386 0 8C0 8.27614 0.223858 8.5 0.5 8.5H2.5C2.77614 8.5 3 8.27614 3 8C3 7.72386 2.77614 7.5 2.5 7.5H0.5ZM2.1967 13.3033C2.00144 13.108 2.00144 12.7915 2.1967 12.5962L3.61091 11.182C3.80617 10.9867 4.12276 10.9867 4.31802 11.182C4.51328 11.3772 4.51328 11.6938 4.31802 11.8891L2.90381 13.3033C2.70854 13.4986 2.39196 13.4986 2.1967 13.3033ZM12.5 7.5C12.2239 7.5 12 7.72386 12 8C12 8.27614 12.2239 8.5 12.5 8.5H14.5C14.7761 8.5 15 8.27614 15 8C15 7.72386 14.7761 7.5 14.5 7.5H12.5ZM10.682 4.81802C10.4867 4.62276 10.4867 4.30617 10.682 4.11091L12.0962 2.6967C12.2915 2.50144 12.608 2.50144 12.8033 2.6967C12.9986 2.89196 12.9986 3.20854 12.8033 3.40381L11.3891 4.81802C11.1938 5.01328 10.8772 5.01328 10.682 4.81802ZM8 13C8 12.7239 7.77614 12.5 7.5 12.5C7.22386 12.5 7 12.7239 7 13V15C7 15.2761 7.22386 15.5 7.5 15.5C7.77614 15.5 8 15.2761 8 15V13ZM10.682 11.182C10.8772 10.9867 11.1938 10.9867 11.3891 11.182L12.8033 12.5962C12.9986 12.7915 12.9986 13.108 12.8033 13.3033C12.608 13.4986 12.2915 13.4986 12.0962 13.3033L10.682 11.8891C10.4867 11.6938 10.4867 11.3772 10.682 11.182ZM5.5 8C5.5 6.89543 6.39543 6 7.5 6C8.60457 6 9.5 6.89543 9.5 8C9.5 9.10457 8.60457 10 7.5 10C6.39543 10 5.5 9.10457 5.5 8ZM7.5 5C5.84315 5 4.5 6.34315 4.5 8C4.5 9.65685 5.84315 11 7.5 11C9.15685 11 10.5 9.65685 10.5 8C10.5 6.34315 9.15685 5 7.5 5Z" fill="#A0A0A0"/>
            </g>
            <defs>
            <clipPath id="clip0_15_201">
            <rect width="15" height="15" fill="white" transform="translate(0 0.5)"/>
            </clipPath>
            </defs>
        </svg>            
    </IconButton>
    </div>
    <Dropdown {options} layout="flex"></Dropdown>

    {#if hovering}
    <div style="height: fit-content; width: fit-content; margin-left: auto;">
        <IconButton handler={() => {}}>
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 1.5C5.22386 1.5 5 1.72386 5 2C5 2.27614 5.22386 2.5 5.5 2.5H9.5C9.77614 2.5 10 2.27614 10 2C10 1.72386 9.77614 1.5 9.5 1.5H5.5ZM3 4C3 3.72386 3.22386 3.5 3.5 3.5H5H10H11.5C11.7761 3.5 12 3.72386 12 4C12 4.27614 11.7761 4.5 11.5 4.5H11V12.5C11 13.0523 10.5523 13.5 10 13.5H5C4.44772 13.5 4 13.0523 4 12.5V4.5H3.5C3.22386 4.5 3 4.27614 3 4ZM5 4.5H10V12.5H5V4.5Z" fill="#A0A0A0"/>
            </svg>                
        </IconButton>
    </div>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 10px;
        gap: 2px;

        height: 32px;
        width: 100%;
    }
</style>