import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'

interface SearchConfig<T> {
  searchFunction: (query: string) => Promise<T[]>
  debounceMs?: number
  minQueryLength?: number
}

export function useSearch<T>({
  searchFunction,
  debounceMs = 300,
  minQueryLength = 2,
}: SearchConfig<T>) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, debounceMs)

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minQueryLength) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const searchResults = await searchFunction(searchQuery)
      setResults(searchResults)
    } catch (err: any) {
      setError(err?.message || 'Erreur de recherche')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [searchFunction, minQueryLength])

  useEffect(() => {
    search(debouncedQuery)
  }, [debouncedQuery, search])

  const clearSearch = useCallback(() => {
    setQuery('')
    setResults([])
    setError(null)
  }, [])

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
  }
}