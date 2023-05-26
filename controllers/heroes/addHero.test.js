const { Hero } = require("../../models/hero");
const addHero = require("./addHero");

describe("addHero", () => {
  it("should create a new hero and return the result", async () => {
    const req = {
      body: {
        nickname: "Superhero",
        realName: "Mark",
        description: "Nobis ipsam laboris ",
        superpowers: "Molestiae similique ",
        catchPhrase: "Architecto ut ut in ",
        imgSet: [],
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const createSpy = jest.spyOn(Hero, "create").mockResolvedValue(req.body);

    await addHero(req, res);

    expect(Hero.create).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(req.body);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
