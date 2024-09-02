import AESTHEPARTS from "./aestheParts.json";
import COSTUME from "./costume.json";
import JA_JP from "./ja_JP.json"

const icons = {}
const allIconsFiles = import.meta.glob("./DT_*.json", { import: "default", eager: true })
Object.entries(allIconsFiles)
    .forEach(async ([key, value]) => {
        const ns = key.split("/").pop().replace("DB.json", "").replace("Icon", "").replace("DT_", "").toLowerCase()
        const data = value
        icons[ns] =
            Object.entries(data[0].Rows)
                .reduce((acc, [rowId, rowData]) => {
                    acc[rowId] = {}
                    const assetPaths = Object.values(rowData)
                        .map(obj => obj.AssetPathName?.replace("/Game", "").split(".")[0])

                    assetPaths.forEach(path => {
                        if (path.endsWith("_F") || path.endsWith("_M")) {
                            const genderSuffix = path.split("_").pop()
                            acc[rowId][`icon_${genderSuffix}`] = path + ".webp"
                        }
                        else if (path.includes("/UI_Icon") && !path.includes("CostumeL")) {
                            acc[rowId].icon = path + ".webp"
                        }
                    })

                    return acc
                }, {})
    })

function getAssets(ns, id) {
    let ico = {}
    // chaparts icon_id may be "default" which doesn't exist
    if (icons[ns] && icons[ns][id]) ico = icons[ns][id]

    return {
        ...ico
    }
}

function getText(ns, id) {
    return JA_JP.find(obj => obj.name === ns)?.texts.find(obj => obj.id === id)?.text
}

const chaparts = AESTHEPARTS
    .filter(avatar => !(avatar.icon_id === "default" && ["None", ""].includes(avatar.asset_id)))
    .map(avatar => {
        let assets;
        switch (avatar.parts_icon_type) {
            case 9:
            case 10:
            case 11:
                assets = getAssets("makeup", avatar.icon_id)
                break
            default:
                assets = getAssets("chaparts", avatar.icon_id)
        }

        // what is asset_id?

        return {
            assets,
            id: avatar.id,
            type: avatar.parts_icon_type,
            gender: avatar.gender,
        }
    })

const costumes = COSTUME.map(costume => {
    return {
        assets: getAssets("costume", costume.id),
        text: {
            name: getText("costume_text", costume.name),
        },
        id: costume.id,
        type: costume.costume_parts_name.slice(0, 3).includes("acc") ? costume.costume_parts_name.slice(0, 7) : costume.costume_parts_name.slice(0, 3),
        gender: costume.equipable_gender,
        slots: costume.occupies_slots,
        // dyeable: costume.is_alllowed_to_change_color
    }
})

const data = [...chaparts, ...costumes]

export default data 