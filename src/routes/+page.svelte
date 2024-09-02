<script>
    import "./globals.scss";
    import Icon from "@iconify/svelte";
    import { isJapanese, toHiragana } from "wanakana";
    import Window from "../components/Window";
    import categories from "./categories.json"

    export let data;
    const { entries } = data;

    let selectedCategoryIndex = 1;
    $: selectedCategory = categories[selectedCategoryIndex];
    let selectedGenderIndex = 1;
    let userSearch = "";

    function getFilteredOptionsForSection(type, gender, query) {
        return entries.filter((entry) => {
            const typeMatch = entry.type === type;
            const genderMatch = entry.gender === gender || entry.gender === 2;
            let searchMatch = true;

            if (query && !entry.text) {
                searchMatch = false;
            } else if (query && isJapanese(query)) {
                searchMatch = toHiragana(entry.text.name).includes(
                    toHiragana(query),
                );
            } else if (query) {
                searchMatch = entry.text.name.includes(query);
            }

            return typeMatch && genderMatch && searchMatch;
        });
    }

    // Return the correct icon URI based on gender and key availability (some unisex outfits only have icon_M or icon_F keys)
    function getIcon(entry, gender) {
        const iconKeyValuePairs = Object.entries(entry.assets).filter(([key]) =>
            key.match(/^icon/g),
        );

        if (!entry.assets || iconKeyValuePairs.length < 1) return null;

        if (iconKeyValuePairs.length > 1) {
            const icons = Object.fromEntries(iconKeyValuePairs);
            if (gender == 0) {
                return (
                    asset(icons.icon_M) ??
                    asset(icons.icon_F) ??
                    asset(iconKeyValuePairs[0][1])
                );
            } else if (gender == 1) {
                return (
                    asset(icons.icon_F) ??
                    asset(icons.icon_M) ??
                    asset(iconKeyValuePairs[0][1])
                );
            }
            return asset(iconKeyValuePairs[0][1]);
        }

        return asset(iconKeyValuePairs[0][1]);
    }

    function asset(id) {
        return `https://raw.githubusercontent.com/whotookzakum/bpassets/webp${id}.webp`;
    }
</script>

<img
    src="/render.png"
    alt=""
    style="position: fixed; right: 100px; top: 100px; scale: 1.25"
/>

<Window>
    <Window.Head>
        <label class="h-full items-center rounded-lg flex gap-2 ml-1">
            <Icon
                icon="iconamoon:search-duotone"
                class="text-xl text-neutral-500"
            />
            <input
                type="text"
                placeholder="Search"
                class="bg-transparent focus:outline-none"
                bind:value={userSearch}
            />
        </label>

        <div class="flex ml-auto">
            <label
                class="p-2 rounded-lg"
                class:active={selectedGenderIndex === 0}
            >
                <input
                    type="radio"
                    class="sr-only"
                    value={0}
                    bind:group={selectedGenderIndex}
                />
                <span class="sr-only">Male</span>
                <Icon
                    icon="ph:gender-male-bold"
                    class="text-xl text-blue-500"
                />
            </label>
            <label
                class="p-2 rounded-lg"
                class:active={selectedGenderIndex === 1}
            >
                <input
                    type="radio"
                    class="sr-only"
                    value={1}
                    bind:group={selectedGenderIndex}
                />
                <span class="sr-only">Female</span>
                <Icon
                    icon="ph:gender-female-bold"
                    class="text-xl text-pink-500"
                />
            </label>
        </div>
    </Window.Head>

    <Window.Menu>
        <ul>
            {#each categories as category, index}
                <li>
                    <label
                        class="flex px-4 py-2 font-semibold"
                        class:active={selectedCategoryIndex === index}
                    >
                        <input
                            type="radio"
                            class="sr-only"
                            value={index}
                            bind:group={selectedCategoryIndex}
                        />
                        {category.name}
                    </label>
                </li>
            {/each}
        </ul>
    </Window.Menu>

    <Window.Body>
        <h2 class="sr-only">{selectedCategory.name}</h2>
        {#each selectedCategory.sections as section, index}
            {#if getFilteredOptionsForSection(section.type, selectedGenderIndex, userSearch).length > 0}
                <Window.Collapsible
                    title={section.name}
                    bind:checked={section.checked}
                >
                    <ul class="flex flex-wrap p-2">
                        {#each getFilteredOptionsForSection(section.type, selectedGenderIndex, userSearch) as entry (entry.id)}
                            {#if getIcon(entry, selectedGenderIndex)}
                                <li>
                                    <label
                                        class="block p-2 rounded-lg"
                                        class:active={section.value ===
                                            entry.id}
                                    >
                                        <input
                                            type="radio"
                                            class="sr-only"
                                            value={entry.id}
                                            bind:group={section.value}
                                        />
                                        <img
                                            src={getIcon(
                                                entry,
                                                selectedGenderIndex,
                                            )}
                                            alt="{section.name} {entry.id}"
                                            width="64"
                                            height="64"
                                        />
                                    </label>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </Window.Collapsible>
            {/if}
        {/each}
    </Window.Body>
</Window>