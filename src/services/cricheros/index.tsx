import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "api-key": "7d313d7c02c39e21dc4abee42760c8f3",
  udid: "thirdparty-playverse-api",
  "device-type": "thirdparty-playverse",
  access_key_id: "P60f6ehP66",
  secret_access_key: "c2f42b60-e60b-11e7-8011-3de7cd8c6cf4",
};

const ApiUrl = "https://cricheroes.in/api/v1/thirdparty/playverse";

const getTournamentDetails = (tounamentId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const req = await axios.get(
        `${ApiUrl}/get-tournament-details/${tounamentId}`,
        { headers }
      );
      const data = req.data;
      if (data.status == true) {
        resolve(data.data);
      } else {
        reject(data.error);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const CricHeroService = {
  getTournamentDetails,
};
