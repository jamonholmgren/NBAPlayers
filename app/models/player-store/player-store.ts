import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PlayerModel, PlayerSnapshot } from "../player/player"
import { PlayerApi } from "../../services/api/player-api"
import { withEnvironment } from "../extensions/with-environment"

export const PlayerStoreModel = types
  .model("PlayerStore")
  .props({
    players: types.optional(types.array(PlayerModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    savePlayers: (playerSnapshots: PlayerSnapshot[]) => {
      self.players.replace(playerSnapshots)
    },
  }))
  .actions((self) => ({
    getPlayers: async () => {
      const playerApi = new PlayerApi(self.environment.api)
      const result = await playerApi.getPlayers()

      if (result.kind === "ok") {
        const newPlayers = result.players.map((player) => ({
          name: player.name,
          imgURL: player.imgURL,
        }))
        self.savePlayers(newPlayers)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type PlayerStoreType = Instance<typeof PlayerStoreModel>
export interface PlayerStore extends PlayerStoreType {}
type PlayerStoreSnapshotType = SnapshotOut<typeof PlayerStoreModel>
export interface PlayerStoreSnapshot extends PlayerStoreSnapshotType {}
export const createPlayerStoreDefaultModel = () => types.optional(PlayerStoreModel, {})
