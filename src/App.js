import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import BookList from "./BookList";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

const App = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllAuthors = async () => {
    const res = await instance.get("/api/authors/");
    setAuthors(res.data);
    setLoading(false);
  };

  const fetchAllBooks = async () => {
    const res = await instance.get("/-api/books/");
    setBooks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    try {
      fetchAllAuthors();
      fetchAllBooks();

      /**
       * Alternatives: this version would run in parallel!
       */
      // const authorsReq = fetchAllAuthors();
      // const booksReq = fetchAllBooks();
      // const authors = await authorsReq;
      // const books = await booksReq;
    } catch (err) {
      console.error(err);
    }
  },[]);

  const getView = () => {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID">
            <AuthorDetail />
          </Route>
          <Route path="/authors/">
            <AuthorsList authors={authors} />
          </Route>

          <Route path="/books/:bookColor?">
            <BookList books={books} />
          </Route>
        </Switch>
      );
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content col-10">{getView()}</div>
      </div>
    </div>
  );
};

export default App;
