import { createContext, useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';

import { CATEGORIES } from '../utils/graphqlRequest';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const { categories } = await graphClient.request(CATEGORIES);
    setCategory(categories);
  };

  return (
    <CategoryContext.Provider value={category}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider, CategoryContext };
