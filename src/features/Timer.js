import { useState } from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';

//vibration pattern
const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  0 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
];

const Timer = ({ focusSubject, onClearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject)
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
        <View style={{ paddingTop: spacing.sm }}>
          <ProgressBar
            progress={progress}
            color={colors.progressBar}
            style={styles.progressBar}
          />
        </View>
      </View>
      <View style={styles.timingContainer}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonContainer}>
        {!isStarted && (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectContainer}>
        <RoundedButton size={50} title="-" onPress={onClearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingContainer: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubjectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
  progressBar: {
    height: spacing.sm,
    width: 300,
  },
});

export default Timer;
