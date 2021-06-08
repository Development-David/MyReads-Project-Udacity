import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  updateChange = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(res => {
      if (shelf !== "none") {
        this.setState(prevState => ({
          books: [...prevState.books.filter(bk => bk.id !== book.id), book]
        }))
      } else {
        this.setState(prevState => ({
          books: [...prevState.books.filter(bk => bk.id !== book.id)]
        }))
      }
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks books={this.state.books} 
                       updateChange={this.updateChange}
          />
        )} />
        <Link
          to='/search'
          className='open-search'
        ><button onClick={() => this.setState({ showSearchPage: true })}>Add a Book</button>
        </Link>

        <div className="list-books-content">
          <Route exact path='/' render={() => (
            <div>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <ListBooks
                  title='Currently Reading'
                  books={this.state.books.filter(book => (book.shelf === 'currentlyReading'))}
                  updateChange={this.updateChange}
                />
                <ListBooks
                  title='Want to Read'
                  books={this.state.books.filter(book => (book.shelf === 'wantToRead'))}
                  updateChange={this.updateChange}
                />
                <ListBooks
                  title='Read'
                  books={this.state.books.filter(book => (book.shelf === 'read'))}
                  updateChange={this.updateChange}
                />
              </div>
            </div>
          )} />
          <div>

          </div>
        </div>
      </div>

    )
  }
}

export default BooksApp
