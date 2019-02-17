import React, { useState, useEffect } from 'react';
import { debounce } from 'throttle-debounce';
import MatchedVerseList from './components/matched-verse-list';

import './css/app.css';

const statuses = {
    IDLE: 'idle',
    SEARCHING: 'searching',
    ERROR: 'ERROR'
};

const queryVerses = debounce(300, (query, callback) => {
    window.fetch(process.env.REACT_APP_API_URL + '/verses?query=' + encodeURIComponent(query))
      .then(response => {
        return response.json();
      })
      .then(callback)
});

export default function App() {

    // Prepare state
    const [status, setStatus] = useState(statuses.IDLE);
    const [query, setQuery] = useState('');
    const [matchedVerses, setMatchedVerses] = useState();

    const handleQueryChange = (event) => {
        if (status !== statuses.SEARCHING) {
            setQuery(event.target.value);
        }
    };

    useEffect(() => {
        if (query && query.length) {
            queryVerses(query, json => {
                setStatus(statuses.IDLE);    
                setMatchedVerses(json);
            })
        }
    }, [query]);

    return (
        <div className="papyrus">
            <header className="papyrus__header">
                <h1 className="papyrus__header__heading">
                    Papyrus
                </h1>
            </header>
            <main className="papyrus__main">
                <input
                    className="papyrus__main__search"
                    placeholder="search"
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                  />
                  <MatchedVerseList 
                    matchedVerses={matchedVerses}
                  />
            </main>
        </div>
    );
}
