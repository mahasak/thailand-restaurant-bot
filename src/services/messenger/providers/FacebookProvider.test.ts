import * as Provider from "./FacebookProvider";
import axios from "axios";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("OpenCageDataProvider", () => {
    test("an empty query string", async () => {
      (fetch as any).mockImplementation(() => {return {features: []}});
      const result = await Provider.getPlaces("Paris");
      expect(result).toEqual({ features: [] });
    });
  
    test("an invalid non-json response", async () => {
      (fetch as any).mockImplementation(() => "Service Unavailable.");
      const result = await Provider.getPlaces("Paris");
      await expect(Provider.getPlaces("Chamonix")).resolves.toThrow(SyntaxError);
    });
  });