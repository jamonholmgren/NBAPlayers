import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetPlayersResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class PlayerApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getPlayers(): Promise<GetPlayersResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://raw.githubusercontent.com/alexnoob/BasketBall-GM-Rosters/master/2020-21.NBA.Roster.json",
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const players = response.data.players

      return { kind: "ok", players }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
