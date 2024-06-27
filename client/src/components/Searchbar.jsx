import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue); //search value from here
    setSearchValue("");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.500" />}
          />
          <Input
            className="w-full"
            type="text"
            placeholder="Search for a project, task, etc.."
            value={searchValue}
            onChange={handleInputChange}
          />
        </InputGroup>
      </form>
    </div>
  );
}
