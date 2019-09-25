import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import uuidv4 from 'uuid/v4';
import differenceInDays from 'date-fns/differenceInDays';

import EditableHabit from './components/EditableHabit';
import ToggleableHabitForm from './components/ToggleableHabitForm';

import { newHabit, getCurDatePlusOffset } from './utils/HabitUtils';

export default class App extends React.Component {

  // Initialize array of habits
  state = {
    habits: [
      // Habit 1
      {
        title: 'Read 15 pages of a book',
        group: 'Education',
        id: uuidv4(),
        runningSince: getCurDatePlusOffset(0),
        failDate: getCurDatePlusOffset(0),
        isComplete: false, 
      },
      // Habit 2
      {
        title: '1 Language Transfer Lesson',
        group: 'Spanish',
        id: uuidv4(),
        runningSince: getCurDatePlusOffset(-1),
        failDate: getCurDatePlusOffset(-1),
        isComplete: true,
      },
    ],
    curDate: getCurDatePlusOffset(0),
  }

  // Func used by ToggleableHabitForm to create a new habit
  handleCreateFormSubmit = (habit) => {
    const { habits } = this.state;

    this.setState({
      habits: [newHabit(habit), ...habits],
    });
  }

  // Func used by EditableHabit to update an existing habit
  handleFormSubmit = (attrs) => {
    const { habits } = this.state;

    this.setState({
      habits: habits.map(habit => {
        if(habit.id === attrs.id) {
          const { title, group } = attrs;

          return {
            ...habit, // Rest of the habit's attributes are kept the same
            title,    
            group,
          };
        }
        return habit; // returns the original habit if its not the correct one
      })
    });
  }

  // Function passed down to tracker to handle removePress
  handleRemovePress = (habitId) => {
    this.setState({
      habits: this.state.habits.filter(habit => habit.id !== habitId),
    });
  }

  // Function passed down to tracker to handle completePress
  handleCompletePress = (habitId) => {
    this.setState((prevState) => {
      const { habits } = prevState;

      return {
        habits: habits.map(habit => {
          const { id } = habit;

          if(id === habitId) {
            return {
              ...habit,
              failDate: getCurDatePlusOffset(1),
              isComplete: true,
            };
          }

          return habit;
        }),
      };
    });
  }
  
  // Function passed down to tracker to handle undoPress
  handleUndoPress = (habitId) => {
    this.setState((prevState) => {
      const { habits } = prevState;

      return {
        habits: habits.map(habit => {
          const { id } = habit;

          if(id === habitId) {
            return {
              ...habit,
              failDate: getCurDatePlusOffset(0),
              isComplete: false,
            };
          }

          return habit;
        }),
      };
    });
  }

  // Function passed down to tracker to handle streak failure
  handleFailure = (habitId) => {
    this.setState((prevState) => {
      const { habits } = prevState;

      return {
        habits: habits.map(habit => {
          const { id } = habit;

          if(id === habitId) {
            return {
              ...habit,
              runningSince: getCurDatePlusOffset(0),
              failDate: getCurDatePlusOffset(0),
              isComplete: false,
            };
          }

          return habit;
        }),
      };
    });
  }

  componentDidMount() {
    setInterval(() => {
      const { curDate } = this.state;
      let possibleNewCurDate = getCurDatePlusOffset(0);
      if(differenceInDays(curDate, possibleNewCurDate) !== 0) {
        this.setState({
          curDate: possibleNewCurDate,
        });
      }
    }, 5000);
  }

  render() {
    // Get the list of timers held by state
    const { curDate, habits } = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Habits</Text>
        </View>
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.habitListContainer}
        >
          {/* ScrollView contains the list of habits */}
          <ScrollView style={styles.habitList}>
            <ToggleableHabitForm 
              onFormSubmit={this.handleCreateFormSubmit}
            />
            {habits.map(({ 
              title, 
              group, 
              id,
              runningSince,
              failDate,
              isComplete
            }) => (
              <EditableHabit
                key={id}
                id={id}
                title={title}
                group={group}
                runningSince={runningSince}
                failDate={failDate}
                curDate={curDate}
                isComplete={isComplete}
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleRemovePress}
                onCompletePress={this.handleCompletePress}
                onUndoPress={this.handleUndoPress}
                onFailure={this.handleFailure}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  habitListContainer: {
    flex: 1,
  },
  habitList: {
    paddingBottom: 15,
  },
});
