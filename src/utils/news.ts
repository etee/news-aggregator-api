import axios from "axios";
import { Preferences } from "../models/preferences.model";
import { NEWS_PREFERENCES, WORLD_NEWS_SOURCE } from "../constants";

const newsPromise = (url: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const formattedPreferences = (preferences: Preferences, api: string) => {
  const formattedPreferences = { ...preferences };
  let searchParameter = "";
  for (let [key, value] of Object.entries(formattedPreferences)) {
    value =
      Array.isArray(value) && key !== "language" ? value.join(",") : value;
    switch (key) {
      case NEWS_PREFERENCES.CATEGORIES:
        if (api === WORLD_NEWS_SOURCE) {
          searchParameter += `&text=${value}`;
        } else {
          searchParameter += `&category=${value}`;
        }
        break;

      case NEWS_PREFERENCES.COUNTRIES:
        if (api === WORLD_NEWS_SOURCE) {
          searchParameter += `&source-countries=${value}`;
        } else {
          searchParameter += `&country=${value}`;
        }
        break;

      case NEWS_PREFERENCES.LANGUAGE:
        searchParameter += `&language=${value}`;
        break;
    }
  }
  return searchParameter;
};

const formatAPIResponse = (data: any, api: string) => {
  let formattedData: any = [];
  switch (api) {
    case WORLD_NEWS_SOURCE:
      console.log(data.news);
      formattedData = data.news.map((article: any) => {
        return {
          id: article.id,
          title: article.title,
          url: article.url,
          image: article.image,
          published_date: article.published_date,
          language: article.language,
          description: article.text,
        };
      });
      break;

    default:
      formattedData = data.results.map((article: any) => {
        return {
          id: article.article_id,
          title: article.title,
          url: article.link,
          image: article.image_url,
          published_date: article.pubDate,
          language: article.language,
          description: article.description,
        };
      });
      console.log(formattedData);
      break;
  }
  return formattedData;
};

export { newsPromise, formattedPreferences, formatAPIResponse };
