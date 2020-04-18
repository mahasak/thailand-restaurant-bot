import * as Provider from "./FacebookProvider";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("OpenCageDataProvider", () => {
  
    test("an empty query string", async () => {
      const mockResponse = Promise.resolve({
        ok: false,
        status: 503,
        json: () => {
            return {features: []};
        },
       });
       
      (fetch as any).mockImplementation(() => {return mockResponse});
      const result = await Provider.getPlaces("");
      expect(result).toEqual({ features: [] });
    });
    
    /*
    test("an invalid non-json response", async () => {

      const mockResponse = Promise.resolve({
        ok: false,
        status: 503,
        json: () => {
            return Promise.reject(JSON.parse("Service Unavailable."));
        },
       });
      (fetch as any).mockImplementation(() => mockResponse);
      const result = await Provider.getPlaces("Paris");
      await expect(Provider.getPlaces("Chamonix")).rejects.toThrow(SyntaxError);
    }); 
    */
 });