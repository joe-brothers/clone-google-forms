export const checkFormHasRequired = (questions) => {
  let hasRequired = false;
  questions.forEach(({ isRequired }) => {
    if (isRequired) hasRequired = true;
  });
  return hasRequired;
};

export const typeToKorean = (type) => {
  const typeMatchObject = {
    textShort: "단답형",
    textLong: "장문형",
    radio: "객관식 질문",
    checkbox: "체크박스",
    dropdown: "드롭다운",
  };
  return typeMatchObject[type];
};
