import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export function SkeletonCard() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1,   duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.image} />
      <View style={styles.body}>
        <View style={[styles.line, { width: '60%', height: 12 }]} />
        <View style={[styles.line, { width: '90%', height: 10, marginTop: 8 }]} />
        <View style={[styles.line, { width: '75%', height: 10, marginTop: 4 }]} />
        <View style={styles.footer}>
          <View style={[styles.line, { width: '30%', height: 14, marginTop: 0 }]} />
          <View style={[styles.line, { width: '20%', height: 14, marginTop: 0 }]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderRadius: 14,
    overflow: 'hidden', borderWidth: 1, borderColor: '#e2dfd8', marginBottom: 12,
  },
  image: { height: 160, backgroundColor: '#ede9e1' },
  body: { padding: 14 },
  line: { backgroundColor: '#ede9e1', borderRadius: 4, marginBottom: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
});