<script lang="ts">
    import Button from "./base/Button.svelte";
    import Notification from "./base/Notification.svelte";

    let showCopiedNotification: boolean = false;
    export let getGradientLink: () => string;
</script>

<main>
    <Button color="purple" cursor="pointer" handler={() => {navigator.clipboard.writeText("mesh.aarv.me/?src=" + getGradientLink()); showCopiedNotification = true;}}>Share</Button>
    <Button color="grey" cursor="pointer" handler={() => window.location.assign('/gallery')}>Gallery →</Button>
</main>

{#if showCopiedNotification}
    <Notification bind:showing={showCopiedNotification}>✨ Copied gradient URL</Notification>
{/if}

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