import React, { useState } from "react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";

const AuthorsList = (props) => {
  const [filteredAuthors, setFilteredAuthors] = useState(props.authors);

  const filterAuthors = query => {
    query = query.toLowerCase();
    let filtered = props.authors.filter(author =>
      `${author.first_name} ${author.last_name}`.toLowerCase().includes(query)
    );
    setFilteredAuthors(filtered);
  };

  const authorCards = filteredAuthors.map(author => (
    <AuthorCard key={author.id} author={author} />
  ));

  return (
    <div>
      <h3>Authors</h3>
      <SearchBar onChange={filterAuthors} />
      <div className="row">{authorCards}</div>
    </div>
  );
};

export default AuthorsList;
