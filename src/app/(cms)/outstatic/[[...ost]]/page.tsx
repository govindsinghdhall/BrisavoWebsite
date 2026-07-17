import 'outstatic/outstatic.css'
import { OstClient } from 'outstatic/client'
import { Outstatic } from 'outstatic'

export default async function OutstaticPage({
  params,
}: {
  params: Promise<{ ost: string[] }>
}) {
  const [ostData, ostParams] = await Promise.all([Outstatic(), params])

  return <OstClient ostData={ostData} params={ostParams} />
}
