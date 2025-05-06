import numeral from "numeral";

export const isAdmin = (token) => {
  if (!token) return false;
  const role = JSON.parse(token)?.role;
  return role === "admin";
};

export function isEmptyObject(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj).length === 0
  );
}

export const getUsernameFromEmail = (email) => {
  if (!email) return "unanonymous";
  return email.split("@")[0];
};

export const formatToAbbreviation = (value) => {
  return numeral(value).format("0,0a");
};

export const toTitleCase = (str) =>
  str.replace(
    /(^\w|\s\w)(\S*)/g,
    (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
  );
