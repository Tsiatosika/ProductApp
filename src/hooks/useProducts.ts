import { useRef, useReducer, useCallback } from 'react';
import { useDebounce } from './useDebounce';

const LIMIT = 10;

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
};

type State = {
  products: Product[];
  total: number;
  page: number;
  query: string;
  loading: boolean;
};

type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_DATA'; products: Product[]; total: number }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'SET_QUERY'; query: string };

const initialState: State = {
  products: [],
  total: 0,
  page: 0,
  query: '',
  loading: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: true };
    case 'SET_DATA':    return { ...state, loading: false, products: action.products, total: action.total };
    case 'SET_PAGE':    return { ...state, page: action.page };
    case 'SET_QUERY':   return { ...state, query: action.query, page: 0 };
    default:            return state;
  }
}

export function useProducts() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentPage = useRef(0);
  const currentQuery = useRef('');

  const fetchProducts = useCallback(async (query: string, page: number) => {
    dispatch({ type: 'SET_LOADING' });
    const skip = page * LIMIT;
    const url = query.trim()
      ? `https://dummyjson.com/products/search?limit=${LIMIT}&skip=${skip}&q=${encodeURIComponent(query)}`
      : `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: 'SET_DATA', products: data.products, total: data.total });
    } catch {
      dispatch({ type: 'SET_DATA', products: [], total: 0 });
    }
  }, []);

  useDebounce(
    () => {
      currentPage.current = state.page;
      currentQuery.current = state.query;
      fetchProducts(state.query, state.page);
    },
    500,
    [state.query, state.page]
  );

  const setPage = (page: number) => dispatch({ type: 'SET_PAGE', page });
  const setQuery = (query: string) => dispatch({ type: 'SET_QUERY', query });

  return { ...state, setPage, setQuery, limit: LIMIT };
}