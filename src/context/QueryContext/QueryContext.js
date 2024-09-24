
/* 
    File: src/context/QueryContext/QueryContext.js
    Description:
        Defines the QueryContext and its provider for managing search query state in a React application.
        Provides functionalities to access and update the current search query through a context API.
*/

// general
import { createContext, useState, useContext } from 'react';

const QueryContext = createContext({
    query: "",
    setQuery: () => {}
});

export const QueryProvider = ({ children }) => {

    const [query, setQuery] = useState("");

    return (
        <QueryContext.Provider value={{ 
            query,
            setQuery
        }}>
            {children}
        </QueryContext.Provider>
    );
};

export const useQuery = () => {
    const context = useContext(QueryContext);
    if (context === undefined) {
        throw new Error('useQuery must be used within a QueryProvider');
    };
    return context;
};
