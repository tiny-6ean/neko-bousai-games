const itemsData = [
  { id: "food", label: "フード", img: "img/food.png" },
  { id: "water", label: "水", img: "img/water.png" },
  { id: "blanket", label: "ブランケット", img: "img/blanket.png" },
  { id: "towel", label: "タオル（匂い付き）", img: "img/towel.png" },
  { id: "carrier", label: "キャリー", img: "img/carrier.png" },
  { id: "harness", label: "ハーネス", img: "img/harness.png" },
  { id: "snack", label: "おやつ", img: "img/snack.png" },
  { id: "sand", label: "トイレ砂（少量）", img: "img/sand.png" },
  { id: "wet", label: "ウェットティッシュ", img: "img/wet.png" },
  { id: "firstaid", label: "救急セット", img: "img/firstaid.png" },
  { id: "photo", label: "写真", img: "img/photo.png" },
  { id: "tag", label: "迷子札", img: "img/tag.png" },
  { id: "bowl", label: "食器", img: "img/bowl.png" }
];

const advice = {
  food: "普段食べているものを入れておくと、避難時のストレスが減ります。",
  water: "最低でも3日分あると安心です。小分けのボトルが便利。",
  blanket: "寒さや不安を和らげるために役立ちます。",
  towel: "匂い付きのタオルは安心材料になります。保温にも使えます。",
  carrier: "避難時の安全確保に必須。普段から慣らしておくと良いです。",
  harness: "移動時の安全確保に役立ちます。",
  snack: "誘導や安心材料として使えます。",
  sand: "少量のトイレ砂があると避難先での排泄管理に役立ちます。",
  wet: "汚れや排泄物の処理に便利です。",
  firstaid: "ケガや応急処置に必須。小さなセットでOK。",
  photo: "迷子時の照合に役立ちます。猫と飼い主の写真があると安心。",
  tag: "迷子時の生存率が上がります。普段から付けておくと良いです。",
  bowl: "普段使っている形に近いものだと安心します。"
};

const priorityMap = {
  timid: {
    kitten: {
      healthy: { high:["food","water","carrier"], medium:["blanket","towel"], low:["harness","snack","sand","wet","firstaid","photo","tag","bowl"] },
      ill:     { high:["food","water","carrier"], medium:["blanket","towel"], low:["harness","snack","sand","wet","firstaid","photo","tag","bowl"] }
    },
    adult: {
      healthy: { high:["food","water","carrier"], medium:["blanket","towel"], low:["harness","snack","sand","wet","firstaid","photo","tag","bowl"] },
      ill:     { high:["food","water","carrier"], medium:["blanklet","towel"], low:["harness","snack","sand","wet","firstaid","photo","tag","bowl"] }
    },
    senior: {
      healthy: { high:["food","water"], medium:["blanket","towel"], low:["carrier","harness","snack","sand","wet","firstaid","photo","tag","bowl"] },
      ill:     { high:["food","water"], medium:["blanket","towel"], low:["carrier","harness","snack","sand","wet","firstaid","photo","tag","bowl"] }
    }
  },

  careful: {
    kitten: {
      healthy:{ high:["food","water","carrier","harness"], medium:["towel"], low:["blanket","snack","sand","wet","firstaid","photo","tag","bowl"] },
      ill:    { high:["food","water","carrier","harness"], medium:["towel"], low:["blanket","snack","sand","wet","firstaid","photo","tag","bowl"] }
    },
    adult: {
      healthy:{ high:["food","water","carrier","harness"], medium:[], low:["blanket","towel","snack","sand","wet","firstaid","photo","tag","bowl"] },
      ill:    { high:["food","water","carrier","harness"], medium:[], low:["blanket","towel","snack","sand","wet","firstaid","photo","tag","bowl"] }
    },
    senior: {
      healthy:{ high:["food","water","harness"], medium:["blanket"], low:["carrier","towel","snack","sand","wet","firstaid","photo","tag","bowl"] },
      ill:    { high:["food","water","harness"], medium:["blanket"], low:["carrier","towel","snack","sand","wet","firstaid","photo","tag","bowl"] }
    }
  },

  curious: {
    kitten: {
      healthy:{ high:["food","water","carrier","harness","snack"], medium:[], low:["blanket","towel","sand","wet","firstaid","photo","tag","bowl"] },
      ill:    { high:["food","water","carrier","harness","snack"], medium:[], low:["blanket","towel","sand","wet","firstaid","photo","tag","bowl"] }
    },
    adult: {
      healthy:{ high:["food","water","carrier","harness","snack"], medium:[], low:["blanket","towel","sand","wet","firstaid","photo","tag","bowl"] },
      ill:    { high:["food","water","carrier","harness","snack"], medium:[], low:["blanket","towel","sand","wet","firstaid","photo","tag","bowl"] }
    },
    senior: {
      healthy:{ high:["food","water","harness","snack"], medium:["blanket"], low:["carrier","towel","sand","wet","firstaid","photo","tag","bowl"] },
      ill:    { high:["food","water","harness","snack"], medium:["blanket"], low:["carrier","towel","sand","wet","firstaid","photo","tag","bowl"] }
    }
  }
};

const extraPriority = {
  high: ["firstaid","tag","photo"],
  medium: ["bowl"],
  low: []
};
