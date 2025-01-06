import { createContext, useContext, useState } from 'react'

const FilterContext = createContext(undefined)

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    categoryId: null,
    sourceId: null,
    matiereId: null
  })

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  return (
    <FilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)

  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  
return context
}
