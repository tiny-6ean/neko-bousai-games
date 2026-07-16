const itemsData = [
  { id: "food", label: "フード", img: "img/food.png" },
  { id: "water", label: "水", img: "img/water.png" },
  { id: "blanket", label: "ブランケット", img: "img/blanket.png" },
  { id: "medicine", label: "薬", img: "img/medicine.png" },
  { id: "towel", label: "タオル（匂い付き）", img: "img/towel.png" },
  { id: "carrier", label: "キャリー", img: "img/carrier.png" },
  { id: "harness", label: "ハーネス", img: "img/harness.png" },
  { id: "snack", label: "おやつ", img: "img/snack.png" },
  { id: "sand", label: "トイレ砂（少量）", img: "img/sand.png" },
  { id: "wet", label: "ウェットティッシュ", img: "img/wet.png" },
  { id: "firstaid", label: "救急セット", img: "img/firstaid.png" },
  { id: "photo", label: "写真", img: "img/photo.png" },
  { id: "tag", label: "迷子札", img: "img/tag.png" },
  { id: "contact", label: "緊急連絡先", img: "img/contact.png" },
  { id: "hospital", label: "病院情報", img: "img/hospital.png" },
  { id: "trash", label: "ゴミ袋", img: "img/trash.png" },
  { id: "gloves", label: "ビニール手袋", img: "img/gloves.png" },
  { id: "bowl", label: "食器", img: "img/bowl.png" },
  { id: "net", label: "洗濯ネット", img: "img/net.png" },
  { id: "healthcard", label: "健康情報カード", img: "img/healthcard.png" },
  { id: "spoit", label: "給餌スポイト", img: "img/spoit.png" }
];

const advice = {
  food: "普段食べているものを入れておくと、避難時のストレスが減ります。",
  water: "最低でも3日分あると安心です。小分けのボトルが便利。",
  blanket: "寒さや不安を和らげるために役立ちます。",
  medicine: "持病がある場合は必ず。予備も入れておくと安心です。",
  towel: "匂い付きのタオルは安心材料になります。保温にも使えます。",
  carrier: "避難時の安全確保に必須。普段から慣らしておくと良いです。",
  harness: "移動時の安全確保に役立ちます。",
  snack: "誘導や安心材料として使えます。",
  sand: "少量のトイレ砂があると避難先での排泄管理に役立ちます。",
  wet: "汚れや排泄物の処理に便利です。",
  firstaid: "ケガや応急処置に必須。小さなセットでOK。",
  photo: "迷子時の照合に役立ちます。猫と飼い主の写真があると安心。",
  tag: "迷子時の生存率が上がります。普段から付けておくと良いです。",
  contact: "避難先で連絡が取れなくなった時に役立ちます。",
  hospital: "避難先での医療確保に必須。診察券の写真でもOK。",
  trash: "排泄物や汚れ物の管理に便利です。",
  gloves: "衛生管理に役立ちます。薄手のものが扱いやすいです。",
  bowl: "普段使っている形に近いものだと安心します。",
  net: "保定・搬送時の安全確保。怖がりの猫の落ち着きにも有効。",
  healthcard: "持病・薬・病院情報を紙で保持。停電・通信障害時に必須。",
  spoit: "ストレス・病気で食べられない時の緊急給餌に使える。"
};

const priorityMap = {
  timid: {
    kitten: {
      healthy: { high: ["food","water","carrier","healthcard"], medium:["blanket","towel","net"], low:["harness","snack","sand","wet","spoit"] },
      ill:     { high: ["food","water","carrier","medicine","healthcard"], medium:["blanket","towel","net"], low:["harness","snack","sand","wet","spoit"] }
    },
    adult: {
      healthy: { high:["food","water","carrier","healthcard"], medium:["blanket","towel","net"], low:["harness","snack","sand","wet","spoit"] },
      ill:     { high:["food","water","carrier","medicine","healthcard"], medium:["blanket","towel","net"], low:["harness","snack","sand","wet","spoit"] }
    },
    senior: {
      healthy: { high:["food","water","medicine","healthcard"], medium:["blanket","towel","net"], low:["harness","snack","sand","wet","spoit"] },
      ill:     { high:["food","water","medicine","healthcard"], medium:["blanket","towel","net"], low:["harness","snack","sand","wet","spoit"] }
    }
  },

  careful: {
    kitten: {
      healthy:{ high:["food","water","carrier","harness","healthcard"], medium:["towel","net"], low:["blanket","snack","sand","wet","spoit"] },
      ill:    { high:["food","water","carrier","harness","medicine","healthcard"], medium:["towel","net"], low:["blanket","snack","sand","wet","spoit"] }
    },
    adult: {
      healthy:{ high:["food","water","carrier","harness","healthcard"], medium:["net"], low:["blanket","towel","snack","sand","wet","spoit"] },
      ill:    { high:["food","water","carrier","harness","medicine","healthcard"], medium:["net"], low:["blanket","towel","snack","sand","wet","spoit"] }
    },
    senior: {
      healthy:{ high:["food","water","harness","healthcard"], medium:["blanket","net"], low:["towel","snack","sand","wet","spoit"] },
      ill:    { high:["food","water","harness","medicine","healthcard"], medium:["blanket","net"], low:["towel","snack","sand","wet","spoit"] }
    }
  },

  curious: {
    kitten: {
      healthy:{ high:["food","water","carrier","harness","snack","healthcard"], medium:["net"], low:["blanket","towel","sand","wet","spoit"] },
      ill:    { high:["food","water","carrier","harness","snack","medicine","healthcard"], medium:["net"], low:["blanket","towel","sand","wet","spoit"] }
    },
    adult: {
      healthy:{ high:["food","water","carrier","harness","snack","healthcard"], medium:["net"], low:["blanket","towel","sand","wet","spoit"] },
      ill:    { high:["food","water","carrier","harness","snack","medicine","healthcard"], medium:["net"], low:["blanket","towel","sand","wet","spoit"] }
    },
    senior: {
      healthy:{ high:["food","water","harness","snack","healthcard"], medium:["blanket","net"], low:["towel","sand","wet","spoit"] },
      ill:    { high:["food","water","harness","snack","medicine","healthcard"], medium:["blanket","net"], low:["towel","sand","wet","spoit"] }
    }
  }
};

const extraPriority = {
  high: ["firstaid","tag","contact","hospital","healthcard"],
  medium: ["photo","trash","gloves","bowl","net","spoit"],
  low: []
};
