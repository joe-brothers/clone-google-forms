export const checkFormHasRequired = (questions) => {
  let hasRequired = false;
  questions.forEach(({ isRequired }) => {
    if (isRequired) hasRequired = true;
  });
  return hasRequired;
};
