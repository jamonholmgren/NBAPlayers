import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty Player model.
 */
export const PlayerModel = types.model("Player").props({
  name: types.maybe(types.string),
  imgURL: types.maybe(types.string),
})

type PlayerType = Instance<typeof PlayerModel>
export interface Player extends PlayerType {}
type PlayerSnapshotType = SnapshotOut<typeof PlayerModel>
export interface PlayerSnapshot extends PlayerSnapshotType {}
export const createPlayerDefaultModel = () => types.optional(PlayerModel, {})
