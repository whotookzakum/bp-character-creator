<script>
    import Icon from "@iconify/svelte";

    export let title = "";
    export let checked = false;
</script>

<section>
    <h3 class="sr-only">{title}</h3>
    <label
        class="flex py-2 px-4 font-semibold sticky top-0 items-center justify-between bg-neutral-750"
    >
        <input type="checkbox" class="sr-only" bind:checked />
        <span class="sr-only">Show/Hide {title} options</span>
        <span aria-hidden="true">{title}</span>
        <Icon
            icon="ic:round-keyboard-arrow-down"
            style="font-size: 1.5rem; margin-right: -4px"
            class="text-2xl {checked ? 'rotate-180' : ''}"
        />
    </label>

    
    {#if checked}
        <div>
            <slot />
        </div>
    {/if}
</section>
