import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

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
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}%</Text>
          </View>
        )}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
          <View style={styles.ratingWrap}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{Number(product.rating).toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  imageWrap: {
    height: CARD_WIDTH,
    backgroundColor: '#f5f3ef',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#c8521a',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#e8e4de',
  },
  categoryText: {
    fontSize: 9,
    color: '#9e9b96',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    fontWeight: '500',
  },
  body: {
    padding: 10,
    gap: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1814',
    lineHeight: 17,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1814',
    letterSpacing: -0.3,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#fdf6ee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 99,
  },
  star: { fontSize: 10, color: '#e8a020' },
  rating: { fontSize: 11, color: '#6b6760', fontWeight: '500' },
});