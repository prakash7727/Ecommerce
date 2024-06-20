
import {  createContext, useContext, useState } from "react";

const Searchcontext = createContext();

const SearchProvider = ({children}) => {
      const [values, setValues] = useState({
            keyword:"",
            results:[],
      });
      return (
            <Searchcontext.Provider value={[values, setValues]}>
                  {children}
            </Searchcontext.Provider>
      )
};

const useSearch = () => useContext(Searchcontext)
export {useSearch, SearchProvider};