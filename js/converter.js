// setupConverter を定義し、export して外部から利用可能にする
export function setupConverter() {
  // 1. 変換ロジックに必要な要素を取得する
  const converterForm = document.querySelector(".converter-form");
  const converterInput = document.querySelector(".converter-input");
  const converterFrom = document.querySelector(".converter-from");
  const converterTo = document.querySelector(".converter-to");
  const converterResult = document.querySelector(".converter-result");

  // 2. 単位データを定義する
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // 3. 単位選択欄 (From / To) を初期化する
  lengthUnit.forEach((unit) => {
    // 変換元の option 作成
    const optionFrom = document.createElement("option");
    optionFrom.value = unit.base;
    optionFrom.textContent = unit.name;
    converterFrom.appendChild(optionFrom);

    // 変換先の option 作成
    const optionTo = document.createElement("option");
    optionTo.value = unit.base;
    optionTo.textContent = unit.name;
    converterTo.appendChild(optionTo);
  });

  // 初期値の設定 (meter = 0番目, kilometer = 1番目)
  converterFrom.selectedIndex = 0;
  converterTo.selectedIndex = 1;

  // 4. 変換処理を実装する
  const calculateConversion = () => {
    // 入力値の取得と数値変換
    const inputValue = parseFloat(converterInput.value);

    // 数値でない場合のバリデーション
    if (isNaN(inputValue)) {
      converterResult.textContent = "Please enter a valid number";
      return;
    }

    // 選択された単位の base 値を取得
    const fromBase = parseFloat(converterFrom.value);
    const toBase = parseFloat(converterTo.value);

    // 選択された単位の name を取得 (表示用)
    const fromName = converterFrom.options[converterFrom.selectedIndex].text;
    const toName = converterTo.options[converterTo.selectedIndex].text;

    // 変換後の値を計算: (入力値 * 変換元base) / 変換先base
    const convertedValue = (inputValue * fromBase) / toBase;

    // 結果を表示 (小数点以下3桁)
    converterResult.textContent = `${inputValue} ${fromName} = ${convertedValue.toFixed(3)} ${toName}`;
  };

  // 5. リアルタイムに変換が行われるようにする
  // フォーム内の input/select の変更を input イベントで一括検知
  converterForm.addEventListener("input", calculateConversion);

  // Web アプリケーションの起動時（初期表示用）に呼び出し
  calculateConversion();
}
