export const formatCPF = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  const cpfDigits = digits.slice(0, 11);

  if (cpfDigits.length <= 3) {
    return cpfDigits;
  } else if (cpfDigits.length <= 6) {
    return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3)}`;
  } else if (cpfDigits.length <= 9) {
    return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(
      6
    )}`;
  } else {
    return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(
      6,
      9
    )}-${cpfDigits.slice(9)}`;
  }
};

export const formatBirthDate = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  const dateDigits = digits.slice(0, 8);

  if (dateDigits.length <= 2) {
    return dateDigits;
  } else if (dateDigits.length <= 4) {
    return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2)}`;
  } else {
    return `${dateDigits.slice(0, 2)}/${dateDigits.slice(
      2,
      4
    )}/${dateDigits.slice(4)}`;
  }
};

export const formatRG = (value: string): string => {
  const chars = value.replace(/[^\dXx]/g, "").toUpperCase();

  const rgChars = chars.slice(0, 9);

  if (rgChars.length <= 2) {
    return rgChars;
  } else if (rgChars.length <= 5) {
    return `${rgChars.slice(0, 2)}.${rgChars.slice(2)}`;
  } else if (rgChars.length <= 8) {
    return `${rgChars.slice(0, 2)}.${rgChars.slice(2, 5)}.${rgChars.slice(5)}`;
  } else {
    return `${rgChars.slice(0, 2)}.${rgChars.slice(2, 5)}.${rgChars.slice(
      5,
      8
    )}-${rgChars.slice(8)}`;
  }
};
