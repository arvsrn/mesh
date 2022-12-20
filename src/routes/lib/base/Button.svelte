<script lang="ts">
    export let color: "grey" | "purple" | "green" | "red" | "blue" = "grey";
    export let cursor: "pointer" | "normal" = "normal";
    export let handler: () => void;
</script>

<button class="{color} {cursor}" on:click={handler}> 
    <slot></slot>
</button>

<style>
    button {
        position: relative;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 7px 10px;
        gap: 2px;

        width: fit-content;
        height: 32px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 13px;
        letter-spacing: 0.005em;

        border-radius: 4px;
        outline: none;
        border: none;
        user-select: none;
    }

    button.pointer { 
        cursor: pointer;
    }

    button.grey {
        background: #232323;
        color: #EDEDED;
    }

    button.grey:hover {
        background: #282828;
    }

    button.grey:active {
        background: #2E2E2E;
    }

    button.purple {
        background: #251E40;
        color: #9E8CFC;
    }

    button.purple:hover {
        background: #2C2250;
    }

    button.purple:active {
        background: #32275F;
    }

    button.green {
        background: #0F291E;
        color: #4CC38A;
    }

    button.green:hover {
        background: #113123;
    }

    button.green:active {
        background: #133929;
    }

    button.red {
        background: #3B1813;
        color: #F16A50;
    }

    button.red:hover {
        background: #481A14;
    }

    button.red:active {
        background: #541C15;
    }

    button.blue {
        background: #10243E;
        color: #52A9FF;
    }

    button.blue:hover {
        background: #102A4C;
    }

    button.blue:active {
        background: #0F3058;
    }
</style>