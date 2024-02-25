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

      case NEWS_PREFERENCES.SOURCES:
        if (api === WORLD_NEWS_SOURCE) {
          searchParameter += `&news-sources=${value}`;
        } else {
          searchParameter += `&domainurl=${value}`;
        }
        break;

      case NEWS_PREFERENCES.LANGUAGE:
        searchParameter += `&language=${value}`;
        break;
    }
  }
  return searchParameter;
};

export { newsPromise, formattedPreferences };
