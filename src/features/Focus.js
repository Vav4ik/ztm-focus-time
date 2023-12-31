import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';

import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';
import { RoundedButton } from '../components/RoundedButton';

const Focus = ({ onAddSubject }) => {
  const [subject, setSubject] = useState();

  const addSubjectHandler = () => {
    if (subject) {
      onAddSubject(subject);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="What would you like to focus on?"
          onChangeText={setSubject}
        />
        <View style={styles.buttonContainer}>
          <RoundedButton title="+" size={50} onPress={addSubjectHandler} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    padding: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInput: {
    flex: 0.8,
    marginRight: spacing.sm,
  },
  buttonContainer: {
    justifyContent: 'center',
  },
});

export default Focus;
