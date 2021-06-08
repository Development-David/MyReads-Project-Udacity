import PropTypes from 'prop-types'
import React, { Component } from 'react'


class ListBooks extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);

    }
    static propTypes = {
        books: PropTypes.array.isRequired,
        checkShelf: PropTypes.array,
        title: PropTypes.string.isRequired,
        updateChange: PropTypes.func.isRequired,
    }

    handleChange(book, event) {
        this.props.updateChange(book, event.target.value);
    }
    render() {
        
        const { books, title, checkShelf } = this.props
        console.log(books)
        let bookShelf = ''
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => {
                            if (checkShelf) {
                                const findBook = checkShelf.find(
                                    (b) => b.id === book.id
                                );
                                bookShelf = findBook ? findBook.shelf : "none";
                            }
                            return (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                            
                                            <div className="book-shelf-changer">
                                                <select value={(bookShelf)?bookShelf:book.shelf} onChange={(e) => this.handleChange(book, e)}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default ListBooks

