import { generateAllLocation, generateLocation } from "../db/seed/utils"

describe("location generation ", () => {
    test("should generate random locations", () => {
        const result = generateLocation();
        expect(Object.keys(result)).toEqual(['address', 'group', 'coords']);
        expect(result.coords.latitude).toBeLessThan(800);
        expect(result.coords.latitude).toBeGreaterThan(0);

        expect(result.coords.longitude).toBeLessThan(800);
        expect(result.coords.longitude).toBeGreaterThan(0);
    });

    test("should generate an expected number of grouped/not grouped locations", () => {
        const result = generateAllLocation(2, 5);
        expect(result.grouped.length).toEqual(2);
        expect(result.notGrouped.length).toEqual(5);
    });
});
