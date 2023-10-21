import { parse } from 'node-html-parser'

export const getHtml = async (url: string) => {
  const response = await fetch(url)
  const html = await response.text()

  return parse(html)
}
