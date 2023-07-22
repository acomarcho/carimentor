const env: string = "prod";

export const appName = "CariMentor";
export const apiURL =
    env === "local"
        ? "http://localhost:9999"
        : "https://garudahack-api.malikrafsan.tech";