
type IFetch = {
  url: string
}

export default async function useFetch({url}: IFetch) {
  const res = await fetch(url, {next: {revalidate: 1000}})
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}