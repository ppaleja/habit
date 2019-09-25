import React from 'react';
import PropTypes from 'prop-types'

import HabitForm from './HabitForm';
import Tracker from './Tracker';

export default class EditableHabit extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    runningSince: PropTypes.object.isRequired,
    failDate: PropTypes.object.isRequired,
    isComplete: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onCompletePress: PropTypes.func.isRequired,
    onUndoPress: PropTypes.func.isRequired,
  };


  // Initiliaze the form to not be open
  state = {
    editFormOpen: false,
  };

  handleEditPress = () => {
    this.openForm();
  }

  handleFormClose = () => {
    this.closeForm();
  }

  handleSubmit = (habit) => {
    const { onFormSubmit } = this.props;

    onFormSubmit(habit);
    this.closeForm();
  }

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({editFormOpen: true });
  }

  render() {
    const { 
      id,
      title, 
      group, 
      runningSince,
      failDate,
      curDate,
      isComplete,
      onRemovePress,
      onCompletePress,
      onUndoPress,
      onFailure,
    } = this.props;
    const { editFormOpen } = this.state;

      
    // Return a habit (Habit) or a Habit's edit form (HabitForm) based on if
    // we are editing the form or not

    if(editFormOpen) {
      return (
        <HabitForm
          id={id}
          title={title}
          group={group}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Tracker
          id={id}
          title={title}
          group={group}
          runningSince={runningSince}
          failDate={failDate}
          curDate={curDate}
          isComplete={isComplete}
          onEditPress={this.handleEditPress}
          onRemovePress={onRemovePress}
          onCompletePress={onCompletePress}
          onUndoPress={onUndoPress}
          onFailure={onFailure}
        />
      );
    }
  }
}