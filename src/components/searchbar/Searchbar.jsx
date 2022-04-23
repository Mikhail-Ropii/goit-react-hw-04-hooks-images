import { useState } from 'react';
import '../styles.css';

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const onChangeInput = e => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      return;
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={onChangeInput}
          value={searchValue}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
