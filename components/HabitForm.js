import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

import HabitButton from './HabitButton';

export default class HabitForm extends React.Component {
  constructor(props) {
    super(props);
    const { id, title, group } = props;

    this.state = {
      title: id ? title : '',
      group: id ? group : '',
    };
  }

  handleTitleChange = (title) => {
    this.setState({ title });
  }

  handleGroupChange = (group) => {
    this.setState({ group });
  }

  handleSubmit = () => {
    const { onFormSubmit, id, } = this.props;
    const { title, group } = this.state;

    onFormSubmit({
      id,
      title,
      group,
    });
  }

  render() {
    // Get tracker variables from props and state
    const { id, onFormClose, } = this.props;
    const { title, group, } = this.state;

    // Check if we want to show the update or create string on the button
    const submitText = id ? 'Update' : 'Create';

    return (
      <View style={styles.formContainer}>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Habit</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={this.handleTitleChange}
              value={title}
            />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Group</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={this.handleGroupChange}
              value={group}
            />
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <HabitButton
            small 
            color='#21BA45' 
            title={submitText}
            onPress={this.handleSubmit}
          />
          <HabitButton 
            small 
            color='#DB2828'
            title='Cancel'
            onPress={onFormClose}
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: '#D6D7DA',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    padding: 5,
    fontSize: 12,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
