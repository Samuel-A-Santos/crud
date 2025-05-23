// src/utils/formatters.ts

export const formatCPF = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Limit to 11 digits
  const cpfDigits = digits.slice(0, 11);
  
  // Format as 123.456.789-00
  if (cpfDigits.length <= 3) {
    return cpfDigits;
  } else if (cpfDigits.length <= 6) {
    return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3)}`;
  } else if (cpfDigits.length <= 9) {
    return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(6)}`;
  } else {
    return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(6, 9)}-${cpfDigits.slice(9)}`;
  }
};

export const formatBirthDate = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Limit to 8 digits (DDMMYYYY)
  const dateDigits = digits.slice(0, 8);
  
  // Format as DD/MM/YYYY
  if (dateDigits.length <= 2) {
    return dateDigits;
  } else if (dateDigits.length <= 4) {
    return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2)}`;
  } else {
    return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2, 4)}/${dateDigits.slice(4)}`;
  }
};

export const formatRG = (value: string): string => {
  // Remove all non-digits and non-letters (for RGs with X)
  const chars = value.replace(/[^\dXx]/g, '').toUpperCase();
  
  // Limit to 9 characters (standard SP RG length)
  const rgChars = chars.slice(0, 9);
  
  // Format as 12.345.678-9 or 12.345.678-X
  if (rgChars.length <= 2) {
    return rgChars;
  } else if (rgChars.length <= 5) {
    return `${rgChars.slice(0, 2)}.${rgChars.slice(2)}`;
  } else if (rgChars.length <= 8) {
    return `${rgChars.slice(0, 2)}.${rgChars.slice(2, 5)}.${rgChars.slice(5)}`;
  } else {
    return `${rgChars.slice(0, 2)}.${rgChars.slice(2, 5)}.${rgChars.slice(5, 8)}-${rgChars.slice(8)}`;
  }
};