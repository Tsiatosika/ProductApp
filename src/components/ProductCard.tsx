import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    discountPercentage: number;
    category: string;
    thumbnail: string;
  };
};

export function ProductCard({ product }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}%</Text>
          </View>
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>{product.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
          <Text style={styles.rating}>★ {Number(product.rating).toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2dfd8',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageWrap: { height: 160, backgroundColor: '#f9f7f3', position: 'relative' },
  image: { width: '100%', height: '100%' },
  categoryBadge: {
    position: 'absolute', bottom: 8, left: 8,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: '#e2dfd8',
  },
  categoryText: { fontSize: 10, color: '#9e9b96', textTransform: 'uppercase', letterSpacing: 0.6 },
  discountBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: '#c8521a',
    borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2,
  },
  discountText: { fontSize: 11, color: '#fff', fontWeight: '500' },
  body: { padding: 14 },
  title: { fontSize: 14, fontWeight: '500', color: '#1a1814', lineHeight: 20, marginBottom: 5 },
  desc: { fontSize: 12, color: '#9e9b96', lineHeight: 18, marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: '600', color: '#1a1814', letterSpacing: -0.3 },
  rating: { fontSize: 12, color: '#6b6760' },
});