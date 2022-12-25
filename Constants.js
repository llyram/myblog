// Constants.js
const prod = {
  url: {
    API_URL: `https://myblog-production.up.railway.app`,
    GIT_URL: '',
    TOKEN: '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',
  },
};

const dev = {
  url: {
    API_URL: `http://127.0.0.1:8000`,
    TOKEN: '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',
    GIT_URL: 'https://github.com/llyram/myblog'
  },
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;