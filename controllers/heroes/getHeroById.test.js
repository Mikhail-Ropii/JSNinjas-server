const { Hero } = require("../../models/hero");
const { createError } = require("../../helpers/createError");
const getHeroById = require("./getHeroById");

jest.mock("../../helpers/createError", () => ({
  createError: jest.fn(),
}));

describe("getHeroById", () => {
  it("should fetch a hero by ID and return the result", async () => {
    const req = {
      params: {
        heroId: "123",
      },
    };

    const res = {
      json: jest.fn(),
    };

    const findByIdMock = jest.spyOn(Hero, "findById").mockResolvedValue({
      _id: "123",
      nickname: "Superhero",
      realName: "Mark",
      description: "Nobis ipsam laboris ",
      superpowers: "Molestiae similique ",
      catchPhrase: "Architecto ut ut in ",
      imgSet: [],
    });

    await getHeroById(req, res);

    expect(Hero.findById).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith({
      _id: "123",
      nickname: "Superhero",
      realName: "Mark",
      description: "Nobis ipsam laboris ",
      superpowers: "Molestiae similique ",
      catchPhrase: "Architecto ut ut in ",
      imgSet: [],
    });
    expect(createError).not.toHaveBeenCalled();

    expect(findByIdMock).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it("should throw a 404 error if the hero is not found", async () => {
    const req = {
      params: {
        heroId: "456",
      },
    };

    const res = {
      json: jest.fn(),
    };

    const findByIdMock = jest.spyOn(Hero, "findById").mockResolvedValue(null);

    const createErrorMock = jest.fn().mockReturnValue({
      statusCode: 404,
      message: "Not found",
    });

    createError.mockImplementation(createErrorMock);

    await expect(getHeroById(req, res)).rejects.toEqual(createErrorMock(404));

    expect(Hero.findById).toHaveBeenCalledWith("456");
    expect(createError).toHaveBeenCalledWith(404);
    expect(res.json).not.toHaveBeenCalled();

    expect(findByIdMock).toHaveBeenCalledTimes(2);
  });
});
