// Constants.js
const prod = {
  url: {
    API_URL: `https://myblog-production.up.railway.app`,
  },
};

const dev = {
  url: {
    API_URL: `http://127.0.0.1:8000`,
  },
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;