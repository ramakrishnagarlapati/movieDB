import {createContext, useState} from 'react'

export const searchContext = createContext('')

const SearchContextProvider = ({children}) => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <searchContext.Provider value={{searchValue, setSearchValue}}>
      {children}
    </searchContext.Provider>
  )
}

export default SearchContextProvider
