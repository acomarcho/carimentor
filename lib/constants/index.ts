export const appName = "CariMentor";

const env: string = "prod";

export const apiURL =
  env === "prod"
    ? "http://localhost:9999"
    : "https://garudahack-api.malikrafsan.tech";
export const imgbbApiKey = "3e75de76703676728048f1f97e5943c5";
