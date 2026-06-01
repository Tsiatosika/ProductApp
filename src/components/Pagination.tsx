import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

type Props = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
};

export function Pagination({ page, total, limit, onPageChange }: Props) {
  const pages = Math.ceil(total / limit);
  if (pages <= 1) return null;

  const getItems = (): (number | '...')[] => {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i);
    if (page <= 3) return [0, 1, 2, 3, 4, '...', pages - 1];
    if (page >= pages - 4) return [0, '...', pages - 5, pages - 4, pages - 3, pages - 2, pages - 1];
    return [0, '...', page - 1, page, page + 1, '...', pages - 1];
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrap}>
      <TouchableOpacity
        style={[styles.btn, page === 0 && styles.disabled]}
        onPress={() => page > 0 && onPageChange(page - 1)}
        disabled={page === 0}
      >
        <Text style={styles.btnText}>‹</Text>
      </TouchableOpacity>

      {getItems().map((item, i) =>
        item === '...' ? (
          <Text key={`e-${i}`} style={styles.ellipsis}>…</Text>
        ) : (
          <TouchableOpacity
            key={item}
            style={[styles.btn, item === page && styles.active]}
            onPress={() => onPageChange(item as number)}
          >
            <Text style={[styles.btnText, item === page && styles.activeText]}>{(item as number) + 1}</Text>
          </TouchableOpacity>
        )
      )}

      <TouchableOpacity
        style={[styles.btn, page === pages - 1 && styles.disabled]}
        onPress={() => page < pages - 1 && onPageChange(page + 1)}
        disabled={page === pages - 1}
      >
        <Text style={styles.btnText}>›</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingHorizontal: 2 },
  btn: {
    minWidth: 36, height: 36, borderRadius: 10,
    borderWidth: 1, borderColor: '#e2dfd8',
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6,
  },
  btnText: { fontSize: 14, color: '#6b6760' },
  active: { backgroundColor: '#1a1814', borderColor: '#1a1814' },
  activeText: { color: '#f7f5f0', fontWeight: '600' },
  disabled: { opacity: 0.3 },
  ellipsis: { fontSize: 14, color: '#9e9b96', paddingHorizontal: 4 },
});