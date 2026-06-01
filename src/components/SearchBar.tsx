import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  isDebouncing?: boolean;
};

export function SearchBar({ value, onChange, onClear, isDebouncing }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Rechercher un produit…"
        placeholderTextColor="rgba(247,245,240,0.35)"
        returnKeyType="search"
        autoCorrect={false}
      />
      {isDebouncing && (
        <ActivityIndicator size="small" color="rgba(247,245,240,0.4)" style={styles.spinner} />
      )}
      {value.length > 0 && !isDebouncing && (
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    height: 46,
  },
  icon: { fontSize: 20, color: 'rgba(247,245,240,0.4)', marginRight: 10 },
  input: { flex: 1, color: '#f7f5f0', fontSize: 15 },
  spinner: { marginLeft: 8 },
  clear: { padding: 4, marginLeft: 4 },
  clearText: { color: 'rgba(247,245,240,0.5)', fontSize: 14 },
});