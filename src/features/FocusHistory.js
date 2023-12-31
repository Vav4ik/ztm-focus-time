import { FlatList, StyleSheet, Text, View } from 'react-native';

import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return <Text style={styles.title}>We have not focused yet...</Text>;

  const renderItem = ({ item }) => (
    <Text style={styles.item}> - {item.title}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we have focused on:</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
  item: {
    paddingTop: spacing.sm,
    color: colors.white,
    fontSize: fontSizes.md,
  },
});

export default FocusHistory;
