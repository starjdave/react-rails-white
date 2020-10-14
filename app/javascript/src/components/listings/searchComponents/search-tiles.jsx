// Dependencies
// -----------------------------------------------
import React from 'react';

// Components
// -----------------------------------------------
import Spinner from '../resources/spinner';
import { SearchTile } from './index';

// -----------------------------------------------
// COMPONENT->SEARCH-TILES -----------------------
// -----------------------------------------------
const SearchTiles = props => {
  if (props.isLoading) {
    return (
      <section className="search-tiles search-tiles-empty">
        <Spinner />
      </section>
    );
  } else if (props.filteredResults && props.filteredResults.length) {
    return (
      <section className="search-tiles">
        {props.filteredResults.map((result, index) => (
          <SearchTile
            key={index}
            result={result}
            getStringifiedQueryString={props.getStringifiedQueryString}
            theme={props.theme}
            translate={props.translate}
            datesSet={props.datesSet}
          />
        ))}
      </section>
    );
  } else {
    return (
      <section className="search-tiles search-tiles-empty">
        <figure className="search-tile-empty">
          <i />
          <h3>{props.translate(`cx.search.num_results.no_results`)}</h3>
        </figure>
      </section>
    );
  }
};

// -----------------------------------------------
// EXPORT ----------------------------------------
// -----------------------------------------------
export default SearchTiles;