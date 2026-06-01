import { useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';

export default function HomeScreen() {
  const { products, total, page, query, loading, setPage, setQuery, limit } = useProducts();
  const flatListRef = useRef<FlatList>(null);

  const handlePageChange = (p: number) => {
    setPage(p);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brand}>
          <Text style={styles.brandIcon}>◈</Text>
          <View>
            <Text style={styles.brandTitle}>Catalogue</Text>
            <Text style={styles.brandSub}>Gestion des produits</Text>
          </View>
        </View>
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
        />
      </View>

      {/* Meta bar */}
      <View style={styles.metaBar}>
        {loading ? (
          <ActivityIndicator size="small" color="#9e9b96" />
        ) : (
          <>
            <Text style={styles.metaCount}>
              {total} produit{total !== 1 ? 's' : ''}
              {query.trim() ? <Text style={styles.metaQuery}> « {query} »</Text> : ''}
            </Text>
            {Math.ceil(total / limit) > 1 && (
              <Text style={styles.metaPage}>Page {page + 1} / {Math.ceil(total / limit)}</Text>
            )}
          </>
        )}
      </View>

      {/* List */}
      <FlatList
        ref={flatListRef}
        data={loading ? Array(limit).fill(null) : products}
        keyExtractor={(item, i) => item ? String(item.id) : `sk-${i}`}
        renderItem={({ item }) =>
          loading || !item
            ? <SkeletonCard />
            : <ProductCard product={item} />
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>◎</Text>
              <Text style={styles.emptyText}>Aucun produit pour « {query} »</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          !loading && total > limit
            ? <Pagination page={page} total={total} limit={limit} onPageChange={handlePageChange} />
            : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f5f0' },
  header: { backgroundColor: '#1a1814', padding: 16, gap: 12 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandIcon: { fontSize: 20, color: '#c8521a' },
  brandTitle: { fontSize: 17, fontWeight: '500', color: '#f7f5f0' },
  brandSub: { fontSize: 11, color: 'rgba(247,245,240,0.4)', textTransform: 'uppercase', letterSpacing: 0.6 },
  metaBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#e2dfd8',
  },
  metaCount: { fontSize: 13, color: '#6b6760' },
  metaQuery: { color: '#c8521a', fontWeight: '500' },
  metaPage: {
    fontSize: 12, color: '#9e9b96',
    backgroundColor: '#e2dfd8', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99,
  },
  list: { padding: 16 },
  empty: { alignItems: 'center', paddingVertical: 64 },
  emptyIcon: { fontSize: 40, color: '#9e9b96', marginBottom: 12 },
  emptyText: { fontSize: 15, color: '#6b6760' },
});