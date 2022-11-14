export const rarityOptions = [
  { value: "Common", default: true },
  { value: "Uncommon", default: true },
  { value: "Rare", default: true },
  { value: "Very Rare", default: true },
  { value: "Legendary", default: false },
  { value: "Artifact", default: false },
];

export const itemKinds = [
  { label: "Armor", value: ["Armor", "Shield", "Helm"], default: true },
  { label: "Potion", value: ["Potion"], default: true },
  { label: "Ring", value: ["Ring"], default: true },
  { label: "Rod", value: ["Rod"], default: true },
  { label: "Scroll", value: ["Scroll"], default: true },
  { label: "Staff", value: ["Staff"], default: true },
  { label: "Wand", value: ["Wand"], default: true },
  { label: "Weapon", value: ["Weapons"], default: true },
  { label: "Wonderous Item", value: ["Miscellaneous"], default: true },
];

export const miscSettings = [
  { value: "Requires Attunemnt", default: true },
  { value: "Class Restricted", default: true },
  { value: "Sentient", default: true },
];
