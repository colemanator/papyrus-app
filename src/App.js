import React, { useState, useEffect } from 'react';
import { debounce } from 'throttle-debounce';

import './App.css';

const statuses = {
    IDLE: 'idle',
    SEARCHING: 'searching',
    ERROR: 'ERROR'
}

const queryVerses = debounce(300, (query) => {
    return window.fetch('http://localhost:9000/bible?query=' + encodeURIComponent(query))
      .then((response) => {
        return response.json();
      });
});

export default function App() {

    // Prepare state
    const [status, setStatus] = useState(statuses.IDLE);
    const [query, setQuery] = useState('');
    const [matchedVerses, setMatchedVerses] = useState();

    const fetchMatchedVerses = async (query) => {
        const matchedVerses = await queryVerses(query);

        setStatus(statuses.IDLE);
        setMatchedVerses(matchedVerses);
    };

    const handleQueryChange = (event) => {
        if (status !== statuses.SEARCHING) {
            setQuery(event.target.value);
        }
    };

    useEffect(() => {
        if (query) {
            fetchMatchedVerses();
        }
    }, [query]);

    console.log(matchedVerses);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Papyrus</h1>
            </header>
            <main>
                <input
                    placeholder="search"
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                  />
            </main>
        </div>
    );
}
