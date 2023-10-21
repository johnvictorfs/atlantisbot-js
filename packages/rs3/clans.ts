import { getHtml } from '@/html'

export const getClanId = async (clanName: string) => {
  const root = await getHtml(
    `https://secure.runescape.com/m=clan-hiscores/l=3/a=254/compare.ws?clanName=${clanName}`,
  )

  const clanIdInput = root.querySelector('input[name="clanId"]')

  return clanIdInput?.getAttribute('value')
}
