<script lang="ts">
    import Input from "../base/Input.svelte";

    export let label: string;
    export let type: "number" | "text" = "text";
    export let placeholder: string = "";
    export let value = type == "text" ? '' : 0;
</script>

<main>
    <p>{label}</p>
    <Input {placeholder} {type} layout="flex" bind:value={value} />
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0px;

        width: 100%;
        height: 32px;
    }

    p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 11px;
        line-height: 16px;

        display: flex;
        align-items: center;
        letter-spacing: 0.005em;

        height: 100%;
        width: fit-content;

        color: #A0A0A0;
        margin: 0px 10px;
    }
</style>