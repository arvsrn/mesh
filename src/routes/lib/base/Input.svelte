<script lang="ts">
    export let placeholder: string = "";
    export let layout: "flex" | "fill" | "fit" | number = 175;
    export let type: "text" | "number" = "text";
    export let value: string | number;

    const fromLayout = () => {
        if (layout == "flex") return "flex-grow: 1;";
        if (layout == "fill") return "width: 100%;";
        if (layout == "fit") return "width: fit-content;";
        else return `width: ${layout}px;`;
    }

    let self: HTMLInputElement;
</script>

<input bind:this={self} {placeholder} bind:value={value} style={fromLayout()} on:input={() => {
    if (type == "number") self.value = self.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
}} />

<style>
    input {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        gap: 10px;

        height: 32px;

        background: transparent;

        border-radius: 4px;
        border: 1px solid transparent;
        outline: none;
        box-sizing: border-box;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 13px;
        letter-spacing: 0.005em;

        color: #EDEDED;
    }

    input:hover {
        border: 1px solid #343434;
    }

    input:focus, input:active {
        border: 1px solid #505050;
    }

    input::placeholder {
        color: #A0A0A0;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
</style>