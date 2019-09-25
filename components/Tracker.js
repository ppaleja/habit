import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import differenceInDays from 'date-fns/differenceInDays';

import HabitButton from './HabitButton';
import { getCurDatePlusOffset } from '../utils/HabitUtils';

export default class Tracker extends React.Component {

  checkFailed = () => {
    const { id, failDate, curDate, onFailure } = this.props;
    if(differenceInDays(curDate, failDate) >= 1) {
      onFailure(id);
    } 
  }

  handleRemovePress = () => {
    const { id, onRemovePress } = this.props;

    onRemovePress(id);
  }

  handleCompletePress = () => {
    const { id, onCompletePress } = this.props;

    onCompletePress(id);
  }

  handleUndoPress = () => {
    const { id, onUndoPress } = this.props;

    onUndoPress(id);
  }

  renderActionButton = () => {
    const { isComplete } = this.props;

    if(isComplete) {
      return (
        <HabitButton
          color='#DB2828'
          title='Undo'
          onPress={this.handleUndoPress}
        />
      );
    } else {
      return (
        <HabitButton
          color='#21BA45'
          title='Complete'
          onPress={this.handleCompletePress}
        />
      );
    }
  }

  componentDidMount() {
    // Perform a check every time the tracker renders to check if we failed the streak
    this.checkFailed();
  }

  render() {
    const { runningSince, failDate, title, group, onEditPress } = this.props;

    // Calculate daysElapsed
    //const curDate = new Date();
    //console.log(title + ': ' + failDate);
    const daysElapsed = differenceInDays(failDate, runningSince);

    const elapsedString = daysElapsed + ' day'  + ((daysElapsed != 1) ? 's' : '') + ' in a row!'

    return (
      <View style={styles.timerContainer}>
        <Text style={styles.habit}>{title}</Text>
        <Text>{group}</Text>
        <Text style={styles.elapsedTime}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
          <HabitButton 
            color="blue" 
            small 
            title="Edit" 
            onPress={onEditPress} 
          />
          <HabitButton 
            color="blue" 
            small 
            title="Remove" 
            onPress={this.handleRemovePress}
          />
        </View>
        {this.renderActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: 'white',
    borderColor: '#d6d7da',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  habit: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
