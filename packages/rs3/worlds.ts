import { getClanId } from '@/clans'
import { getHtml } from '@/html'
import { getPlayerInfo } from '@/players'

/**
 * Returns the current world, as a number for the player, if offline returns undefined
 */
export const getPlayerWorld = async (playerName: string) => {
  const player = await getPlayerInfo(playerName)

  if (!player?.clan) {
    return
  }

  const clanId = await getClanId(player.clan)

  if (!clanId) {
    return
  }

  const root = await getHtml(
    `http://services.runescape.com/m=clan-hiscores/l=3/a=254/members.ws?expandPlayerName=${playerName}&clanId=${clanId}&ranking=-1&pageSize=1&submit=submit`,
  )

  const row = root.querySelector('div.membersListRow.highlighted')

  const world = row?.querySelector('span.onlineStatus span.world')

  if (!world || world.textContent.toLowerCase().includes('off')) {
    return
  }

  const worldNumber = world.textContent.match(/\d+/)?.[0]

  if (!worldNumber) {
    return
  }

  return parseInt(worldNumber)
}
