import chai from 'chai';
import { formattedPreferences } from '../../src/utils/news';
const expect = chai.expect;

describe("Testing the formattedPreferences for a NEWS API endpoint", () => {
    const preferences = {
        categories: ["business", "entertainment"],
        countries: ["us", "uk"],
        sources: ["cnn", "bbc"],
        language: "en",
    }
    it('1. Generate the formatted preferences if NEWS endpoint is World NEWS', () => {
        const result = formattedPreferences(preferences, 'worldNews');
        expect(result).equal("&text=business,entertainment&source-countries=us,uk&news-sources=cnn,bbc&language=en");
    });
    it('2. Generate the formatted preferences if NEWS endpoint is NEWS API', () => {
        const result = formattedPreferences(preferences, 'newsAPI');
        expect(result).equal("&category=business,entertainment&country=us,uk&domainurl=cnn,bbc&language=en");
    });
});