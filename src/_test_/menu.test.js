const request = require("supertest");
const app = require("../server");


describe("GET /menu", ()=>{
    it("Deberia devolver la lista de productos del menu", async () => {
        const response = await request(app).get("/api/menu");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        if(response.body.length > 0){
            expect(response.body[0]).toHaveProperty("name");
            expect(response.body[0]).toHaveProperty("price");
            expect(response.body[0]).toHaveProperty("photo_url");
        }
    });
});

