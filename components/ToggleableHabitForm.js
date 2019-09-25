import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import HabitButton from './HabitButton';
import HabitForm from './HabitForm';

export default class ToggleableHabitForm extends React.Component {
  state = {
    isOpen: false,
  };

  // Function that toggles the state of the form to open
  handleFormOpen = () => {
    this.setState({ isOpen: true });
  }

  handleFormClose = () => {
    this.setState({ isOpen: false });
  }

  handleFormSubmit = (habit) => {
    const { onFormSubmit } = this.props;

    onFormSubmit(habit);
    this.setState({ isOpen: false });
  }
  
  render () {
    const { isOpen } = this.state;

    return (
      // If the form is open display it, else, display the add habit button
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <HabitForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
          /> 
        ) : ( 
          <HabitButton 
            title='+' 
            color='black'
            onPress={this.handleFormOpen}
          />
        )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});
