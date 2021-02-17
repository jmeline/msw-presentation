export const getProgrammingLanguageFrequencyByRepo = repos => {
  const counts = repos?.reduce((acc, repo) => {
    if (!repo?.language) {
      return acc
    }
    return { ...acc, [repo.language]: (acc[repo.language] ?? 0) + 1 }
  }, {})

  const favoriteLanguages = Object.entries(counts)
    .map(x => x)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(lang => `${lang[0]}(${lang[1]})`)
    .join(", ")

  return favoriteLanguages
}