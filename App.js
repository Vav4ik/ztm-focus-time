import { useState } from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { colors } from './src/utils/colors';
import Focus from './src/features/Focus';
import FocusHistory from './src/features/FocusHistory';
import Timer from './src/features/Timer';

export default function App() {
  //just some comment to test git
  const [currentSubject, setCurrentSubject] = useState();
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {!currentSubject ? (
        <>
          <Focus onAddSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory((prevHistory) => [
              { id: Date.now().toString(), title: subject },
              ...prevHistory,
            ]);
          }}
          onClearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});
