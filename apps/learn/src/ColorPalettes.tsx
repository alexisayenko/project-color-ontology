import { useState } from 'react'

interface RelatedShade {
  name: string
  hex: string
  url?: string
}

interface ColorShade {
  hex: string
  name: string
  related?: RelatedShade[]
  pantone?: RelatedShade[]
}

interface ColorColumn {
  label: string
  light?: ColorShade
  base: ColorShade
  dark?: ColorShade
}

export const COLOR_COLUMNS: ColorColumn[] = [
  { label: 'Pink',
    light: { hex: '#f4b6c8', name: 'Light Pink', related: [{ name: 'Blush', hex: '#de98ab' }, { name: 'Rose', hex: '#e8aab8' }, { name: 'Baby Pink', hex: '#f8d0dc' }], pantone: [{ name: 'Rose Quartz (13-1520)', hex: '#F7CAC9' }, { name: 'Crystal Rose (13-2005)', hex: '#F5D6CC' }] },
    base: { hex: '#d63384', name: 'Pink', related: [{ name: 'Fuchsia', hex: '#c4147a' }, { name: 'Hot Pink', hex: '#e8458a' }, { name: 'Cerise', hex: '#da2c78' }], pantone: [{ name: 'Pink Flambe (17-2031)', hex: '#E55B81' }, { name: 'Fuchsia Rose (17-2031)', hex: '#C74375' }] },
    dark: { hex: '#8b1a5a', name: 'Dark Pink', related: [{ name: 'Magenta', hex: '#a01a6e' }, { name: 'Raspberry', hex: '#7b1048' }, { name: 'Berry', hex: '#6e1040' }], pantone: [{ name: 'Magenta Haze (18-3025)', hex: '#9D446E' }, { name: 'Raspberry Rose (18-2043)', hex: '#B3446C' }] },
  },
  { label: 'Red',
    light: { hex: '#e6a8a0', name: 'Light Red', related: [{ name: 'Salmon', hex: '#fa8072' }, { name: 'Coral', hex: '#f08080' }, { name: 'Rose', hex: '#e0a0a0' }], pantone: [{ name: 'Living Coral (16-1546)', hex: '#FF6F61' }, { name: 'Porcelain Rose (14-1508)', hex: '#EA6B6A' }] },
    base: { hex: '#c0392b', name: 'Red', related: [{ name: 'Crimson', hex: '#b01020' }, { name: 'Scarlet', hex: '#d62020' }, { name: 'Cherry', hex: '#c41030' }], pantone: [{ name: 'True Red (19-1664)', hex: '#BF1932' }, { name: 'Flame Scarlet (18-1662)', hex: '#CD212A' }, { name: 'Fiesta (17-1564)', hex: '#DD4132' }] },
    dark: { hex: '#7b1a1a', name: 'Dark Red', related: [{ name: 'Burgundy', hex: '#6b1028' }, { name: 'Maroon', hex: '#5a1018' }, { name: 'Wine', hex: '#72182a' }, { name: 'Oxblood', hex: '#4a0e12' }], pantone: [{ name: 'Marsala (18-1438)', hex: '#955251' }, { name: 'Chili Pepper (19-1557)', hex: '#9B1B30' }, { name: 'Jester Red (19-1862)', hex: '#9E1030' }] },
  },
  { label: 'Orange',
    light: { hex: '#f5c89a', name: 'Light Orange', related: [{ name: 'Peach', hex: '#f8c8a0' }, { name: 'Apricot', hex: '#f0b888' }, { name: 'Melon', hex: '#f4b890' }], pantone: [{ name: 'Peach Fuzz (13-1023)', hex: '#FFBE98' }, { name: 'Cantaloupe (16-1442)', hex: '#FFA62F' }] },
    base: { hex: '#e67e22', name: 'Orange', related: [{ name: 'Tangerine', hex: '#e88020' }, { name: 'Amber', hex: '#d89020' }, { name: 'Pumpkin', hex: '#d07018' }], pantone: [{ name: 'Tangerine Tango (17-1463)', hex: '#DD4124' }, { name: 'Celosia Orange (16-1454)', hex: '#F4633A' }] },
    dark: { hex: '#8a4a10', name: 'Dark Orange', related: [{ name: 'Rust', hex: '#a04818' }, { name: 'Burnt Orange', hex: '#b85a18' }, { name: 'Terracotta', hex: '#b06040' }, { name: 'Sienna', hex: '#905030' }], pantone: [{ name: 'Potter\'s Clay (18-1340)', hex: '#9E5B40' }, { name: 'Russet Orange (17-1340)', hex: '#A44B32' }] },
  },
  { label: 'Yellow',
    light: { hex: '#f9e47a', name: 'Light Yellow', related: [{ name: 'Lemon', hex: '#f8e858' }, { name: 'Butter', hex: '#f5e098' }, { name: 'Cream', hex: '#f5f0c8' }], pantone: [{ name: 'Illuminating (13-0647)', hex: '#F5DF4D' }, { name: 'Lemon Drop (13-0756)', hex: '#FDE06B' }] },
    base: { hex: '#f1c40f', name: 'Yellow', related: [{ name: 'Gold', hex: '#d4a810' }, { name: 'Canary', hex: '#f0d020' }, { name: 'Sunflower', hex: '#e8c010' }], pantone: [{ name: 'Mimosa (14-0848)', hex: '#F0C05A' }, { name: 'Primrose Yellow (13-0755)', hex: '#F6D155' }] },
    dark: { hex: '#8a7000', name: 'Dark Yellow', related: [{ name: 'Mustard', hex: '#b09018' }, { name: 'Ochre', hex: '#a08020' }, { name: 'Saffron', hex: '#c09010' }], pantone: [{ name: 'Spicy Mustard (14-0952)', hex: '#D8AE47' }, { name: 'Nugget Gold (16-0952)', hex: '#C89B40' }] },
  },
  { label: 'Olive',
    light: { hex: '#b5b868', name: 'Light Olive', related: [{ name: 'Khaki', hex: '#bdb76b' }, { name: 'Sage', hex: '#a8b090' }, { name: 'Pistachio', hex: '#b0c078' }], pantone: [{ name: 'Sage (16-0110)', hex: '#B2AC88' }, { name: 'Dried Herb (17-0627)', hex: '#B7A990' }] },
    base: { hex: '#6b7c3a', name: 'Olive', related: [{ name: 'Army Green', hex: '#5a6830' }, { name: 'Moss', hex: '#687040' }], pantone: [{ name: 'Loden Green (18-0422)', hex: '#7A7B50' }, { name: 'Deep Lichen Green (18-0312)', hex: '#7A7656' }, { name: 'Olive Branch (17-0636)', hex: '#807447' }] },
    dark: { hex: '#4a5a1a', name: 'Dark Olive', related: [{ name: 'Drab', hex: '#4a5020' }, { name: 'Military Green', hex: '#3a4818' }], pantone: [{ name: 'Ivy Green (16-0233)', hex: '#3B4326' }, { name: 'Rifle Green (19-0419)', hex: '#414833' }] },
  },
  { label: 'Green',
    light: { hex: '#8ed1a5', name: 'Light Green', related: [{ name: 'Mint', hex: '#a0e0b8' }, { name: 'Seafoam', hex: '#90d8b0' }, { name: 'Jade', hex: '#78c8a0' }], pantone: [{ name: 'Greenery (15-0343)', hex: '#88B04B' }, { name: 'Arcadian Green (14-6316)', hex: '#00A86B' }] },
    base: { hex: '#27ae60', name: 'Green', related: [{ name: 'Emerald', hex: '#209850' }, { name: 'Kelly Green', hex: '#30a848' }, { name: 'Grass', hex: '#38a050' }], pantone: [{ name: 'Emerald (17-5641)', hex: '#009B77' }, { name: 'Jolly Green (18-5841)', hex: '#007A4D' }] },
    dark: { hex: '#1a6b3a', name: 'Dark Green', related: [{ name: 'Forest', hex: '#1a5830' }, { name: 'Hunter Green', hex: '#1a5028' }, { name: 'Pine', hex: '#184828' }], pantone: [{ name: 'Eden (19-5424)', hex: '#264E36' }, { name: 'Forest Biome (18-5616)', hex: '#20503B' }] },
  },
  { label: 'Teal',
    light: { hex: '#80cbc4', name: 'Light Teal', related: [{ name: 'Aqua', hex: '#70d0c8' }, { name: 'Turquoise', hex: '#60c8c0' }, { name: 'Seafoam', hex: '#80d0c0' }], pantone: [{ name: 'Aqua Sky (14-4811)', hex: '#7BC4C4' }, { name: 'Island Paradise (14-4620)', hex: '#95DEE3' }] },
    base: { hex: '#00897b', name: 'Teal', related: [{ name: 'Cyan', hex: '#008888' }, { name: 'Peacock', hex: '#007870' }], pantone: [{ name: 'Biscay Bay (18-4726)', hex: '#097988' }, { name: 'Tropical Green (17-5638)', hex: '#00876C' }] },
    dark: { hex: '#004d40', name: 'Dark Teal', related: [{ name: 'Deep Teal', hex: '#004038' }, { name: 'Petrol', hex: '#003840' }, { name: 'Dark Cyan', hex: '#004848' }], pantone: [{ name: 'Shaded Spruce (19-4524)', hex: '#005960' }, { name: 'Pacific (19-4057)', hex: '#1F6E6E' }] },
  },
  { label: 'Blue',
    light: { hex: '#a8c5e0', name: 'Light Blue', related: [{ name: 'Sky', hex: '#90c0e8' }, { name: 'Powder Blue', hex: '#b0d0e8' }, { name: 'Baby Blue', hex: '#a0c8e8' }, { name: 'Periwinkle', hex: '#a0a8d8' }], pantone: [{ name: 'Serenity (15-3919)', hex: '#92A8D1' }, { name: 'Cerulean (15-4020)', hex: '#9BB7D4' }, { name: 'Cashmere Blue (14-4115)', hex: '#A2B4C6' }] },
    base: { hex: '#2980b9', name: 'Blue', related: [{ name: 'Royal Blue', hex: '#2060b0' }, { name: 'Cobalt', hex: '#1848a0' }, { name: 'Sapphire', hex: '#1838a0' }], pantone: [{ name: 'Classic Blue (19-4052)', hex: '#0F4C81' }, { name: 'Snorkel Blue (19-4049)', hex: '#034F84' }] },
    dark: { hex: '#1a4a6b', name: 'Dark Blue', related: [{ name: 'Navy', hex: '#1b2a4a' }, { name: 'Midnight', hex: '#101838' }, { name: 'Indigo', hex: '#283060' }], pantone: [{ name: 'Navy Blue (19-3832)', hex: '#2B3056' }, { name: 'Blue Depths (19-3940)', hex: '#263056' }, { name: 'Dress Blues (19-3938)', hex: '#2A3756' }] },
  },
  { label: 'Purple',
    light: { hex: '#c9a0d8', name: 'Light Purple', related: [{ name: 'Lavender', hex: '#c8b0e0' }, { name: 'Lilac', hex: '#c8a8d8' }, { name: 'Mauve', hex: '#c0a0c0' }, { name: 'Wisteria', hex: '#b8a0d0' }], pantone: [{ name: 'Digital Lavender (14-3812)', hex: '#E6CFF2' }, { name: 'Orchid Bloom (16-3525)', hex: '#C48ACF' }] },
    base: { hex: '#8e44ad', name: 'Purple', related: [{ name: 'Violet', hex: '#7830a0' }, { name: 'Amethyst', hex: '#9050b0' }, { name: 'Grape', hex: '#683090' }], pantone: [{ name: 'Ultra Violet (18-3838)', hex: '#5F4B8B' }, { name: 'Royal Purple (19-3955)', hex: '#7851A9' }] },
    dark: { hex: '#5a2a6b', name: 'Dark Purple', related: [{ name: 'Plum', hex: '#582060' }, { name: 'Eggplant', hex: '#481850' }, { name: 'Aubergine', hex: '#402048' }], pantone: [{ name: 'Petunia (19-2428)', hex: '#4E2A5A' }, { name: 'Blackberry Wine (19-2118)', hex: '#4A325D' }] },
  },
]

const NEUTRAL_COLUMNS: ColorColumn[] = [
  { label: 'Brown',
    light: { hex: '#c4a87a', name: 'Light Brown', related: [{ name: 'Camel', hex: '#c8a870' }, { name: 'Tan', hex: '#c8a878' }, { name: 'Sand', hex: '#d0c098' }, { name: 'Beige', hex: '#d8c8a8' }], pantone: [{ name: 'Toasted Almond (14-1213)', hex: '#D2B48C' }, { name: 'Iced Coffee (15-1040)', hex: '#B89B72' }] },
    base: { hex: '#795548', name: 'Brown', related: [{ name: 'Chestnut', hex: '#785040' }, { name: 'Cocoa', hex: '#684838' }, { name: 'Mocha', hex: '#705038' }], pantone: [{ name: 'Leather Brown (18-1142)', hex: '#A0673C' }, { name: 'Toffee (17-1327)', hex: '#7B5B3A' }, { name: 'Emperador (19-1217)', hex: '#6A4233' }] },
    dark: { hex: '#6b4226', name: 'Dark Brown', related: [{ name: 'Chocolate', hex: '#5c3a1e' }, { name: 'Espresso', hex: '#4e3524' }, { name: 'Coffee', hex: '#5a3a22' }], pantone: [{ name: 'Cappuccino (19-1220)', hex: '#6B4226' }, { name: 'Nutmeg (18-1326)', hex: '#7B5B4A' }] },
  },
  { label: 'Taupe',
    light: { hex: '#b8ad9a', name: 'Light Taupe', related: [{ name: 'Sand', hex: '#d0c098' }, { name: 'Oatmeal', hex: '#d0c8b0' }, { name: 'Biscuit', hex: '#d8c8a8' }], pantone: [{ name: 'Simply Taupe (16-0906)', hex: '#B0A696' }, { name: 'Warm Sand (15-1218)', hex: '#C8B898' }, { name: 'Sesame (15-1215)', hex: '#C4B098' }] },
    base: { hex: '#9a8b78', name: 'Taupe', related: [{ name: 'Greige', hex: '#a09888' }, { name: 'Driftwood', hex: '#988870' }, { name: 'Pebble', hex: '#a09080' }], pantone: [{ name: 'Light Taupe (16-1210)', hex: '#A89888' }, { name: 'Warm Taupe (16-1318)', hex: '#AF9483' }, { name: 'Almondine (16-1415)', hex: '#A89078' }] },
    dark: { hex: '#7b6b63', name: 'Dark Taupe', related: [{ name: 'Mushroom', hex: '#706050' }, { name: 'Truffle', hex: '#685848' }, { name: 'Walnut', hex: '#604830' }], pantone: [{ name: 'Deep Taupe (18-1312)', hex: '#7B6B63' }, { name: 'Fossil (17-1109)', hex: '#7A6E60' }, { name: 'Bungee Cord (18-0513)', hex: '#676058' }] },
  },
  { label: 'Grey',
    light: { hex: '#d4d4d4', name: 'Light Grey', related: [{ name: 'Silver', hex: '#c0c0c0' }, { name: 'Ash', hex: '#c8c8c8' }, { name: 'Dove', hex: '#b8b0b0' }], pantone: [{ name: 'Glacier Gray (14-4102)', hex: '#C5C6C7' }, { name: 'Paloma (16-3850)', hex: '#9F9C99' }] },
    base: { hex: '#9e9e9e', name: 'Grey', related: [{ name: 'Slate', hex: '#808898' }, { name: 'Steel', hex: '#888890' }, { name: 'Pewter', hex: '#909098' }], pantone: [{ name: 'Ultimate Gray (17-5104)', hex: '#939597' }, { name: 'Neutral Gray (17-4402)', hex: '#8E8C8A' }] },
    dark: { hex: '#5a5a5a', name: 'Dark Grey', related: [{ name: 'Charcoal', hex: '#484848' }, { name: 'Gunmetal', hex: '#505058' }, { name: 'Iron', hex: '#585860' }], pantone: [{ name: 'Charcoal Gray (18-0601)', hex: '#4C4C4C' }, { name: 'Granite Gray (17-4016)', hex: '#615E5F' }] },
  },
  { label: 'Black',
    light: { hex: '#3c3c3c', name: 'Near Black', related: [{ name: 'Graphite', hex: '#383838' }, { name: 'Onyx', hex: '#282828' }, { name: 'Jet', hex: '#202020' }], pantone: [{ name: 'Anthracite (18-0403)', hex: '#28282D' }, { name: 'Black Bean (19-1101)', hex: '#2D2C2F' }] },
    base: { hex: '#1a1a1a', name: 'Black', related: [{ name: 'Ink', hex: '#101018' }, { name: 'Raven', hex: '#181820' }, { name: 'Ebony', hex: '#1a1810' }], pantone: [{ name: 'Black Beauty (19-3911)', hex: '#0B0B0B' }, { name: 'Caviar (19-0000)', hex: '#0A0A0A' }] },
  },
  { label: 'White',
    base: { hex: '#ffffff', name: 'White', related: [{ name: 'Snow', hex: '#f8f8ff' }, { name: 'Ivory', hex: '#f8f0e0' }, { name: 'Pearl', hex: '#f0ece0' }], pantone: [{ name: 'Bright White (11-0601)', hex: '#F4F5F0' }, { name: 'Blanc de Blanc (11-4800)', hex: '#F0EEE4' }] },
    dark: { hex: '#f2ece0', name: 'Off-White', related: [{ name: 'Ecru', hex: '#e8e0d0' }, { name: 'Cream', hex: '#f0e8d0' }, { name: 'Eggshell', hex: '#f0ead8' }, { name: 'Bone', hex: '#e8dcc8' }], pantone: [{ name: 'Coconut Milk (11-0608)', hex: '#EEE5DA' }, { name: 'Whisper White (11-0701)', hex: '#EDE6DB' }] },
  },
]

interface GradientShade {
  name: string
  hex: string
  description: string
  related?: RelatedShade[]
  pantone?: RelatedShade[]
}

const OFF_WHITE_SHADES: GradientShade[] = [
  { name: 'White', hex: '#ffffff', description: 'Pure white', pantone: [{ name: 'Bright White (11-0601)', hex: '#F4F5F0' }] },
  { name: 'Off-White', hex: '#f2ece0', description: 'Warm white with a subtle tint', related: [{ name: 'Cream', hex: '#f0e8d0' }, { name: 'Eggshell', hex: '#f0ead8' }], pantone: [{ name: 'Coconut Milk (11-0608)', hex: '#EEE5DA' }] },
  { name: 'Ivory', hex: '#f8f0e0', description: 'Yellow undertone', related: [{ name: 'Pearl', hex: '#f0ece0' }, { name: 'Bone', hex: '#e8dcc8' }], pantone: [{ name: 'Blanc de Blanc (11-4800)', hex: '#F0EEE4' }] },
  { name: 'Ecru', hex: '#e8e0d0', description: 'Yellow-brown undertone, like raw cotton', related: [{ name: 'Unbleached', hex: '#e0d8c8' }, { name: 'Raw Cotton', hex: '#e4dcc8' }], pantone: [{ name: 'Whisper White (11-0701)', hex: '#EDE6DB' }] },
  { name: 'Oatmeal', hex: '#d8d0c0', description: 'Grey-beige undertone, muted', related: [{ name: 'Natural', hex: '#dcd8c8' }, { name: 'Linen', hex: '#d8d0b8' }], pantone: [{ name: 'Oatmeal (12-0105)', hex: '#D8D0C0' }] },
  { name: 'Eggshell', hex: '#f0ead8', description: 'Almost neutral undertone', pantone: [{ name: 'Blanc de Blanc (11-4800)', hex: '#F0EEE4' }] },
]

const BEIGE_SAND_SHADES: GradientShade[] = [
  { name: 'Beige', hex: '#dcc8a0', description: 'Warm yellow-toned neutral', related: [{ name: 'Biscuit', hex: '#d0c0a0' }, { name: 'Parchment', hex: '#d8d0b8' }], pantone: [{ name: 'Beige (13-1008)', hex: '#D8C8A8' }] },
  { name: 'Sand', hex: '#cbb888', description: 'Like dry beach sand, more yellow', related: [{ name: 'Khaki', hex: '#bdb76b' }, { name: 'Wheat', hex: '#c8b078' }], pantone: [{ name: 'Warm Sand (15-1218)', hex: '#C8B898' }] },
]

const BROWN_SHADES: GradientShade[] = [
  { name: 'Tan', hex: '#d2b48c', description: 'Muted pale brown, like leather', related: [{ name: 'Fawn', hex: '#c0a080' }, { name: 'Buff', hex: '#c8a878' }], pantone: [{ name: 'Tan (15-1225)', hex: '#C0A070' }] },
  { name: 'Camel', hex: '#c19a6b', description: 'Rich golden-brown, like camel hair', related: [{ name: 'Tawny', hex: '#b88850' }, { name: 'Honey', hex: '#c09858' }], pantone: [{ name: 'Camel (16-1334)', hex: '#B89060' }] },
  { name: 'Light Brown', hex: '#a0825a', description: 'Neutral light brown', related: [{ name: 'Almond', hex: '#b89870' }, { name: 'Hazelnut', hex: '#a88860' }], pantone: [{ name: 'Toasted Almond (14-1213)', hex: '#D2B48C' }] },
  { name: 'Sienna', hex: '#a0522d', description: 'Warm reddish-brown clay', related: [{ name: 'Raw Sienna', hex: '#c87830' }, { name: 'Burnt Sienna', hex: '#8a3a1a' }], pantone: [{ name: 'Potter\'s Clay (18-1340)', hex: '#9E5B40' }] },
  { name: 'Brown', hex: '#795548', description: 'True medium brown', related: [{ name: 'Chestnut', hex: '#785040' }, { name: 'Cocoa', hex: '#684838' }], pantone: [{ name: 'Leather Brown (18-1142)', hex: '#A0673C' }, { name: 'Toffee (17-1327)', hex: '#7B5B3A' }] },
  { name: 'Dark Brown', hex: '#6b4226', description: 'Deep rich brown', related: [{ name: 'Chocolate', hex: '#3e2010' }, { name: 'Espresso', hex: '#301810' }], pantone: [{ name: 'Chocolate Brown (19-1625)', hex: '#44281D' }, { name: 'Coffee Bean (19-1220)', hex: '#3B2219' }] },
]

const BROWN_ORANGE_GRADIENT: GradientShade[] = [
  { name: 'Desert Brown', hex: '#B5651D', description: 'Sandy warm brown, like desert earth' },
  { name: 'Fantasy Brown', hex: '#A4550A', description: 'Warm amber-brown with orange undertone' },
  { name: 'Alert Tan', hex: '#964B00', description: 'Classic medium brown, standard brown reference' },
  { name: 'Acorn', hex: '#834200', description: 'Rich warm brown, like an acorn shell' },
  { name: 'Nutmeg Wood Finish', hex: '#673400', description: 'Deep reddish-brown, like nutmeg wood' },
]

const BROWN_DARK_ORANGE_2: GradientShade[] = [
  { name: 'Copper Brown', hex: '#9A5B24', description: 'Bright warm brown with copper tone' },
  { name: 'Russet', hex: '#80481C', description: 'Warm reddish-brown, like autumn leaves' },
  { name: 'Saddle Brown', hex: '#663A17', description: 'Classic leather saddle brown' },
  { name: 'Dark Chocolate', hex: '#4D2B11', description: 'Rich dark chocolate brown' },
  { name: 'Deep Espresso', hex: '#331D0C', description: 'Darkest brown, nearly black' },
]

const TAUPE_GRADIENT: GradientShade[] = [
  { name: 'Pale Taupe', hex: '#cdc5b8', description: 'Lightest taupe, barely tinted grey', related: [{ name: 'Ash Beige', hex: '#d0c8b8' }], pantone: [{ name: 'Silver Lining (14-0002)', hex: '#C8C0B8' }] },
  { name: 'Light Taupe', hex: '#b8ad9a', description: 'Cool grey-brown, greyer than beige', related: [{ name: 'Pebble', hex: '#b0a898' }], pantone: [{ name: 'Simply Taupe (16-0906)', hex: '#B0A696' }] },
  { name: 'Greige', hex: '#a8a090', description: 'Grey + beige, the perfect midpoint', related: [{ name: 'Stone', hex: '#a09888' }], pantone: [{ name: 'Aluminum (17-4014)', hex: '#A09898' }] },
  { name: 'Taupe', hex: '#9a8b78', description: 'True taupe, balanced grey-brown', related: [{ name: 'Driftwood', hex: '#988870' }], pantone: [{ name: 'Light Taupe (16-1210)', hex: '#A89888' }, { name: 'Warm Taupe (16-1318)', hex: '#AF9483' }] },
  { name: 'Mushroom', hex: '#8a7d70', description: 'Earthy mid-taupe, like dried mushroom', related: [{ name: 'Cinder', hex: '#887868' }], pantone: [{ name: 'Fungi (17-1109)', hex: '#8A7E70' }] },
  { name: 'Dark Taupe', hex: '#7b6b63', description: 'Deep warm brownish-grey', related: [{ name: 'Truffle', hex: '#685848' }], pantone: [{ name: 'Deep Taupe (18-1312)', hex: '#7B6B63' }] },
  { name: 'Bungee Cord', hex: '#676058', description: 'Darkest taupe, approaching charcoal', related: [{ name: 'Walnut Grey', hex: '#605850' }], pantone: [{ name: 'Bungee Cord (18-0513)', hex: '#676058' }] },
]

const GREY_GRADIENT: GradientShade[] = [
  { name: 'White', hex: '#ffffff', description: 'Pure white' },
  { name: 'Light Grey', hex: '#d4d4d4', description: 'Soft silver-grey', related: [{ name: 'Silver', hex: '#c0c0c0' }, { name: 'Ash', hex: '#c8c8c8' }], pantone: [{ name: 'Glacier Gray (14-4102)', hex: '#C5C6C7' }] },
  { name: 'Grey', hex: '#9e9e9e', description: 'True medium grey', related: [{ name: 'Slate', hex: '#808898' }, { name: 'Steel', hex: '#888890' }], pantone: [{ name: 'Ultimate Gray (17-5104)', hex: '#939597' }] },
  { name: 'Dark Grey', hex: '#5a5a5a', description: 'Deep grey', related: [{ name: 'Charcoal', hex: '#484848' }, { name: 'Gunmetal', hex: '#505058' }], pantone: [{ name: 'Charcoal Gray (18-0601)', hex: '#4C4C4C' }] },
  { name: 'Graphite', hex: '#3c3c3c', description: 'Near-black dark grey', related: [{ name: 'Onyx', hex: '#282828' }, { name: 'Jet', hex: '#202020' }], pantone: [{ name: 'Anthracite (18-0403)', hex: '#28282D' }] },
  { name: 'Black', hex: '#1a1a1a', description: 'Pure black', related: [{ name: 'Ink', hex: '#101018' }, { name: 'Ebony', hex: '#1a1810' }], pantone: [{ name: 'Black Beauty (19-3911)', hex: '#0B0B0B' }] },
]

const EARTH_TONE_GROUPS: { label: string; description: string; shades: GradientShade[] }[] = [
  { label: 'Warm Neutrals', description: 'Between off-white and brown — warm but not truly brown',
    shades: [
      { name: 'Beige', hex: '#dcc8a0', description: 'Warm yellow-toned neutral', pantone: [{ name: 'Beige (13-1008)', hex: '#D8C8A8' }] },
      { name: 'Sand', hex: '#cbb888', description: 'Like dry beach sand', pantone: [{ name: 'Warm Sand (15-1218)', hex: '#C8B898' }] },
      { name: 'Oatmeal', hex: '#d8d0c0', description: 'Unbleached fabric tone', pantone: [{ name: 'Oatmeal (12-0105)', hex: '#D8D0C0' }] },
    ],
  },
  { label: 'Shades of Brown', description: 'True browns — from golden to deep dark',
    shades: [
      { name: 'Tan', hex: '#d2b48c', description: 'Light muted brown, like leather', pantone: [{ name: 'Tan (15-1225)', hex: '#C0A070' }] },
      { name: 'Camel', hex: '#c19a6b', description: 'Rich golden-brown', pantone: [{ name: 'Camel (16-1334)', hex: '#B89060' }] },
      { name: 'Sienna', hex: '#a0522d', description: 'Warm reddish-brown clay', pantone: [{ name: 'Potter\'s Clay (18-1340)', hex: '#9E5B40' }] },
      { name: 'Umber', hex: '#635147', description: 'Dark earthy brown', pantone: [{ name: 'Emperador (19-1217)', hex: '#6A4233' }] },
    ],
  },
  { label: 'Taupe Family', description: 'Between brown and grey — neither fully warm nor cool',
    shades: [
      { name: 'Greige', hex: '#a8a090', description: 'Grey + beige midpoint', pantone: [{ name: 'Aluminum (17-4014)', hex: '#A09898' }] },
      { name: 'Taupe', hex: '#9a8b78', description: 'Balanced grey-brown', pantone: [{ name: 'Warm Taupe (16-1318)', hex: '#AF9483' }] },
      { name: 'Mushroom', hex: '#8a7d70', description: 'Earthy mid-taupe', pantone: [{ name: 'Fungi (17-1109)', hex: '#8A7E70' }] },
    ],
  },
  { label: 'Warm Reds & Oranges', description: 'Muted warm tones found in clay and iron',
    shades: [
      { name: 'Terracotta', hex: '#b06040', description: 'Baked clay, warm orange-brown', pantone: [{ name: 'Russet Orange (17-1340)', hex: '#A44B32' }] },
      { name: 'Rust', hex: '#a04818', description: 'Oxidized iron, deep orange', pantone: [{ name: 'Potter\'s Clay (18-1340)', hex: '#9E5B40' }] },
      { name: 'Clay', hex: '#b66a50', description: 'Natural red-brown clay', pantone: [{ name: 'Burnt Brick (18-1350)', hex: '#B06048' }] },
    ],
  },
  { label: 'Muted Yellows', description: 'Warm earth pigments and golden tones',
    shades: [
      { name: 'Ochre', hex: '#a08020', description: 'Yellow-brown earth pigment', pantone: [{ name: 'Nugget Gold (16-0952)', hex: '#C89B40' }] },
      { name: 'Mustard', hex: '#b09018', description: 'Dark warm yellow', pantone: [{ name: 'Spicy Mustard (14-0952)', hex: '#D8AE47' }] },
      { name: 'Amber', hex: '#d89020', description: 'Golden fossilized resin', pantone: [{ name: 'Mimosa (14-0848)', hex: '#F0C05A' }] },
    ],
  },
  { label: 'Muted Greens', description: 'Low-saturation greens from vegetation and landscapes',
    shades: [
      { name: 'Olive', hex: '#6b7c3a', description: 'Muted yellow-green', pantone: [{ name: 'Olive Branch (17-0636)', hex: '#807447' }] },
      { name: 'Moss', hex: '#687040', description: 'Deep forest floor green', pantone: [{ name: 'Loden Green (18-0422)', hex: '#7A7B50' }] },
      { name: 'Sage', hex: '#a8b090', description: 'Pale grey-green herb', pantone: [{ name: 'Sage (16-0110)', hex: '#B2AC88' }] },
      { name: 'Khaki', hex: '#bdb76b', description: 'Dusty yellow-green', pantone: [{ name: 'Dried Herb (17-0627)', hex: '#B7A990' }] },
    ],
  },
]

export function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 180
}

export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  const d = max - min
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1))
    switch (max) {
      case r: h = ((g - b) / d) % 6; break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h *= 60
    if (h < 0) h += 360
  }
  return `HSL(${Math.round(h)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}


export default function ColorPalettes() {
  const [selectedColor, setSelectedColor] = useState<{ hex: string; name: string; related?: RelatedShade[]; pantone?: RelatedShade[] } | null>(null)

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950">
      <div className="px-8 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-1">Color Palettes</h2>
        <p className="text-stone-400 dark:text-stone-500 text-sm mb-8">The complete color space for your wardrobe.</p>

        {/* Color wheel + info panel */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 px-6 py-5">
          <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">Colors</p>
          <div className="flex gap-8 items-start">
            <svg viewBox="-30 -30 560 560" className="w-full max-w-md shrink-0">
              {COLOR_COLUMNS.map(({ label, light, base, dark }, i) => {
                const count = COLOR_COLUMNS.length
                const cx = 250
                const cy = 250
                const a1raw = (i / count) * 2 * Math.PI - Math.PI / 2
                const a2raw = ((i + 1) / count) * 2 * Math.PI - Math.PI / 2
                const rInner = 60
                const r1 = 120
                const r2 = 180
                const rOuter = 240

                function arc(rIn: number, rOut: number, startA: number, endA: number) {
                  const x1i = cx + rIn * Math.cos(startA)
                  const y1i = cy + rIn * Math.sin(startA)
                  const x2i = cx + rIn * Math.cos(endA)
                  const y2i = cy + rIn * Math.sin(endA)
                  const x1o = cx + rOut * Math.cos(startA)
                  const y1o = cy + rOut * Math.sin(startA)
                  const x2o = cx + rOut * Math.cos(endA)
                  const y2o = cy + rOut * Math.sin(endA)
                  return `M${x1i},${y1i} L${x1o},${y1o} A${rOut},${rOut} 0 0,1 ${x2o},${y2o} L${x2i},${y2i} A${rIn},${rIn} 0 0,0 ${x1i},${y1i}Z`
                }

                const midA = (a1raw + a2raw) / 2
                const labelR = rOuter + 18
                const pixelGap = 4
                const gapInner = pixelGap / ((rInner + r1) / 2)
                const gapMid = pixelGap / ((r1 + r2) / 2)
                const gapOuter = pixelGap / ((r2 + rOuter) / 2)

                return (
                  <g key={label}>
                    {/* Dark - inner ring */}
                    <path
                      d={arc(rInner, r1 - 4, a1raw + gapInner, a2raw - gapInner)}
                      fill={dark?.hex ?? base.hex}
                      opacity={dark ? 1 : 0.3}
                      className="hover:opacity-80 cursor-pointer"
                      onClick={() => dark && setSelectedColor({ hex: dark.hex, name: dark.name, related: dark.related, pantone: dark.pantone })}
                    >
                      {dark && <title>{dark.name}</title>}
                    </path>
                    {/* Base - middle ring */}
                    <path
                      d={arc(r1 + 4, r2 - 4, a1raw + gapMid, a2raw - gapMid)}
                      fill={base.hex}
                      className="hover:opacity-80 cursor-pointer"
                      onClick={() => setSelectedColor({ hex: base.hex, name: base.name, related: base.related, pantone: base.pantone })}
                    >
                      <title>{base.name}</title>
                    </path>
                    {/* Light - outer ring */}
                    <path
                      d={arc(r2 + 4, rOuter, a1raw + gapOuter, a2raw - gapOuter)}
                      fill={light?.hex ?? base.hex}
                      opacity={light ? 1 : 0.3}
                      className="hover:opacity-80 cursor-pointer"
                      onClick={() => light && setSelectedColor({ hex: light.hex, name: light.name, related: light.related, pantone: light.pantone })}
                    >
                      {light && <title>{light.name}</title>}
                    </path>
                    {/* Label */}
                    <text
                      x={cx + labelR * Math.cos(midA)}
                      y={cy + labelR * Math.sin(midA)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="22"
                      fontFamily="ui-sans-serif, system-ui, sans-serif"
                      fill="currentColor"
                      className="text-stone-500 dark:text-stone-400"
                      transform={(() => {
                        const deg = midA * 180 / Math.PI - 90
                        const flip = ['Blue', 'Purple', 'Pink', 'Red'].includes(label)
                        return `rotate(${flip ? deg + 180 : deg}, ${cx + labelR * Math.cos(midA)}, ${cy + labelR * Math.sin(midA)})`
                      })()}
                    >
                      {label}
                    </text>
                  </g>
                )
              })}
            </svg>

          </div>

        </div>

        {/* Rectangular color grid */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 px-6 py-5 mt-10">
          {[
            { title: 'Chromatic Colors', columns: COLOR_COLUMNS },
            { title: 'Neutral Colors', columns: NEUTRAL_COLUMNS },
          ].map(({ title, columns }, si) => (
            <div key={title} className={si > 0 ? 'border-t border-stone-100 dark:border-stone-800 mt-4 pt-4' : ''}>
              <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">{title}</p>
              <div className="inline-grid gap-y-2 gap-x-3" style={{ gridTemplateColumns: `auto repeat(${columns.length}, auto)` }}>
                <div />
                {columns.map(({ label }) => (
                  <div key={label} className="flex justify-start">
                    <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">{label}</span>
                  </div>
                ))}
                {(['light', 'base', 'dark'] as const).map(row => (
                  <>
                    <div key={`${title}-${row}-label`} className="flex items-center pr-3">
                      <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider">{row === 'base' ? 'Base' : row === 'light' ? 'Light' : 'Dark'}</span>
                    </div>
                    {columns.map(col => {
                      const shade = col[row]
                      return (
                        <div key={`${title}-${col.label}-${row}`} className="flex justify-start">
                          {shade ? (
                            <span
                              className="w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: shade.hex, boxShadow: isLightColor(shade.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined }}
                              onClick={() => setSelectedColor({ hex: shade.hex, name: shade.name, related: shade.related, pantone: shade.pantone })}
                            />
                          ) : (
                            <span className="w-12 h-12" />
                          )}
                        </div>
                      )
                    })}
                  </>
                ))}
              </div>
            </div>
          ))}

          {/* Neutral Visualizations */}
          <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">Neutral Color Maps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* 1. Radial diagram */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">Radial</p>
                <svg viewBox="0 0 300 300" className="w-64 h-64">
                  {(() => {
                    const cx = 150, cy = 150
                    const families = [
                      { label: 'Grey', angle: -90, shades: ['#d4d4d4','#9e9e9e','#5a5a5a','#3c3c3c'] },
                      { label: 'Taupe', angle: 30, shades: ['#b8ad9a','#9a8b78','#7b6b63','#676058'] },
                      { label: 'Brown', angle: 150, shades: ['#c4a87a','#795548','#6b4226','#301810'] },
                    ]
                    return <>
                      {families.map(({ label, angle, shades }) => {
                        const rad = angle * Math.PI / 180
                        const spreadAngle = 40
                        return shades.map((hex, i) => {
                          const r1 = 20 + i * 28
                          const r2 = 20 + (i + 1) * 28
                          const a1 = (angle - spreadAngle / 2) * Math.PI / 180
                          const a2 = (angle + spreadAngle / 2) * Math.PI / 180
                          return (
                            <path
                              key={`${label}-${i}`}
                              d={`M ${cx + r1 * Math.cos(a1)} ${cy + r1 * Math.sin(a1)} A ${r1} ${r1} 0 0 1 ${cx + r1 * Math.cos(a2)} ${cy + r1 * Math.sin(a2)} L ${cx + r2 * Math.cos(a2)} ${cy + r2 * Math.sin(a2)} A ${r2} ${r2} 0 0 0 ${cx + r2 * Math.cos(a1)} ${cy + r2 * Math.sin(a1)} Z`}
                              fill={hex}
                              stroke="white"
                              strokeWidth="1"
                            />
                          )
                        }).concat(
                          <text
                            key={`${label}-text`}
                            x={cx + 145 * Math.cos(rad)}
                            y={cy + 145 * Math.sin(rad)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            className="fill-stone-500 dark:fill-stone-400"
                          >{label}</text>
                        )
                      })}
                      <circle cx={cx} cy={cy} r="20" fill="#1a1a1a" />
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="white">Black</text>
                    </>
                  })()}
                </svg>
                <p className="text-[9px] text-stone-400 dark:text-stone-500 text-center">Black at center, three arms radiating outward</p>
              </div>

              {/* 2. Triangle */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">Triangle</p>
                <svg viewBox="0 0 300 280" className="w-64 h-64">
                  {(() => {
                    const top = { x: 150, y: 20 }
                    const bl = { x: 30, y: 260 }
                    const br = { x: 270, y: 260 }
                    const mid = { x: 150, y: 180 }
                    const leftEdge = [
                      { hex: '#ffffff', x: top.x, y: top.y },
                      { hex: '#d4d4d4', x: (top.x + bl.x) / 2, y: (top.y + bl.y) / 2 - 20 },
                      { hex: '#9e9e9e', x: bl.x + 30, y: bl.y - 60 },
                      { hex: '#3c3c3c', x: bl.x, y: bl.y },
                    ]
                    const rightEdge = [
                      { hex: '#c4a87a', x: (top.x + br.x) / 2, y: (top.y + br.y) / 2 - 20 },
                      { hex: '#795548', x: br.x - 30, y: br.y - 60 },
                      { hex: '#6b4226', x: br.x, y: br.y },
                    ]
                    const centerPoints = [
                      { hex: '#b8ad9a', x: mid.x - 20, y: mid.y - 30 },
                      { hex: '#9a8b78', x: mid.x, y: mid.y },
                      { hex: '#7b6b63', x: mid.x + 20, y: mid.y + 30 },
                    ]
                    const bottomEdge = [
                      { hex: '#5a5a5a', x: bl.x + 60, y: bl.y - 10 },
                      { hex: '#1a1a1a', x: 150, y: bl.y },
                    ]
                    const allPoints = [...leftEdge, ...rightEdge, ...centerPoints, ...bottomEdge]
                    return <>
                      <polygon points={`${top.x},${top.y} ${bl.x},${bl.y} ${br.x},${br.y}`} fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-200 dark:text-stone-700" />
                      {allPoints.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="14" fill={p.hex} stroke="white" strokeWidth="1.5" />
                      ))}
                      <text x={top.x} y={top.y - 8} textAnchor="middle" fontSize="9" className="fill-stone-500 dark:fill-stone-400">White</text>
                      <text x={bl.x - 5} y={bl.y + 14} textAnchor="start" fontSize="9" className="fill-stone-500 dark:fill-stone-400">Grey</text>
                      <text x={br.x + 5} y={br.y + 14} textAnchor="end" fontSize="9" className="fill-stone-500 dark:fill-stone-400">Brown</text>
                      <text x={150} y={bl.y + 14} textAnchor="middle" fontSize="9" className="fill-stone-500 dark:fill-stone-400">Black</text>
                      <text x={mid.x + 30} y={mid.y - 10} fontSize="9" className="fill-stone-500 dark:fill-stone-400">Taupe</text>
                    </>
                  })()}
                </svg>
                <p className="text-[9px] text-stone-400 dark:text-stone-500 text-center">White top, Grey left, Brown right, Taupe center</p>
              </div>

              {/* 3. Linear spectrum */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">Spectrum</p>
                <svg viewBox="0 0 280 260" className="w-64 h-64">
                  {(() => {
                    const points = [
                      { hex: '#d4d4d4', x: 40, y: 30, label: 'Lt Grey' },
                      { hex: '#9e9e9e', x: 40, y: 80 },
                      { hex: '#5a5a5a', x: 40, y: 130 },
                      { hex: '#3c3c3c', x: 40, y: 180 },
                      { hex: '#b8ad9a', x: 140, y: 40, label: 'Lt Taupe' },
                      { hex: '#9a8b78', x: 140, y: 90 },
                      { hex: '#7b6b63', x: 140, y: 140 },
                      { hex: '#676058', x: 140, y: 190 },
                      { hex: '#c4a87a', x: 240, y: 30, label: 'Lt Brown' },
                      { hex: '#795548', x: 240, y: 80 },
                      { hex: '#6b4226', x: 240, y: 130 },
                      { hex: '#301810', x: 240, y: 180 },
                      { hex: '#1a1a1a', x: 140, y: 235 },
                      { hex: '#ffffff', x: 140, y: 10 },
                    ]
                    return <>
                      <text x={140} y={255} textAnchor="middle" fontSize="8" className="fill-stone-400 dark:fill-stone-500">← Cool · · · Warm →</text>
                      <text x={8} y={130} textAnchor="middle" fontSize="8" className="fill-stone-400 dark:fill-stone-500" transform="rotate(-90, 8, 130)">Light → Dark</text>
                      <text x={40} y={215} textAnchor="middle" fontSize="9" className="fill-stone-500 dark:fill-stone-400">Grey</text>
                      <text x={140} y={215} textAnchor="middle" fontSize="9" className="fill-stone-500 dark:fill-stone-400">Taupe</text>
                      <text x={240} y={215} textAnchor="middle" fontSize="9" className="fill-stone-500 dark:fill-stone-400">Brown</text>
                      <line x1={40} y1={180} x2={140} y2={235} stroke="currentColor" strokeWidth="0.5" className="text-stone-300 dark:text-stone-600" />
                      <line x1={140} y1={190} x2={140} y2={235} stroke="currentColor" strokeWidth="0.5" className="text-stone-300 dark:text-stone-600" />
                      <line x1={240} y1={180} x2={140} y2={235} stroke="currentColor" strokeWidth="0.5" className="text-stone-300 dark:text-stone-600" />
                      <line x1={140} y1={10} x2={40} y2={30} stroke="currentColor" strokeWidth="0.5" className="text-stone-300 dark:text-stone-600" />
                      <line x1={140} y1={10} x2={140} y2={40} stroke="currentColor" strokeWidth="0.5" className="text-stone-300 dark:text-stone-600" />
                      <line x1={140} y1={10} x2={240} y2={30} stroke="currentColor" strokeWidth="0.5" className="text-stone-300 dark:text-stone-600" />
                      {points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="13" fill={p.hex} stroke="white" strokeWidth="1.5" />
                      ))}
                    </>
                  })()}
                </svg>
                <p className="text-[9px] text-stone-400 dark:text-stone-500 text-center">Cool↔Warm horizontal, Light→Dark vertical</p>
              </div>

            </div>
          </div>

          {/* Shade sections — reusable renderer */}
          {[
            { title: 'Off-White Shades', description: 'Off-white is an umbrella term for near-white shades, each with a different undertone: Ivory (yellow), Cream (warm yellow), Ecru (yellow-brown), Oatmeal (grey-beige), Eggshell (neutral).', shades: OFF_WHITE_SHADES },
          ].map(({ title, description, shades }) => (
            <div key={title} className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
              <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">{title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{description}</p>
              <div className="flex gap-3 flex-wrap">
                {shades.map(shade => (
                  <div
                    key={shade.name}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => setSelectedColor({ hex: shade.hex, name: shade.name, related: shade.related, pantone: shade.pantone })}
                  >
                    <span
                      className="w-14 h-14 rounded-full group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: shade.hex, boxShadow: isLightColor(shade.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined }}
                    />
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 text-center leading-tight max-w-[60px]">{shade.name}</span>
                    <span className="text-[8px] text-stone-400 dark:text-stone-500 text-center leading-tight max-w-[70px]">{shade.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* White Gradients */}
          <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">White Gradients</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">How white transitions toward different colors. Each row shows a smooth gradient — notice how even a tiny tint away from pure white creates an off-white shade.</p>
            <div className="space-y-3">
              {[
                { label: 'Grey (achromatic)', to: [128, 128, 128] },
                { label: 'Light Red', to: [230, 168, 160] },
                { label: 'Light Blue', to: [168, 197, 224] },
                { label: 'Light Green', to: [142, 209, 165] },
                { label: 'Light Olive', to: [181, 184, 104] },
                { label: 'Light Yellow', to: [249, 228, 122] },
                { label: 'Light Orange', to: [245, 200, 154] },
              ].map(({ label, to }) => {
                const steps = 12
                const circles = Array.from({ length: steps }, (_, i) => {
                  const t = i / (steps - 1)
                  const r = Math.round(255 + (to[0] - 255) * t)
                  const g = Math.round(255 + (to[1] - 255) * t)
                  const b = Math.round(255 + (to[2] - 255) * t)
                  const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
                  return hex
                })
                return (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-[9px] text-stone-500 dark:text-stone-400 w-24 text-right shrink-0">{label}</span>
                    <div className="flex gap-1">
                      {circles.map((hex, i) => (
                        <span
                          key={i}
                          className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: hex, boxShadow: isLightColor(hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.10)' : undefined }}
                          onClick={() => setSelectedColor({ hex, name: `${label} ${Math.round((i / (steps - 1)) * 100)}%` })}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {[
            { title: 'Beige & Sand', description: 'Warm neutrals between off-white and brown — not truly brown, but warmer than off-white. They sit in the transitional zone.', shades: BEIGE_SAND_SHADES },
            { title: 'Brown Shades', description: 'Brown is essentially a dark, low-saturation shade of orange. It doesn\'t appear on the color wheel as its own hue — take orange, reduce its brightness and saturation, and you get brown. The only neutral that is actually a darkened chromatic color.', shades: BROWN_SHADES },
            { title: 'Brown as Dark Orange', description: 'Orange at decreasing brightness levels — showing how brown emerges from a chromatic color.', shades: BROWN_ORANGE_GRADIENT },
            { title: 'Brown as Dark Orange (deeper)', description: 'A darker range — from near-black espresso to warm copper brown.', shades: BROWN_DARK_ORANGE_2 },
          ].map(({ title, description, shades }) => (
            <div key={title} className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
              <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">{title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{description}</p>
              <div className="flex gap-3 flex-wrap">
                {shades.map(shade => (
                  <div
                    key={shade.name}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => setSelectedColor({ hex: shade.hex, name: shade.name, related: shade.related, pantone: shade.pantone })}
                  >
                    <span
                      className="w-14 h-14 rounded-full group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: shade.hex, boxShadow: isLightColor(shade.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined }}
                    />
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 text-center leading-tight max-w-[60px]">{shade.name}</span>
                    <span className="text-[8px] text-stone-400 dark:text-stone-500 text-center leading-tight max-w-[70px]">{shade.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Orange → Black gradient (20 steps) */}
          <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">Orange → Black</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">20 steps from orange to black — every shade in between is a brown.</p>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 20 }, (_, i) => {
                const t = i / 19
                const r = Math.round(230 * (1 - t))
                const g = Math.round(126 * (1 - t))
                const b = Math.round(34 * (1 - t))
                const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
                return (
                  <span
                    key={i}
                    className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: hex }}
                    onClick={() => setSelectedColor({ hex, name: `Orange→Black ${Math.round(t * 100)}%` })}
                  />
                )
              })}
            </div>
          </div>

          {/* How Brown is Made */}
          <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">How Brown is Made</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">Brown can be produced two ways: by mixing red, yellow and black pigments, or by combining orange and black.</p>
            <div className="flex gap-10 flex-wrap items-start">

              {/* Triangle: Red + Yellow + Black = Brown with gradient fill */}
              {(() => {
                const W = 400, H = 380
                const vR = { x: 200, y: 30 }
                const vY = { x: 360, y: 330 }
                const vB = { x: 40, y: 330 }

                function bary(px: number, py: number) {
                  const d = (vY.y - vB.y) * (vR.x - vB.x) + (vB.x - vY.x) * (vR.y - vB.y)
                  const wR = ((vY.y - vB.y) * (px - vB.x) + (vB.x - vY.x) * (py - vB.y)) / d
                  const wY = ((vB.y - vR.y) * (px - vB.x) + (vR.x - vB.x) * (py - vB.y)) / d
                  const wB = 1 - wR - wY
                  return { wR, wY, wB }
                }

                function mixColor(px: number, py: number) {
                  const { wR, wY, wB } = bary(px, py)
                  const r = Math.round(0xcc * wR + 0xe6 * wY + 0x1a * wB)
                  const g = Math.round(0x00 * wR + 0xb8 * wY + 0x1a * wB)
                  const b = Math.round(0x00 * wR + 0x00 * wY + 0x1a * wB)
                  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
                }

                function handleTriClick(e: React.MouseEvent<SVGSVGElement>) {
                  const svg = e.currentTarget
                  const rect = svg.getBoundingClientRect()
                  const scaleX = W / rect.width
                  const scaleY = H / rect.height
                  const px = (e.clientX - rect.left) * scaleX
                  const py = (e.clientY - rect.top) * scaleY
                  const { wR, wY, wB } = bary(px, py)
                  if (wR < -0.02 || wY < -0.02 || wB < -0.02) return
                  const hex = mixColor(px, py)
                  setSelectedColor({ hex, name: `Mix (${Math.round(wR*100)}% Red, ${Math.round(wY*100)}% Yellow, ${Math.round(wB*100)}% Black)` })
                }

                const rows: React.ReactElement[] = []
                const step = 6
                for (let py = vR.y; py <= vY.y; py += step) {
                  for (let px = vB.x; px <= vY.x; px += step) {
                    const { wR, wY, wB } = bary(px, py)
                    if (wR < -0.01 || wY < -0.01 || wB < -0.01) continue
                    rows.push(<rect key={`${px}-${py}`} x={px} y={py} width={step} height={step} fill={mixColor(px, py)} />)
                  }
                }

                return (
                  <div className="flex flex-col items-center gap-2">
                    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="cursor-crosshair" onClick={handleTriClick}>
                      <clipPath id="tri-clip">
                        <polygon points={`${vR.x},${vR.y} ${vB.x},${vY.y} ${vY.x},${vY.y}`} />
                      </clipPath>
                      <g clipPath="url(#tri-clip)">
                        {rows}
                      </g>
                      <polygon points={`${vR.x},${vR.y} ${vB.x},${vY.y} ${vY.x},${vY.y}`} fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                      <circle cx={vR.x} cy={vR.y} r="16" fill="#cc0000" stroke="white" strokeWidth="2" />
                      <circle cx={vY.x} cy={vY.y} r="16" fill="#e6b800" stroke="white" strokeWidth="2" />
                      <circle cx={vB.x} cy={vB.y} r="16" fill="#1a1a1a" stroke="white" strokeWidth="2" />
                      <text x={vR.x} y={vR.y - 22} textAnchor="middle" fontSize="13" className="fill-stone-600 dark:fill-stone-300" fontFamily="ui-sans-serif, system-ui, sans-serif">Red</text>
                      <text x={vY.x + 22} y={vY.y} textAnchor="start" fontSize="13" className="fill-stone-600 dark:fill-stone-300" fontFamily="ui-sans-serif, system-ui, sans-serif">Yellow</text>
                      <text x={vB.x - 22} y={vB.y} textAnchor="end" fontSize="13" className="fill-stone-600 dark:fill-stone-300" fontFamily="ui-sans-serif, system-ui, sans-serif">Black</text>
                    </svg>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 text-center">Click anywhere in the triangle to see the color</p>
                  </div>
                )
              })()}

              {/* Gradient stripes: Light/Medium/Dark Orange → Black */}
              <div className="flex flex-col items-center gap-4">
                {[
                  { id: 'light-o-b', label: 'Light Orange', color: '#f5a623' },
                  { id: 'mid-o-b', label: 'Orange', color: '#e67e22' },
                  { id: 'dark-o-b', label: 'Dark Orange', color: '#c45e0a' },
                ].map(({ id, label, color }) => (
                  <div key={id} className="flex items-center gap-2">
                    <span className="text-[9px] text-stone-500 dark:text-stone-400 w-20 text-right shrink-0">{label}</span>
                    <svg width="240" height="28" viewBox="0 0 240 28" className="shrink-0">
                      <defs>
                        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={color} />
                          <stop offset="100%" stopColor="#1a1a1a" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="240" height="28" rx="4" fill={`url(#${id})`} />
                    </svg>
                    <span className="text-[9px] text-stone-500 dark:text-stone-400 shrink-0">Black</span>
                  </div>
                ))}
                <p className="text-[10px] text-stone-400 dark:text-stone-500 text-center">Orange + Black = Brown</p>
              </div>

            </div>
          </div>
        </div>

        {/* Full Color Spectrum */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 px-6 py-5 mt-10">
          <div>
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Full Color Spectrum</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">All hues at every lightness level. Horizontal axis: hue (red → yellow → green → cyan → blue → magenta). Vertical axis: lightness (white at top, black at bottom). Click to pick a color.</p>
            <div className="flex flex-col gap-1">
              <canvas
                ref={(canvas) => {
                  if (!canvas || canvas.dataset.drawn) return
                  canvas.dataset.drawn = '1'
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return
                  const w = canvas.width, h = canvas.height
                  for (let x = 0; x < w; x++) {
                    const hue = (x / w) * 360
                    for (let y = 0; y < h; y++) {
                      const lightness = 100 - (y / h) * 100
                      ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`
                      ctx.fillRect(x, y, 1, 1)
                    }
                  }
                }}
                width={720}
                height={200}
                className="w-full rounded-lg cursor-default border border-stone-200 dark:border-stone-700"
                style={{ imageRendering: 'pixelated' }}
                onClick={(e) => {
                  const canvas = e.currentTarget
                  const rect = canvas.getBoundingClientRect()
                  const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width))
                  const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height))
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return
                  const pixel = ctx.getImageData(x, y, 1, 1).data
                  const hex = `#${pixel[0].toString(16).padStart(2,'0')}${pixel[1].toString(16).padStart(2,'0')}${pixel[2].toString(16).padStart(2,'0')}`
                  const hue = Math.round((x / canvas.width) * 360)
                  const lightness = Math.round(100 - (y / canvas.height) * 100)
                  setSelectedColor({ hex, name: `HSL(${hue}°, 100%, ${lightness}%)` })
                }}
              />
              <div className="flex justify-between px-1">
                <span className="text-[9px] text-stone-400 dark:text-stone-500">Red</span>
                <span className="text-[9px] text-stone-400 dark:text-stone-500">Yellow</span>
                <span className="text-[9px] text-stone-400 dark:text-stone-500">Green</span>
                <span className="text-[9px] text-stone-400 dark:text-stone-500">Cyan</span>
                <span className="text-[9px] text-stone-400 dark:text-stone-500">Blue</span>
                <span className="text-[9px] text-stone-400 dark:text-stone-500">Magenta</span>
                <span className="text-[9px] text-stone-400 dark:text-stone-500">Red</span>
              </div>
            </div>
          </div>

          {/* Annotated Color Spectrum — color family regions */}
          <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Color Family Map</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">Where each color family lives on the spectrum. Horizontal: hue. Vertical: lightness (white top, black bottom). Brown and olive are dark shades of orange and yellow-green.</p>
            <div className="relative">
              <canvas
                ref={(canvas) => {
                  if (!canvas || canvas.dataset.drawn) return
                  canvas.dataset.drawn = '1'
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return
                  const w = canvas.width, h = canvas.height
                  for (let x = 0; x < w; x++) {
                    const hue = (x / w) * 360
                    for (let y = 0; y < h; y++) {
                      const lightness = 100 - (y / h) * 100
                      ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`
                      ctx.fillRect(x, y, 1, 1)
                    }
                  }
                }}
                width={720}
                height={200}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-700"
                style={{ imageRendering: 'pixelated' }}
              />
              {/* SVG overlay with color family regions */}
              <svg viewBox="0 0 720 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* === Primary colors === */}
                <g className="cursor-default">
                  <ellipse cx="15" cy="90" rx="40" ry="50" fill="transparent" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <text x="15" y="95" textAnchor="middle" fontSize="16" fontWeight="600" fill="white" opacity="0.85" fontFamily="ui-sans-serif, system-ui, sans-serif">R</text>
                  <title>Red — primary color, hue 0°. Warm, advancing color.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="705" cy="90" rx="40" ry="50" fill="transparent" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <text x="705" y="95" textAnchor="middle" fontSize="16" fontWeight="600" fill="white" opacity="0.85" fontFamily="ui-sans-serif, system-ui, sans-serif">R</text>
                  <title>Red — primary color, hue 360°. Wraps around from magenta.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="120" cy="75" rx="28" ry="40" fill="transparent" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
                  <text x="120" y="80" textAnchor="middle" fontSize="16" fontWeight="600" fill="rgba(0,0,0,0.6)" fontFamily="ui-sans-serif, system-ui, sans-serif">Y</text>
                  <title>Yellow — primary color, hue 60°. Highest perceived brightness of any hue.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="240" cy="85" rx="35" ry="50" fill="transparent" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <text x="240" y="92" textAnchor="middle" fontSize="16" fontWeight="600" fill="white" opacity="0.85" fontFamily="ui-sans-serif, system-ui, sans-serif">G</text>
                  <title>Green — primary color, hue 120°. The eye is most sensitive to green wavelengths.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="480" cy="85" rx="35" ry="50" fill="transparent" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <text x="480" y="92" textAnchor="middle" fontSize="16" fontWeight="600" fill="white" opacity="0.85" fontFamily="ui-sans-serif, system-ui, sans-serif">B</text>
                  <title>Blue — primary color, hue 240°. Cool, receding color.</title>
                </g>

                {/* === Secondary colors (same size as primaries) === */}
                <g className="cursor-default">
                  <ellipse cx="360" cy="85" rx="35" ry="50" fill="transparent" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <text x="360" y="92" textAnchor="middle" fontSize="16" fontWeight="600" fill="white" opacity="0.85" fontFamily="ui-sans-serif, system-ui, sans-serif">Cn</text>
                  <title>Cyan — secondary color, hue 180°. Mix of green + blue. Complement of red.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="600" cy="90" rx="35" ry="50" fill="transparent" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <text x="600" y="95" textAnchor="middle" fontSize="16" fontWeight="600" fill="white" opacity="0.85" fontFamily="ui-sans-serif, system-ui, sans-serif">Mg</text>
                  <title>Magenta — secondary color, hue 300°. Mix of red + blue. Complement of green.</title>
                </g>

                {/* === Tertiary colors === */}
                <g className="cursor-default">
                  <ellipse cx="60" cy="95" rx="22" ry="30" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="60" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">O</text>
                  <title>Orange — tertiary, hue 30°. Between red and yellow. Darkened orange = brown.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="180" cy="80" rx="22" ry="30" fill="transparent" stroke="rgba(0,0,0,0.45)" strokeWidth="1.2" />
                  <text x="180" y="85" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.55)" fontFamily="ui-sans-serif, system-ui, sans-serif">Ch</text>
                  <title>Chartreuse — tertiary, hue 90°. Between yellow and green. Yellow-green.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="300" cy="80" rx="22" ry="30" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="300" y="85" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Sp</text>
                  <title>Spring Green — tertiary, hue 150°. Between green and cyan. Mint-like.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="390" cy="85" rx="18" ry="25" fill="transparent" stroke="white" strokeWidth="1" opacity="0.5" />
                  <text x="390" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="white" opacity="0.7" fontFamily="ui-sans-serif, system-ui, sans-serif">Ce</text>
                  <title>Cerulean — hue ~195°. Between cyan and azure. A deep sky blue with a slight green tint.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="420" cy="85" rx="22" ry="30" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="420" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Az</text>
                  <title>Azure — tertiary, hue 210°. Between cyan and blue. Sky blue.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="540" cy="90" rx="22" ry="30" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="540" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Vi</text>
                  <title>Violet — tertiary, hue 270°. Between blue and magenta. Indigo/purple zone.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="570" cy="90" rx="18" ry="25" fill="transparent" stroke="white" strokeWidth="1" opacity="0.5" />
                  <text x="570" y="95" textAnchor="middle" fontSize="9" fontWeight="600" fill="white" opacity="0.7" fontFamily="ui-sans-serif, system-ui, sans-serif">Pu</text>
                  <title>Purple — hue ~285°. Between violet and magenta. More red than violet, the classic regal purple.</title>
                </g>
                <g className="cursor-default">
                  <ellipse cx="660" cy="85" rx="22" ry="30" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="660" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Rs</text>
                  <title>Rose — tertiary, hue 330°. Between magenta and red. Pinkish-red.</title>
                </g>

                {/* === Dark variants (lower) === */}
                {/* Maroon — dark red, hue ~0 */}
                <g className="cursor-default">
                  <ellipse cx="15" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="15" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Mr</text>
                  <title>Maroon — dark red. Oxblood, deep crimson. Hue ~0° at low lightness.</title>
                </g>
                {/* Brown — dark orange, hue ~30 */}
                <g className="cursor-default">
                  <ellipse cx="60" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="60" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Br</text>
                  <title>Brown — dark orange. Chocolate, espresso. Hue ~30° at low lightness.</title>
                </g>
                {/* Olive — dark yellow/chartreuse, hue ~60-80 */}
                <g className="cursor-default">
                  <ellipse cx="140" cy="150" rx="40" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="140" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Ol</text>
                  <title>Olive — dark yellow/chartreuse. Army green, moss, khaki. Hue ~60-80° at low lightness.</title>
                </g>
                {/* Forest — dark green, hue ~120 */}
                <g className="cursor-default">
                  <ellipse cx="240" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="240" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Fr</text>
                  <title>Forest — dark green. Hunter green, pine, evergreen. Hue ~120° at low lightness.</title>
                </g>
                {/* Jade — dark spring green, hue ~150 */}
                <g className="cursor-default">
                  <ellipse cx="300" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="300" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Jd</text>
                  <title>Jade — dark spring green. Deep emerald, malachite. Hue ~150° at low lightness.</title>
                </g>
                {/* Teal — dark cyan, hue ~180 */}
                <g className="cursor-default">
                  <ellipse cx="360" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="360" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Tl</text>
                  <title>Teal — dark cyan. Petrol, deep teal. Hue ~180° at low lightness.</title>
                </g>
                {/* Petrol — dark azure, hue ~210 */}
                <g className="cursor-default">
                  <ellipse cx="420" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="420" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Pt</text>
                  <title>Petrol — dark azure. Steel blue, deep sky. Hue ~210° at low lightness.</title>
                </g>
                {/* Navy — dark blue, hue ~240 */}
                <g className="cursor-default">
                  <ellipse cx="480" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="480" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Nv</text>
                  <title>Navy — dark blue. Midnight, indigo. Hue ~240° at low lightness.</title>
                </g>
                {/* Indigo — dark violet, hue ~270 */}
                <g className="cursor-default">
                  <ellipse cx="540" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="540" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">In</text>
                  <title>Indigo — dark violet. Deep purple, royal purple. Hue ~270° at low lightness.</title>
                </g>
                {/* Plum — dark magenta, hue ~300 */}
                <g className="cursor-default">
                  <ellipse cx="600" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="600" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Pl</text>
                  <title>Plum — dark magenta. Eggplant, aubergine. Hue ~300° at low lightness.</title>
                </g>
                {/* Wine — dark rose, hue ~330 */}
                <g className="cursor-default">
                  <ellipse cx="655" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="655" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Wn</text>
                  <title>Wine — dark rose. Burgundy, berry. Hue ~330° at low lightness.</title>
                </g>
                {/* Burgundy — dark red (right wrap), hue ~350 */}
                <g className="cursor-default">
                  <ellipse cx="705" cy="150" rx="30" ry="22" fill="transparent" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <text x="705" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" opacity="0.8" fontFamily="ui-sans-serif, system-ui, sans-serif">Bg</text>
                  <title>Burgundy — dark red. Oxblood, maroon. Hue ~350° at low lightness.</title>
                </g>

                {/* === Light variants (upper) === */}
                {/* Salmon — light red, hue ~0 */}
                <g className="cursor-default">
                  <ellipse cx="15" cy="45" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="15" y="50" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Sm</text>
                  <title>Salmon — light red. Coral, rose. Hue ~0° at high lightness.</title>
                </g>
                {/* Peach — light orange, hue ~30 */}
                <g className="cursor-default">
                  <ellipse cx="60" cy="45" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="60" y="50" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Pc</text>
                  <title>Peach — light orange. Apricot, melon. Hue ~30° at high lightness.</title>
                </g>
                {/* Cream — light yellow, hue ~60 */}
                <g className="cursor-default">
                  <ellipse cx="120" cy="40" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="120" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Cr</text>
                  <title>Cream — light yellow. Butter, lemon chiffon. Hue ~60° at high lightness.</title>
                </g>
                {/* Lime — light chartreuse, hue ~90 */}
                <g className="cursor-default">
                  <ellipse cx="180" cy="40" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="180" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Lm</text>
                  <title>Lime — light chartreuse. Pale yellow-green. Hue ~90° at high lightness.</title>
                </g>
                {/* Pastel Green — light green, hue ~120 */}
                <g className="cursor-default">
                  <ellipse cx="240" cy="40" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="240" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Mn</text>
                  <title>Mint — light green. Pastel green, seafoam. Hue ~120° at high lightness.</title>
                </g>
                {/* Aquamarine — light spring green, hue ~150 */}
                <g className="cursor-default">
                  <ellipse cx="300" cy="40" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="300" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Aq</text>
                  <title>Aquamarine — light spring green. Seafoam, pale jade. Hue ~150° at high lightness.</title>
                </g>
                {/* Aqua — light cyan, hue ~180 */}
                <g className="cursor-default">
                  <ellipse cx="360" cy="40" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="360" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Ac</text>
                  <title>Aqua — light cyan. Pale turquoise. Hue ~180° at high lightness.</title>
                </g>
                {/* Sky — light azure, hue ~210 */}
                <g className="cursor-default">
                  <ellipse cx="420" cy="40" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="420" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Sk</text>
                  <title>Sky — light azure. Sky blue, powder blue. Hue ~210° at high lightness.</title>
                </g>
                {/* Periwinkle — light blue, hue ~240 */}
                <g className="cursor-default">
                  <ellipse cx="480" cy="40" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="480" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Pw</text>
                  <title>Periwinkle — light blue. Baby blue, cornflower. Hue ~240° at high lightness.</title>
                </g>
                {/* Lavender — light violet, hue ~270 */}
                <g className="cursor-default">
                  <ellipse cx="540" cy="40" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="540" y="45" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Lv</text>
                  <title>Lavender — light violet. Lilac, wisteria. Hue ~270° at high lightness.</title>
                </g>
                {/* Mauve — light magenta, hue ~300 */}
                <g className="cursor-default">
                  <ellipse cx="600" cy="45" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="600" y="50" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Mv</text>
                  <title>Mauve — light magenta. Orchid, pale plum. Hue ~300° at high lightness.</title>
                </g>
                {/* Pink — light rose, hue ~330 */}
                <g className="cursor-default">
                  <ellipse cx="655" cy="45" rx="30" ry="20" fill="transparent" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
                  <text x="655" y="50" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(0,0,0,0.5)" fontFamily="ui-sans-serif, system-ui, sans-serif">Pk</text>
                  <title>Pink — light red-magenta. Blush, rose. Hue ~330° at high lightness.</title>
                </g>
              </svg>
            </div>
            <div className="flex justify-between px-1 mt-1">
              <span className="text-[9px] text-stone-400 dark:text-stone-500">Red</span>
              <span className="text-[9px] text-stone-400 dark:text-stone-500">Yellow</span>
              <span className="text-[9px] text-stone-400 dark:text-stone-500">Green</span>
              <span className="text-[9px] text-stone-400 dark:text-stone-500">Cyan</span>
              <span className="text-[9px] text-stone-400 dark:text-stone-500">Blue</span>
              <span className="text-[9px] text-stone-400 dark:text-stone-500">Magenta</span>
              <span className="text-[9px] text-stone-400 dark:text-stone-500">Red</span>
            </div>
          </div>

          {/* Precise Color Positioning — magnetic snap */}
          {(() => {
            // Named colors for specific positions
            const SNAP_POINTS = [
              // Primary (1)
              { x: 0,   y: 100, hex: '#FF0000', name: 'Red (primary)', hue: 0 },
              { x: 720, y: 100, hex: '#FF0000', name: 'Red (primary)', hue: 360 },
              { x: 240, y: 100, hex: '#00FF00', name: 'Green (primary)', hue: 120 },
              { x: 480, y: 100, hex: '#0000FF', name: 'Blue (primary)', hue: 240 },
              // Secondary (2)
              { x: 120, y: 100, hex: '#FFFF00', name: 'Yellow (secondary)', hue: 60 },
              { x: 360, y: 100, hex: '#00FFFF', name: 'Cyan (secondary)', hue: 180 },
              { x: 600, y: 100, hex: '#FF00FF', name: 'Magenta (secondary)', hue: 300 },
              // Tertiary (3)
              { x: 60,  y: 100, hex: '#FF8000', name: 'Orange (tertiary)', hue: 30 },
              { x: 180, y: 100, hex: '#80FF00', name: 'Chartreuse (tertiary)', hue: 90 },
              { x: 300, y: 100, hex: '#00FF80', name: 'Spring Green (tertiary)', hue: 150 },
              { x: 420, y: 100, hex: '#0080FF', name: 'Azure (tertiary)', hue: 210 },
              { x: 540, y: 100, hex: '#8000FF', name: 'Violet (tertiary)', hue: 270 },
              { x: 660, y: 100, hex: '#FF0080', name: 'Rose (tertiary)', hue: 330 },
              // Quaternary (4)
              { x: 30,  y: 100, hex: '#FF4000', name: 'Vermilion (quaternary)', hue: 15 },
              { x: 90,  y: 100, hex: '#FFC000', name: 'Amber (quaternary)', hue: 45 },
              { x: 150, y: 100, hex: '#C0FF00', name: 'Lime (quaternary)', hue: 75 },
              { x: 210, y: 100, hex: '#40FF00', name: 'Harlequin (quaternary)', hue: 105 },
              { x: 270, y: 100, hex: '#00FF40', name: 'Erin (quaternary)', hue: 135 },
              { x: 330, y: 100, hex: '#00FFC0', name: 'Aquamarine (quaternary)', hue: 165 },
              { x: 390, y: 100, hex: '#00C0FF', name: 'Sky Blue (quaternary)', hue: 195 },
              { x: 450, y: 100, hex: '#0040FF', name: 'Cerulean (quaternary)', hue: 225 },
              { x: 510, y: 100, hex: '#4000FF', name: 'Indigo (quaternary)', hue: 255 },
              { x: 570, y: 100, hex: '#C000FF', name: 'Purple (quaternary)', hue: 285 },
              { x: 630, y: 100, hex: '#FF00C0', name: 'Cerise (quaternary)', hue: 315 },
              { x: 690, y: 100, hex: '#FF0040', name: 'Crimson (quaternary)', hue: 345 },
            ]
            const SNAP_RADIUS = 5 // must match circle r

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [hoveredSnap, setHoveredSnap] = useState<{ x: number; y: number } | null>(null)

            function findSnap(canvasX: number, canvasY: number) {
              let closest: typeof SNAP_POINTS[0] | null = null
              let minDist = Infinity
              for (const pt of SNAP_POINTS) {
                const dx = canvasX - pt.x
                const dy = canvasY - pt.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < SNAP_RADIUS && dist < minDist) {
                  minDist = dist
                  closest = pt
                }
              }
              return closest
            }

            function canvasCoords(e: React.MouseEvent<HTMLCanvasElement>) {
              const canvas = e.currentTarget
              const rect = canvas.getBoundingClientRect()
              const x = (e.clientX - rect.left) * (canvas.width / rect.width)
              const y = (e.clientY - rect.top) * (canvas.height / rect.height)
              return { x, y }
            }

            return (
              <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
                <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Precise Color Positions</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">Hover near a marker to snap to it. Click to inspect the color.</p>
                <div className="relative">
                  <canvas
                    ref={(canvas) => {
                      if (!canvas || canvas.dataset.drawn) return
                      canvas.dataset.drawn = '1'
                      const ctx = canvas.getContext('2d')
                      if (!ctx) return
                      const w = canvas.width, h = canvas.height
                      for (let x = 0; x < w; x++) {
                        const hue = (x / w) * 360
                        for (let y = 0; y < h; y++) {
                          const lightness = 100 - (y / h) * 100
                          ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`
                          ctx.fillRect(x, y, 1, 1)
                        }
                      }
                    }}
                    width={720}
                    height={200}
                    className="w-full rounded-lg cursor-default border border-stone-200 dark:border-stone-700"
                    style={{ imageRendering: 'pixelated' }}
                    onMouseMove={(e) => {
                      const { x, y } = canvasCoords(e)
                      const snap = findSnap(x, y)
                      setHoveredSnap(snap ? { x: snap.x, y: snap.y } : null)
                    }}
                    onMouseLeave={() => setHoveredSnap(null)}
                    onClick={(e) => {
                      const { x, y } = canvasCoords(e)
                      const snap = findSnap(x, y)
                      if (snap) {
                        setSelectedColor({ hex: snap.hex, name: `${snap.name} — HSL(${snap.hue}°, 100%, 50%)` })
                        return
                      }
                      const canvas = e.currentTarget
                      const ctx = canvas.getContext('2d')
                      if (!ctx) return
                      const px = Math.round(x), py = Math.round(y)
                      const pixel = ctx.getImageData(px, py, 1, 1).data
                      const hex = `#${pixel[0].toString(16).padStart(2,'0')}${pixel[1].toString(16).padStart(2,'0')}${pixel[2].toString(16).padStart(2,'0')}`
                      const hue = Math.round((px / canvas.width) * 360)
                      const lightness = Math.round(100 - (py / canvas.height) * 100)
                      setSelectedColor({ hex, name: `HSL(${hue}°, 100%, ${lightness}%)` })
                    }}
                  />
                  {/* SVG overlay — markers only, no text */}
                  <svg viewBox="0 0 720 200" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    {SNAP_POINTS.map((pt, i) => {
                      const isLight = ['Yellow', 'Chartreuse', 'Cyan', 'Spring Green'].includes(pt.name)
                      const stroke = isLight ? 'rgba(0,0,0,0.5)' : 'white'
                      const isHovered = hoveredSnap && hoveredSnap.x === pt.x && hoveredSnap.y === pt.y
                      return (
                        <g key={i} opacity={isHovered ? 1 : 0.6}>
                          <circle cx={pt.x} cy={pt.y} r={isHovered ? 10 : 5} fill={isHovered ? pt.hex : 'none'} stroke={stroke} strokeWidth={1.5} />
                        </g>
                      )
                    })}
                    {/* 50% lightness guide */}
                    <line x1="0" y1="100" x2="720" y2="100" stroke="white" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
                  </svg>
                </div>
                <div className="flex justify-between px-1 mt-1">
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">0°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">60°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">120°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">180°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">240°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">300°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">360°</span>
                </div>
                {/* 24 hue segments */}
                <div className="flex mt-3 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700">
                  {Array.from({ length: 24 }, (_, i) => {
                    const hue = i * 15
                    const pt = SNAP_POINTS.find(p => p.hue === hue)
                    return (
                      <div
                        key={i}
                        className="flex-1 h-10 cursor-pointer relative group"
                        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
                        onClick={() => {
                          if (pt) {
                            setSelectedColor({ hex: pt.hex, name: `${pt.name} — HSL(${hue}°, 100%, 50%)` })
                          } else {
                            setSelectedColor({ hex: `hsl(${hue}, 100%, 50%)`, name: `HSL(${hue}°, 100%, 50%)` })
                          }
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className={`text-[8px] font-medium ${hue >= 45 && hue <= 165 ? 'text-black/70' : 'text-white/90'}`}>
                            {hue}°
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[9px] text-stone-400 dark:text-stone-500 mt-1 text-center">24 hue segments at 15° intervals — click to inspect</p>

                {/* Second gradient */}
                <div className="relative mt-6">
                  <canvas
                    ref={(canvas) => {
                      if (!canvas || canvas.dataset.drawn2) return
                      canvas.dataset.drawn2 = '1'
                      const ctx = canvas.getContext('2d')
                      if (!ctx) return
                      const w = canvas.width, h = canvas.height
                      for (let x = 0; x < w; x++) {
                        const hue = (x / w) * 360
                        for (let y = 0; y < h; y++) {
                          const lightness = 100 - (y / h) * 100
                          ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`
                          ctx.fillRect(x, y, 1, 1)
                        }
                      }
                    }}
                    width={720}
                    height={200}
                    className="w-full rounded-lg cursor-default border border-stone-200 dark:border-stone-700"
                    style={{ imageRendering: 'pixelated' }}
                    onMouseMove={(e) => {
                      const { x, y } = canvasCoords(e)
                      const snap = findSnap(x, y)
                      setHoveredSnap(snap ? { x: snap.x, y: snap.y } : null)
                    }}
                    onMouseLeave={() => setHoveredSnap(null)}
                    onClick={(e) => {
                      const { x, y } = canvasCoords(e)
                      const snap = findSnap(x, y)
                      if (snap) {
                        setSelectedColor({ hex: snap.hex, name: `${snap.name} — HSL(${snap.hue}°, 100%, 50%)` })
                        return
                      }
                      const canvas = e.currentTarget
                      const ctx = canvas.getContext('2d')
                      if (!ctx) return
                      const px = Math.round(x), py = Math.round(y)
                      const pixel = ctx.getImageData(px, py, 1, 1).data
                      const hex = `#${pixel[0].toString(16).padStart(2,'0')}${pixel[1].toString(16).padStart(2,'0')}${pixel[2].toString(16).padStart(2,'0')}`
                      const hue = Math.round((px / canvas.width) * 360)
                      const lightness = Math.round(100 - (py / canvas.height) * 100)
                      setSelectedColor({ hex, name: `HSL(${hue}°, 100%, ${lightness}%)` })
                    }}
                  />
                  <svg viewBox="0 0 720 200" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    {/* Green perception region */}
                    <polygon
                      points="200,70 248,50 266,59 278,79 300,100 286,146 278,155 238,167 214,148 188,119 180,100"
                      fill="none"
                      stroke="white"
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                      opacity={0.7}
                    />
                    {/* Boundary circles */}
                    <circle cx={240} cy={100} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={300} cy={100} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={286} cy={146} r={4} fill="none" stroke="white" strokeWidth={1} />
                    <circle cx={278} cy={155} r={4} fill="none" stroke="white" strokeWidth={1} />
                    <circle cx={238} cy={167} r={4} fill="none" stroke="white" strokeWidth={1} />
                    <circle cx={214} cy={148} r={4} fill="none" stroke="white" strokeWidth={1} />
                    <circle cx={180} cy={100} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={188} cy={119} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={200} cy={70} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={248} cy={50} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={278} cy={79} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={266} cy={59} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    {/* Yellow perception region */}
                    <polygon
                      points="118,36 124,65 126,81 122,106 116,112 112,100 112,78 108,57"
                      fill="none"
                      stroke="white"
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                      opacity={0.7}
                    />
                    <circle cx={120} cy={100} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={112} cy={100} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={118} cy={36} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={108} cy={57} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={124} cy={65} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={116} cy={112} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={122} cy={106} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={126} cy={81} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={112} cy={78} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    {/* Red */}
                    <circle cx={0} cy={100} r={4} fill="none" stroke="white" strokeWidth={1} />
                    <circle cx={720} cy={100} r={4} fill="none" stroke="white" strokeWidth={1} />
                    <circle cx={30} cy={100} r={4} fill="none" stroke="white" strokeWidth={1} />
                    <circle cx={16} cy={79} r={4} fill="none" stroke="white" strokeWidth={1} />
                    <circle cx={6} cy={65} r={4} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    <circle cx={12} cy={116} r={4} fill="none" stroke="white" strokeWidth={1} />
                  </svg>
                </div>
                <div className="flex justify-between px-1 mt-1">
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">0°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">60°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">120°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">180°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">240°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">300°</span>
                  <span className="text-[9px] text-stone-400 dark:text-stone-500">360°</span>
                </div>
              </div>
            )
          })()}
        </div>

        {/* Color Triangles */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 px-6 py-5 mt-10">
          <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Hue Circle</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">24 segments at 15° intervals showing primary, secondary, tertiary, and quaternary hues.</p>
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg viewBox="0 0 400 400" className="w-72 h-72">
                  {Array.from({ length: 24 }, (_, i) => {
                    const hue = i * 15
                    const cx = 200, cy = 200, outerR = 190, innerR = 80
                    const a1 = (hue - 90 - 7.5) * Math.PI / 180
                    const a2 = (hue - 90 + 7.5) * Math.PI / 180
                    const x1o = cx + outerR * Math.cos(a1), y1o = cy + outerR * Math.sin(a1)
                    const x2o = cx + outerR * Math.cos(a2), y2o = cy + outerR * Math.sin(a2)
                    const x1i = cx + innerR * Math.cos(a2), y1i = cy + innerR * Math.sin(a2)
                    const x2i = cx + innerR * Math.cos(a1), y2i = cy + innerR * Math.sin(a1)
                    return (
                      <path
                        key={i}
                        d={`M ${x1o} ${y1o} A ${outerR} ${outerR} 0 0 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${innerR} ${innerR} 0 0 0 ${x2i} ${y2i} Z`}
                        fill={`hsl(${hue}, 100%, 50%)`}
                        stroke="white"
                        strokeWidth="1"
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => {
                          const names: Record<number, string> = {
                            0: 'Red', 15: 'Vermilion', 30: 'Orange', 45: 'Amber',
                            60: 'Yellow', 75: 'Lime', 90: 'Chartreuse', 105: 'Harlequin',
                            120: 'Green', 135: 'Erin', 150: 'Spring Green', 165: 'Aquamarine',
                            180: 'Cyan', 195: 'Sky Blue', 210: 'Azure', 225: 'Cerulean',
                            240: 'Blue', 255: 'Indigo', 270: 'Violet', 285: 'Purple',
                            300: 'Magenta', 315: 'Cerise', 330: 'Rose', 345: 'Crimson',
                          }
                          const el = document.createElement('canvas')
                          el.width = 1; el.height = 1
                          const ctx = el.getContext('2d')!
                          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
                          ctx.fillRect(0, 0, 1, 1)
                          const p = ctx.getImageData(0, 0, 1, 1).data
                          const hex = `#${p[0].toString(16).padStart(2,'0')}${p[1].toString(16).padStart(2,'0')}${p[2].toString(16).padStart(2,'0')}`
                          setSelectedColor({ hex, name: `${names[hue]} (${hue}°)` })
                        }}
                      />
                    )
                  })}
                </svg>
              </div>
            </div>

            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">Color Mixing Rectangles</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: '', desc: '', colors: { top: [0,0,0], bl: [0,0,0], br: [0,0,0] }, isRect: true, rectLeft: [255,0,0], rectRight: [255,255,0], topCaption: 'Red · Yellow · White', topDesc: 'Warm tints — pastels and light tones', bottomCaption: 'Red · Yellow · Black', bottomDesc: 'Earth tones and browns emerge' },
                { title: '', desc: '', colors: { top: [0,0,0], bl: [0,0,0], br: [0,0,0] }, isRect: true, rectLeft: [255,255,0], rectRight: [0,0,255], topCaption: 'Yellow · Blue · White', topDesc: 'Fresh tints — greens, teals, pastels', bottomCaption: 'Yellow · Blue · Black', bottomDesc: 'Deep natural tones — olive, forest, navy' },
                { title: '', desc: '', colors: { top: [0,0,0], bl: [0,0,0], br: [0,0,0] }, isRect: true, rectLeft: [0,0,255], rectRight: [255,0,0], topCaption: 'Blue · Red · White', topDesc: 'Cool tints — pinks, lavenders, pastels', bottomCaption: 'Blue · Red · Black', bottomDesc: 'Deep cool tones — burgundy, plum, navy' },
              ].map((entry, ti) => {
                const { title, desc, colors } = entry
                const rectLeft = (entry as any).rectLeft as number[] | undefined
                const rectRight = (entry as any).rectRight as number[] | undefined
                const topCaption = (entry as any).topCaption as string | undefined
                const topDesc = (entry as any).topDesc as string | undefined
                const bottomCaption = (entry as any).bottomCaption as string | undefined
                const bottomDesc = (entry as any).bottomDesc as string | undefined
                // RYB to RGB conversion for subtractive mixing
                function rybToRgb(r: number, y: number, b: number): [number, number, number] {
                  // Trilinear interpolation through RYB cube corners
                  const cubicInt = (t: number, a: number, b: number) => a + t * (b - a)
                  const rn = r / 255, yn = y / 255, bn = b / 255
                  // RYB corner -> RGB mappings
                  const r0 = cubicInt(bn, cubicInt(yn, cubicInt(rn, 255, 255), cubicInt(rn, 255, 255)), cubicInt(yn, cubicInt(rn, 255, 128), cubicInt(rn, 0, 0)))
                  const g0 = cubicInt(bn, cubicInt(yn, cubicInt(rn, 255, 0),   cubicInt(rn, 255, 255)), cubicInt(yn, cubicInt(rn, 255, 0),   cubicInt(rn, 0, 130)))
                  const b0 = cubicInt(bn, cubicInt(yn, cubicInt(rn, 255, 0),   cubicInt(rn, 0, 0)),     cubicInt(yn, cubicInt(rn, 255, 0),   cubicInt(rn, 255, 255)))
                  return [Math.round(r0), Math.round(g0), Math.round(b0)]
                }
                const isRYB = title.includes('Yellow') && title.includes('Blue') && title.includes('Red') && !title.includes('White') && !title.includes('Black')
                const isRectMode = !!(entry as any).isRect
                return (
                <div key={ti} className="flex flex-col items-center gap-1">
                  {isRectMode ? (
                    <>
                      <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400">{topCaption}</p>
                      <p className="text-[9px] text-stone-400 dark:text-stone-500 mb-1">{topDesc}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400">{title}</p>
                      <p className="text-[9px] text-stone-400 dark:text-stone-500 mb-1">{desc}</p>
                    </>
                  )}
                  <canvas
                    ref={(canvas) => {
                      if (!canvas || canvas.dataset.drawn) return
                      canvas.dataset.drawn = '1'
                      const ctx = canvas.getContext('2d')
                      if (!ctx) return
                      const w = canvas.width, h = canvas.height
                      const imgData = ctx.createImageData(w, h)

                      if (isRectMode) {
                        // Rectangle: bilinear interpolation between 4 corners
                        const tl = rectLeft ?? [255,0,0], tr = rectRight ?? [255,255,0]
                        for (let py = 0; py < h; py++) {
                          const ty = py / (h - 1) // 0=top, 1=bottom
                          for (let px = 0; px < w; px++) {
                            const tx = px / (w - 1) // 0=left(red), 1=right(yellow)
                            const baseR = tl[0] * (1 - tx) + tr[0] * tx
                            const baseG = tl[1] * (1 - tx) + tr[1] * tx
                            const baseB = tl[2] * (1 - tx) + tr[2] * tx
                            // Lerp base color between white (top) and black (bottom)
                            const lightness = 1 - ty // 1 at top, 0 at bottom
                            const idx = (py * w + px) * 4
                            // At top (lightness=1): blend toward white
                            // At middle (lightness=0.5): pure color
                            // At bottom (lightness=0): blend toward black
                            if (lightness > 0.5) {
                              const t = (lightness - 0.5) * 2 // 0 to 1
                              imgData.data[idx] = Math.round(baseR + (255 - baseR) * t)
                              imgData.data[idx + 1] = Math.round(baseG + (255 - baseG) * t)
                              imgData.data[idx + 2] = Math.round(baseB + (255 - baseB) * t)
                            } else {
                              const t = lightness * 2 // 0 to 1
                              imgData.data[idx] = Math.round(baseR * t)
                              imgData.data[idx + 1] = Math.round(baseG * t)
                              imgData.data[idx + 2] = Math.round(baseB * t)
                            }
                            imgData.data[idx + 3] = 255
                          }
                        }
                      } else {
                        // Triangle: barycentric interpolation
                        const v0 = { x: w / 2, y: 10 }
                        const v1 = { x: 10, y: h - 10 }
                        const v2 = { x: w - 10, y: h - 10 }
                        const d = (v1.y - v2.y) * (v0.x - v2.x) + (v2.x - v1.x) * (v0.y - v2.y)
                        for (let py = 0; py < h; py++) {
                          for (let px = 0; px < w; px++) {
                            const w0 = ((v1.y - v2.y) * (px - v2.x) + (v2.x - v1.x) * (py - v2.y)) / d
                            const w1 = ((v2.y - v0.y) * (px - v2.x) + (v0.x - v2.x) * (py - v2.y)) / d
                            const w2 = 1 - w0 - w1
                            if (w0 >= -0.01 && w1 >= -0.01 && w2 >= -0.01) {
                              const idx = (py * w + px) * 4
                              if (isRYB) {
                                const rAmt = Math.max(0, Math.min(1, w0)) * 255
                                const yAmt = Math.max(0, Math.min(1, w1)) * 255
                                const bAmt = Math.max(0, Math.min(1, w2)) * 255
                                const [rr, gg, bb] = rybToRgb(rAmt, yAmt, bAmt)
                                imgData.data[idx] = rr
                                imgData.data[idx + 1] = gg
                                imgData.data[idx + 2] = bb
                              } else {
                                imgData.data[idx] = Math.round(Math.min(255, Math.max(0, w0 * colors.top[0] + w1 * colors.bl[0] + w2 * colors.br[0])))
                                imgData.data[idx + 1] = Math.round(Math.min(255, Math.max(0, w0 * colors.top[1] + w1 * colors.bl[1] + w2 * colors.br[1])))
                                imgData.data[idx + 2] = Math.round(Math.min(255, Math.max(0, w0 * colors.top[2] + w1 * colors.bl[2] + w2 * colors.br[2])))
                              }
                              imgData.data[idx + 3] = 255
                            }
                          }
                        }
                      }
                      ctx.putImageData(imgData, 0, 0)
                    }}
                    width={300}
                    height={280}
                    className="w-full max-w-[240px] cursor-default"
                    onClick={(e) => {
                      const canvas = e.currentTarget
                      const rect = canvas.getBoundingClientRect()
                      const px = Math.round((e.clientX - rect.left) * (canvas.width / rect.width))
                      const py = Math.round((e.clientY - rect.top) * (canvas.height / rect.height))
                      const ctx = canvas.getContext('2d')
                      if (!ctx) return
                      const pixel = ctx.getImageData(px, py, 1, 1).data
                      if (pixel[3] === 0) return
                      const hex = `#${pixel[0].toString(16).padStart(2,'0')}${pixel[1].toString(16).padStart(2,'0')}${pixel[2].toString(16).padStart(2,'0')}`
                      setSelectedColor({ hex, name: hex.toUpperCase() })
                    }}
                  />
                  {isRectMode && (
                    <>
                      <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 mt-1">{bottomCaption}</p>
                      <p className="text-[9px] text-stone-400 dark:text-stone-500">{bottomDesc}</p>
                    </>
                  )}
                </div>
              )})}
            </div>
          </div>
        </div>

        {/* Shade sections continued */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 px-6 py-5 mt-10">
          {[
            { title: 'Taupe Shades', description: 'Named after the French word for "mole" (the animal), taupe is the bridge between brown and grey — neither fully warm nor cool. Sometimes called "greige" (grey + beige), it\'s the ultimate "goes with everything" neutral.', shades: TAUPE_GRADIENT },
            { title: 'Achromatic Colors', description: 'No hue, only lightness — from white to black. Truly colorless, varying only in brightness.', shades: GREY_GRADIENT },
          ].map(({ title, description, shades }) => (
            <div key={title} className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
              <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">{title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{description}</p>
              <div className="flex gap-3 flex-wrap">
                {shades.map(shade => (
                  <div
                    key={shade.name}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => setSelectedColor({ hex: shade.hex, name: shade.name, related: shade.related, pantone: shade.pantone })}
                  >
                    <span
                      className="w-14 h-14 rounded-full group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: shade.hex, boxShadow: isLightColor(shade.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined }}
                    />
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 text-center leading-tight max-w-[60px]">{shade.name}</span>
                    <span className="text-[8px] text-stone-400 dark:text-stone-500 text-center leading-tight max-w-[70px]">{shade.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Earth Tones */}
          <div className="border-t border-stone-100 dark:border-stone-800 mt-4 pt-4">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">Earth Tones</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">Colors found in nature — soil, rock, sand, clay, wood, dried leaves. They're warm, muted, and low-saturation. Earth tones never appear bright or vivid, always carry warm undertones, and pair effortlessly with each other and with neutrals. A staple of smart casual style.</p>
            <div className="space-y-4">
              {EARTH_TONE_GROUPS.map(({ label, description, shades }) => (
                <div key={label}>
                  <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 mb-0.5">{label}</p>
                  <p className="text-[9px] text-stone-400 dark:text-stone-500 mb-2">{description}</p>
                  <div className="flex gap-3 flex-wrap">
                    {shades.map(shade => (
                      <div
                        key={shade.name}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        onClick={() => setSelectedColor({ hex: shade.hex, name: shade.name, related: shade.related, pantone: shade.pantone })}
                      >
                        <span
                          className="w-14 h-14 rounded-full group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: shade.hex }}
                        />
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 text-center leading-tight max-w-[60px]">{shade.name}</span>
                        <span className="text-[8px] text-stone-400 dark:text-stone-500 text-center leading-tight max-w-[70px]">{shade.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Floating color detail panel */}
      {selectedColor && (
        <div className="fixed top-20 right-6 w-64 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl p-4 z-50">
          <button
            onClick={() => setSelectedColor(null)}
            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 flex items-center justify-center text-xs"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-14 h-14 rounded-full shrink-0"
              style={{
                backgroundColor: selectedColor.hex,
                boxShadow: isLightColor(selectedColor.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined,
              }}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-stone-800 dark:text-stone-100 leading-tight">{selectedColor.name}</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-mono">{selectedColor.hex.toUpperCase()}</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-mono">{hexToHsl(selectedColor.hex)}</p>
            </div>
          </div>
          {selectedColor.related && selectedColor.related.length > 0 && (
            <div className="mb-3">
              <p className="text-[9px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wide mb-1.5">Related shades</p>
              <div className="space-y-1">
                {selectedColor.related.map(s => (
                  <div key={s.name} className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: s.hex, boxShadow: isLightColor(s.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined }}
                    />
                    <span className="text-xs text-stone-600 dark:text-stone-300">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedColor.pantone && selectedColor.pantone.length > 0 && (
            <div>
              <p className="text-[9px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wide mb-1.5">Pantone</p>
              <div className="space-y-1">
                {selectedColor.pantone.map(s => {
                  const code = s.name.match(/\((\d+-\d+)\)/)?.[1]
                  const url = code
                    ? `https://www.pantone.com/color-finder/${code}-TCX`
                    : `https://www.pantone.com/color-finder?q=${encodeURIComponent(s.name)}`
                  return (
                    <div key={s.name} className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded shrink-0"
                        style={{ backgroundColor: s.hex, boxShadow: isLightColor(s.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined }}
                      />
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-stone-600 dark:text-stone-300 hover:underline">{s.name}</a>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  )
}
