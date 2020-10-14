import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

// Route
import { useParams } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

const AuthorDetail = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const {authorID} = useParams();

  const authorName = `${author.first_name} ${author.last_name}`;

  const getAuthor = async () => {
    setLoading(true);
    try {
      const res = await instance.get(`/api/authors/${authorID}`);
      const author = res.data;
      setAuthor(author);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAuthor();
  }, [authorID]);

  if (loading) return <Loading />;

  return(
    <div className="author">
      <div>
        <h3>{authorName}</h3>
        <img
          src={author.imageUrl}
          className="img-thumbnail img-fluid"
          alt={authorName}
        /> 
      </div>
      <BookTable books={author.books} />
    </div>
  )

};

export default AuthorDetail;
