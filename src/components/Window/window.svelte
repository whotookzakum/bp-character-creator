<!-- TODO: Draggable and resizable -->
<div
    class="window grid absolute top-4 left-4 rounded-lg overflow-hidden bg-neutral-750"
>
    <slot />
</div>

<style lang="scss">
    .window {
        // resize: both;
        grid-template-columns: 144px 1fr;
        grid-template-rows: auto 1fr;
        // 600x600
        width: 560px;
        min-width: 560px;
        max-width: calc(100dvw - 2rem);
        height: 600px;
        min-height: 600px;
        max-height: calc(100dvh - 2rem);
        // https://shadows.brumm.af/
        box-shadow:
            -0.1px -0.1px 1.1px rgba(0, 0, 0, 0.032),
            0px 0px 2.1px rgba(0, 0, 0, 0.054),
            0.3px 0.6px 3.1px rgba(0, 0, 0, 0.066),
            0.9px 1.7px 4.3px rgba(0, 0, 0, 0.072),
            1.7px 3.4px 5.8px rgba(0, 0, 0, 0.076),
            3px 6px 8px rgba(0, 0, 0, 0.082),
            4.7px 9.5px 11.6px rgba(0, 0, 0, 0.091),
            6.8px 13.6px 18px rgba(0, 0, 0, 0.104),
            8.7px 17.5px 31.6px rgba(0, 0, 0, 0.12),
            10px 20px 80px rgba(0, 0, 0, 0.14);
    }
</style>