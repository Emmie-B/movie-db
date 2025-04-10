import React from 'react'

const Search = (props) => {
  return (
    <div className='search'>
        <div>
            <img src='./search.svg' alt='search'/>
            <input type='text' placeholder='Search through movies' value={props.searchTerm} onChange={(event) =>  props.setSearchTerm(event.target.value) }/>
        </div>
    </div>
  )
}

export default Search