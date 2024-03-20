import React from "react";

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (newSearchTerm: string) => void;
  className: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
  className,
}) => {
  return (
    <input
      className={className}
      type="text"
      placeholder="Search Node by Name or ID..."
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
    />
  );
};

export default SearchInput;
