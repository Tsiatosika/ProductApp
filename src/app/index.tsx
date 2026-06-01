import { useRef } from 'react';
import {
  View, Text, FlatList, ActivityIndicator,
  StyleSheet, SafeAreaView, TouchableOpacity, Dimensions
} from 'react-native';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function HomeScreen() {
  const {
    products, total, page, query, debouncedQuery,
    loading, error, setPage, setQuery, limit
  } = useProducts();

  const flatListRef = useRef<FlatList>(null);
  const isDebouncing = query !== debouncedQuery;

  const handlePageChange = (p: number) => {
    setPage(p);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const totalPages = Math.ceil(total / limit);

  const renderItem = ({ item }: any) => {
    if (loading || !item) return (
      <View style={{ width: CARD_WIDTH }}>
        <SkeletonCard />
      </View>
    );
    return <ProductCard product={item} />;
  };

  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.brand}>
            <Text style={styles.brandIcon}>◈</Text>
            <View>
              <Text style={styles.brandTitle}>Catalogue</Text>
              <Text style={styles.brandSub}>Gestion des produits</Text>
            </View>
          </View>
          {!loading && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{total}</Text>
            </View>
          )}
        </View>
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
          isDebouncing={isDebouncing}
        />
      </View>

      <View style={styles.metaBar}>
        {loading ? (
          <View style={styles.metaLoading}>
            <ActivityIndicator size="small" color="#c8521a" />
            <Text style={styles.metaLoadingText}>Chargement…</Text>
          </View>
        ) : error ? (
          <View style={styles.metaError}>
            <Text style={styles.metaErrorText}>⚠ Erreur réseau</Text>
            <TouchableOpacity onPress={() => setQuery(query)}>
              <Text style={styles.retryText}>Réessayer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.metaCount}>
              {total} produit{total !== 1 ? 's' : ''}
              {debouncedQuery.trim()
                ? <Text style={styles.metaQuery}> « {debouncedQuery} »</Text>
                : null}
            </Text>
            {totalPages > 1 && (
              <Text style={styles.metaPage}>{page + 1} / {totalPages}</Text>
            )}
          </>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={loading ? Array(limit).fill(null) : products}
        keyExtractor={(item, i) => item ? String(item.id) : `sk-${i}`}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>◎</Text>
              <Text style={styles.emptyTitle}>Aucun résultat</Text>
              <Text style={styles.emptyText}>pour « {debouncedQuery} »</Text>
              <TouchableOpacity style={styles.resetBtn} onPress={() => setQuery('')}>
                <Text style={styles.resetBtnText}>Réinitialiser</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        ListFooterComponent={
          !loading && total > limit ? (
            <Pagination page={page} total={total} limit={limit} onPageChange={handlePageChange} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f5f0' },

  header: {
    backgroundColor: '#1a1814',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandIcon: { fontSize: 22, color: '#c8521a' },
  brandTitle: { fontSize: 18, fontWeight: '600', color: '#f7f5f0', letterSpacing: -0.3 },
  brandSub: { fontSize: 10, color: 'rgba(247,245,240,0.4)', textTransform: 'uppercase', letterSpacing: 0.8 },
  countBadge: {
    backgroundColor: 'rgba(200,82,26,0.2)',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(200,82,26,0.3)',
  },
  countText: { fontSize: 13, fontWeight: '600', color: '#c8521a' },

  metaBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4de',
    backgroundColor: '#fff',
  },
  metaLoading: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaLoadingText: { fontSize: 13, color: '#9e9b96' },
  metaError: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  metaErrorText: { fontSize: 13, color: '#c8521a' },
  retryText: { fontSize: 13, color: '#1a1814', fontWeight: '600', textDecorationLine: 'underline' },
  metaCount: { fontSize: 13, color: '#6b6760' },
  metaQuery: { color: '#c8521a', fontWeight: '600' },
  metaPage: {
    fontSize: 12, color: '#9e9b96',
    backgroundColor: '#f0ede8',
    paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 99,
  },

  list: { padding: 16, gap: 12, paddingBottom: 32 },
  row: { gap: 12, justifyContent: 'space-between' },

  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 44, color: '#ccc8c0', marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: '#1a1814', marginBottom: 4 },
  emptyText: { fontSize: 14, color: '#9e9b96', marginBottom: 20 },
  resetBtn: {
    backgroundColor: '#1a1814', borderRadius: 10,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  resetBtnText: { color: '#f7f5f0', fontSize: 14, fontWeight: '500' },
});