let stress = 0;
let evac = 0;
let step = 0;

const scenes = [
    {
        text: "地震が発生！猫は隠れました。あなたはどうする？",
        choices: [
            { label: "静かに見守る", stress: -10, evac: 0,
              learn: "猫は『安全な場所』を最優先する動物。隠れる行動は正常な防御反応です。" },
            { label: "大声で呼ぶ", stress: +20, evac: -10,
              learn: "大声はストレスを増やし、自律神経を乱します。" },
            { label: "無理に抱き上げる", stress: +30, evac: -20,
              learn: "強制的な接触は恐怖記憶を作り、ストレス耐性を下げます。" }
        ]
    },

    {
        text: "猫がトイレに行きません。どうする？",
        choices: [
            { label: "静かな場所にトイレを移動", stress: -10, evac: 0,
              learn: "静かな環境は自律神経の回復を促し、排泄行動を助けます。" },
            { label: "叱る", stress: +30, evac: -10,
              learn: "叱るとストレス性膀胱炎のリスクが上がります。" },
            { label: "放置する", stress: +10, evac: -10,
              learn: "排泄の我慢は膀胱炎の原因になります。" }
        ]
    },

    {
        text: "避難が必要になりました。キャリーに入らない…どうする？",
        choices: [
            { label: "匂いのあるタオルを入れる", stress: -10, evac: +20,
              learn: "匂いは“安心の指標”。キャリーへの抵抗を減らします。" },
            { label: "無理に押し込む", stress: +30, evac: -30,
              learn: "強制は恐怖記憶を作り、次回以降さらに入らなくなります。" },
            { label: "キャリーを縦に持つ", stress: +10, evac: -20,
              learn: "縦持ちは不安定で、猫の平衡感覚を乱します。" }
        ]
    },

    {
        text: "余震が続き、猫が食べません。どうする？",
        choices: [
            { label: "少量の水を複数配置", stress: -10, evac: 0,
              learn: "余震で自律神経が乱れると食欲が落ちます。水は回復の助けになります。" },
            { label: "隠れ家を増やす", stress: -10, evac: 0,
              learn: "安心できる場所が増えると、食欲が戻りやすくなります。" },
            { label: "無理に食べさせる", stress: +20, evac: -10,
              learn: "強制給餌はストレスを増やし、逆効果になることがあります。" }
        ]
    },

    {
        text: "外の騒音で猫が固まっています。どうする？",
        choices: [
            { label: "静かな部屋へ移動", stress: -10, evac: 0,
              learn: "猫は音に敏感。静かな環境はストレスを大きく減らします。" },
            { label: "カーテンを閉める", stress: -5, evac: 0,
              learn: "視覚刺激を減らすことで安心感が増します。" },
            { label: "大声で励ます", stress: +20, evac: -10,
              learn: "大声は逆効果で、ストレスを増やします。" }
        ]
    },

    {
        text: "他の猫を避けて隠れています。どうする？",
        choices: [
            { label: "資源（水・トイレ）を分散", stress: -10, evac: 0,
              learn: "災害時は縄張りが崩れやすく、資源の分散がストレス軽減に重要です。" },
            { label: "隠れ家を複数設置", stress: -10, evac: 0,
              learn: "隠れ家が増えると、衝突を避けられます。" },
            { label: "まとめて行動させる", stress: +20, evac: -10,
              learn: "強制的な接触はストレスを増やします。" }
        ]
    },

    {
        text: "夜になり、猫が鳴き続けています。どうする？",
        choices: [
            { label: "静かな声で短く声かけ", stress: -10, evac: +10,
              learn: "飼い主の声は“安全の合図”。短く静かにがポイントです。" },
            { label: "照明を落とす", stress: -5, evac: 0,
              learn: "光刺激を減らすと不安が軽減します。" },
            { label: "無視する", stress: +10, evac: -10,
              learn: "不安が増幅し、鳴きが悪化することがあります。" }
        ]
    }
];

function updateBars() {
    document.getElementById("stress-bar").style.width = stress + "%";
    document.getElementById("evac-bar").style.width = evac + "%";
}

function renderScene() {
    const scene = scenes[step];
    document.getElementById("scene").innerText = scene.text;

    const choicesBox = document.getElementById("choices");
    choicesBox.innerHTML = "";

    scene.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.innerText = choice.label;
        btn.onclick = () => selectChoice(index);
        choicesBox.appendChild(btn);
    });
}

function selectChoice(index) {
    const choicesBox = document.getElementById("choices");
    const buttons = choicesBox.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
    });

    const choice = scenes[step].choices[index];

    stress = Math.min(100, Math.max(0, stress + choice.stress));
    evac = Math.min(100, Math.max(0, evac + choice.evac));

    updateBars();

    const learnBox = document.createElement("div");
    learnBox.className = "learn-box";
    learnBox.innerText = choice.learn;
    document.getElementById("scene").appendChild(learnBox);

    step++;

    if (step >= scenes.length) {
        setTimeout(() => {
            endGame();
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = "1";
            });
        }, 4000);
    } else {
        setTimeout(() => {
            renderScene();
            const newButtons = document.getElementById("choices").querySelectorAll("button");
            newButtons.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = "1";
            });
        }, 4000);
    }
}

function endGame() {
    document.getElementById("scene").innerText =
        `ゲーム終了！\nストレス：${stress}\n避難成功率：${evac}`;

    document.getElementById("choices").innerHTML = "";
    document.getElementById("restart").style.display = "block";
}

document.getElementById("restart").onclick = () => {
    stress = 0;
    evac = 0;
    step = 0;
    updateBars();
    document.getElementById("restart").style.display = "none";
    renderScene();
};

renderScene();
