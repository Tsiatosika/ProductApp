import { useReducer, useEffect, useRef } from 'react';
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
  debouncedQuery: string;
  loading: boolean;
  error: boolean;
};

type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_DATA'; products: Product[]; total: number }
  | { type: 'SET_ERROR' }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'SET_QUERY'; query: string }
  | { type: 'SET_DEBOUNCED_QUERY'; query: string };

const initialState: State = {
  products: [],
  total: 0,
  page: 0,
  query: '',
  debouncedQuery: '',
  loading: true,
  error: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: false };
    case 'SET_DATA':
      return { ...state, loading: false, products: action.products, total: action.total };
    case 'SET_ERROR':
      return { ...state, loading: false, error: true, products: [], total: 0 };
    case 'SET_PAGE':
      return { ...state, page: action.page };
    case 'SET_QUERY':
      return { ...state, query: action.query };
    case 'SET_DEBOUNCED_QUERY':
      return { ...state, debouncedQuery: action.query, page: 0 };
    default:
      return state;
  }
}

export function useProducts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useDebounce(
    () => {
      dispatch({ type: 'SET_DEBOUNCED_QUERY', query: state.query });
    },
    500,
    [state.query]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'SET_LOADING' });
      const skip = state.page * LIMIT;

      const url = state.debouncedQuery.trim()
        ? `https://dummyjson.com/products/search?limit=${LIMIT}&skip=${skip}&q=${encodeURIComponent(state.debouncedQuery)}`
        : `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erreur réseau');
        const data = await res.json();
        dispatch({ type: 'SET_DATA', products: data.products, total: data.total });
      } catch {
        dispatch({ type: 'SET_ERROR' });
      }
    };

    fetchProducts();
  }, [state.debouncedQuery, state.page]);

  const setPage = (page: number) => dispatch({ type: 'SET_PAGE', page });
  const setQuery = (query: string) => dispatch({ type: 'SET_QUERY', query });

  return { ...state, setPage, setQuery, limit: LIMIT };
}