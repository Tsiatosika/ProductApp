import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
};

export function SearchBar({ value, onChange, onClear }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Rechercher un produit…"
        placeholderTextColor="#9e9b96"
        clearButtonMode="never"
        returnKeyType="search"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    height: 44,
  },
  icon: { fontSize: 18, color: 'rgba(247,245,240,0.35)', marginRight: 8 },
  input: { flex: 1, color: '#f7f5f0', fontSize: 15, fontFamily: 'System' },
  clear: { padding: 4 },
  clearText: { color: 'rgba(247,245,240,0.4)', fontSize: 14 },
});