import { useState } from 'react';

function useSearchState(initialState = undefined) {
  const [search, setSearch] = useState<undefined | string>(initialState);

  const updateSearch = (newSearch: undefined | string) => {
    setSearch(newSearch);
  };

  return [search, updateSearch] as const;
}

export default useSearchState;