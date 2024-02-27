import { promises as fs } from "fs";
import path from "path";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import {
  readFromDatabase,
  writeToDatabase,
} from "../../src/utils/file-transaction";
import { User } from "../../src/models/user.model";

chai.use(sinonChai);
const expect = chai.expect;

describe("File Transactions", () => {
  const usersFile = path.join(__dirname, "db.json");

  afterEach(() => {
    sinon.restore();
  });

  it("1. should read data from the database file", async () => {
    const mockData = {
      id: "id_1",
      userName: "John",
      password: "123456",
      email: "test@123",
    };
    const readFileStub = sinon
      .stub(fs, "readFile")
      .resolves(JSON.stringify(mockData));
    const result = await readFromDatabase();
    expect(result).to.deep.equal(mockData);
  });

  it("2. should write data to the database file", async () => {
    const mockData: User = {
      id: "id_2",
      userName: "John",
      password: "123456",
      email: "test@123",
    };
    const writeFileStub = sinon.stub(fs, "writeFile");
    await writeToDatabase(mockData);
    sinon.assert.calledWith(
      writeFileStub,
      "/Users/abhishekmehra/Desktop/Bel-Coh6-Assignments/news-aggregator-api/src/utils/db.json",
      JSON.stringify({
        id: "id_2",
        userName: "John",
        password: "123456",
        email: "test@123",
      }),
      { encoding: "utf8", flag: "w" }
    );
  });
});
