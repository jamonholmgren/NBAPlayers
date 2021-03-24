import { GeneralApiProblem } from "./api-problem"
import { Player } from "../../models/player/player"

export type GetPlayersResult = { kind: "ok"; players: Player[] } | GeneralApiProblem
export type GetPlayerResult = { kind: "ok"; player: Player } | GeneralApiProblem
