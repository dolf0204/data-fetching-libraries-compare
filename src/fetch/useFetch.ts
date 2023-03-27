export const dataFetcher = async (url: string) => {
  return await fetch(url).then((res) => res.json());
};
