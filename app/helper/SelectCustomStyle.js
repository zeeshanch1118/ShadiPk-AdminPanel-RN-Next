export const customHeightStyles = {
   option: (provided, state) => ({
      ...provided,
      padding: "3px 8px 3px 8px",
      fontSize: "14px",
      backgroundColor: state.isFocused ? "#ca2d2c" : "white",
      ":hover": {
         backgroundColor: "#f8f9fa",
         color: "black",
      },
      backgroundColor: state.isSelected ? "#ca2d2c" : "white",
   }),
   control: (provided) => ({
      ...provided,
      backgroundColor: "none",
      borderRadius: "0px",
      fontSize: "13px",
      border: "none",
      fontWeight: "500",
      borderBottom: "1px solid #F0F0F0",
      padding: "0px 2px 0px 1px",
      margin: "0px 0px 0px 0px",
      boxShadow: "none",
      ":hover": {
         borderColor: "#ca2d2c",
      },
      "&:focus": {
         outline: "none",
      },
   }),
   menu: (provided) => ({
      ...provided,
      width: "140px",
   }),
   menuList: (provided) => ({
      ...provided,
      maxHeight: "160px",

      scrollbarWidth: "thin",
      scrollbarColor: "#ca2d2c white",
      "&::-webkit-scrollbar": {
         width: "3px",
      },
      "&::-webkit-scrollbar-track": {
         background: "white",
      },
      "&::-webkit-scrollbar-thumb": {
         background: "#ca2d2c",
      },
   }),
   valueContainer: (provided) => ({
      ...provided,
      cursor: "text",
   }),
   loadingMessage: (provided) => ({
      ...provided,
      fontSize: "14px",
   }),
   dropdownIndicator: (provided) => ({
      ...provided,
      color: "#ca2d2c",
      marginRight: "0px",
      padding: "0px 3px 0px 0px",
      border: "none",
   }),
   indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
   }),
   placeholder: (provided) => ({
      ...provided,
      fontSize: "12px",
   }),
};
