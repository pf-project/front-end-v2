import apiConfig from "./config";

const fetchAPI = async requestInfo => {
  const options = {
    method: requestInfo.method,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": requestInfo.token
    },
    body: JSON.stringify(requestInfo.body)
  };
  let response = await fetch(apiConfig.apiURL + requestInfo.url, options);
  if (response.status < 300) {
    let data = await response.json();
    return data;
  }
  throw "Erreur lors de l'action";
};

export default fetchAPI;
