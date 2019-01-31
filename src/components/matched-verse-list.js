import React from 'react';
import MatchedVerseItem from './matched-verse-item';

import '../css/matched-verse-list.css';

export default function ({ matchedVerses }) {
    return (
        <ul className="matched_verse_list">
            {matchedVerses && matchedVerses.map(verse => 
                <MatchedVerseItem 
                    text={verse.text}
                    book={verse.book}
                    chapter={verse.chapter}
                    verse={verse.verse}
                />
            )}
        </ul>
    );
}