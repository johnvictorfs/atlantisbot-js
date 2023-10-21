import { z } from 'zod'

const playerInfoSchema = z.object({
  isSuffix: z.boolean().optional(),
  recruiting: z.boolean().optional(),
  name: z.string().min(1),
  clan: z.string().optional(),
  title: z.string().optional(),
})

export const getPlayerInfo = async (playerName: string) => {
  const url = `http://services.runescape.com/m=website-data/playerDetails.ws?names=%5B%22${playerName}%22%5D&callback=jQuery000000000000000_0000000000&_=0`

  const response = await fetch(url)

  const text = await response.text()

  const json = text.match(/jQuery0+_0+\((.*)\);/)?.[1]

  if (!json) {
    return
  }

  return playerInfoSchema.parse(JSON.parse(json)[0])
}
