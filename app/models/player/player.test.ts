import { PlayerModel } from "./player"

test("can be created", () => {
  const instance = PlayerModel.create({
    id: 1,
    name: "Rick Sanchez",
  })

  expect(instance).toBeTruthy()
})
