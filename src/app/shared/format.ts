export const onBlurFormat = (
  e: React.FocusEvent<HTMLInputElement>,
  prexfix: string,
) => {
  return (e.target.value = `${e.target.value.replace(/\D/g, "")} ${prexfix}`);
};
