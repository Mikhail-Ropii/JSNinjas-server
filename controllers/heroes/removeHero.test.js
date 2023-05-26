const { Hero } = require("../../models/hero");
const { createError } = require("../../helpers/createError");
const removeHero = require("./removeHero");

jest.mock("../../helpers/createError", () => ({
  createError: jest.fn(),
}));

describe("removeHero", () => {
  it("should remove a hero by ID and return a success message", async () => {
    const req = {
      params: {
        heroId: "123",
      },
    };

    const res = {
      json: jest.fn(),
    };

    const findByIdAndRemoveMock = jest
      .spyOn(Hero, "findByIdAndRemove")
      .mockResolvedValueOnce({
        _id: "123",
        nickname: "Superhero",
        realName: "Mark",
        description: "Nobis ipsam laboris ",
        superpowers: "Molestiae similique ",
        catchPhrase: "Architecto ut ut in ",
        imgSet: [],
      });

    await removeHero(req, res);

    expect(Hero.findByIdAndRemove).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith({ message: "Superhero deleted" });
    expect(createError).not.toHaveBeenCalled();

    expect(findByIdAndRemoveMock).toHaveBeenCalledTimes(1);
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

    const findByIdAndRemoveMock = jest
      .spyOn(Hero, "findByIdAndRemove")
      .mockResolvedValueOnce(null);

    const createErrorMock = jest.fn().mockReturnValue({
      statusCode: 404,
      message: "Not found",
    });

    createError.mockImplementation(createErrorMock);

    await expect(removeHero(req, res)).rejects.toEqual(createErrorMock(404));

    expect(Hero.findByIdAndRemove).toHaveBeenCalledWith("456");
    expect(createError).toHaveBeenCalledWith(404);
    expect(res.json).not.toHaveBeenCalled();

    expect(findByIdAndRemoveMock).toHaveBeenCalledTimes(2);
  });
});
