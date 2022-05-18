import { AppDataSource } from "../data-source";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

describe("test file", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err));
  });
  afterAll(async () => {
    await AppDataSource.destroy().catch((err) => console.log(err));
  });

  it("Should pass", () => {
    expect(2 + 2).toBe(4);
  });
});
