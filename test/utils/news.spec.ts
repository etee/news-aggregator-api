import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { formattedPreferences, newsPromise } from "../../src/utils/news";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const expect = chai.expect;
chai.use(chaiAsPromised);

describe("Testing the formattedPreferences for a NEWS API endpoint", () => {
  const preferences = {
    categories: ["business", "entertainment"],
    countries: ["us", "uk"],
    language: "en",
  };
  it("1. Generate the formatted preferences if NEWS endpoint is World NEWS", () => {
    const result = formattedPreferences(preferences, "worldNews");
    expect(result).equal(
      "&text=business,entertainment&source-countries=us,uk&news-sources=cnn,bbc&language=en"
    );
  });
  it("2. Generate the formatted preferences if NEWS endpoint is NEWS IO API", () => {
    const result = formattedPreferences(preferences, "newsAPI");
    expect(result).equal(
      "&category=business,entertainment&country=us,uk&domainurl=cnn,bbc&language=en"
    );
  });
});

describe("Testing the newsPromise function", () => {
    it("1. Returns a data when axios request succeeds", async () => {
        const mockAxios = new MockAdapter(axios);
        const data = { response: true };
        mockAxios.onGet("/testurl").reply(200, data);

        const result = await newsPromise("/testurl");
        expect(result).to.deep.equal(data);
    });
    it("2. Returns an error when axios request fails", async () => {
        const mockAxios = new MockAdapter(axios);
        mockAxios.onGet("/testurl").reply(500);
        await expect(newsPromise("/testurl")).to.be.rejectedWith(Error);
    });
});
