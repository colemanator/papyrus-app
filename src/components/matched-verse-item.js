import React from 'react';
import getBookTitle from '../books';

import '../css/matched-verse-item.css';

export default function ({ text, book, chapter, verse }) {
    return (
        <li className="matched_verse_item">
            <p className="matched_verse_item__text">{text}</p>
            <div className="matched_verse_item__details">
                <span className="matched_verse_item__details__book">{getBookTitle(book)}</span>
                <span className="matched_verse_item__details__chapter_verse">{chapter}:{verse}</span>
            </div>
        </li>
    );
}