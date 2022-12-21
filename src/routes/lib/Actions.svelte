<script>
    import Button from "./base/Button.svelte";

</script>
<main>
    <Button color="grey" cursor="pointer" handler={() => window.location.assign('/gallery')}>Gallery →</Button>
</main>

<style>
    main {
        width: fit-content;
        height: fit-content;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;

        position: absolute;
        top: 24px;
        right: 24px;
    }
</style>