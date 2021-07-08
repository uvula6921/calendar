export const dateCheck = (date) => {
  // 입력받은 날짜 형식이 원하는 형식에 맞는지
  // YYYY-MM-DD HH:mm
  let _reg =
    /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])\s([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;

  return _reg.test(date);
};
