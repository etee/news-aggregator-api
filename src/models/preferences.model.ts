import Joi from "joi";

export interface Preferences {
  categories: string[];
  countries: string[];
  language: string;
}

const preferencesSchema = Joi.object({
  categories: Joi.array()
    .min(1)
    .items(
      Joi.string().required().valid(
        "business",
        "domestic",
        "education",
        "entertainment",
        "health",
        "lifestyle",
        "politics",
        "science",
        "sports",
        "technology",
        "tourism",
        "world"
      )
    ),
  countries: Joi.array()
    .min(1)
    .items(
      Joi.string().required().valid(
        "au",
        "at",
        "ca",
        "de",
        "fr",
        "in",
        "jp",
        "my",
        "nz",
        "pk",
        "sg",
        "lk",
        "ua",
        "gb",
        "us"
      )
    ),
  language: Joi.string().valid("en", "fr", "de", "es", "hi"),
});

export default preferencesSchema;
