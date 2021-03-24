import { PlayerStoreModel } from "./player-store"

test("can be created", () => {
  const instance = PlayerStoreModel.create({})

  expect(instance).toBeTruthy()
})
