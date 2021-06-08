import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class Searchbooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateChange: PropTypes.func.isRequired,
    }
    state = {
        query: '',
        result: [],
    };

    updateQuery(query) {
        this.setState({ query: query });
        if (query.length > 0) {
            BooksAPI.search(query).then((data) => {
                if (!Array.isArray(data)) {
                    this.setState({ result: [] });
                }
                if (data.length > 0) {
                    this.setState({ result: data });
                }
            });
        }
    }
    render() {
        const { updateChange, books } = this.props
        const { query, result } = this.state

            return (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link
                            to='/'
                            className='close-search'
                            onClick={() => this.setState({ showSearchPage: false })}
                        > </Link>
                        <div className="search-books-input-wrapper">
                            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                            <input
                                className='search-contacts'
                                type='text'
                                placeholder='Search by title or author'
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                        <ListBooks
                            title={(query !== '') ? 'Result' : ''}
                            books={(query !== '') ? result : []}
                            checkShelf = {books}
                            updateChange={updateChange}
                        />
                    </div>
                </div>
            )
        }
}

    export default Searchbooks