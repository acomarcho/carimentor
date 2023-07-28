export const appName = "CariMentor";

const env: string = "prod";

export const apiURL =
  env === "local"
    ? "http://localhost:9999"
    : "https://carimentor-be.marchotridyo.com";
export const imgbbApiKey = "3e75de76703676728048f1f97e5943c5";
