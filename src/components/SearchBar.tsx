import { TextField } from "@mui/material";
import React from "react";
import { blueOutlineTextField } from "./utils/textFieldOutline";
import { searchSizeRespond } from "./utils/searchBarSizeResponsive"

export default function SearchBar() {
  return (
    <form className="m-6 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <TextField
          label="Hotel"
          name="hotel"
          variant="outlined"
          sx={{
            ...blueOutlineTextField,
            ...searchSizeRespond
          }}
        />
        <TextField
          label="Address"
          name="address"
          variant="outlined"
          sx={{
            ...blueOutlineTextField,
            ...searchSizeRespond
          }}
        />
        <button
          className="
            bg-blue-400 
            text-white 
            font-semibold 
            rounded-md 
            px-5 
            py-2
            shadow 
            hover:bg-blue-600 
            transition
          "
          style={{
            height: "auto",
            minWidth: "120px",
          }}
        >
          search
        </button>
      </div>
    </form>
  );
}
