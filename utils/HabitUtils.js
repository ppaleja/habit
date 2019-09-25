import uuidv4 from 'uuid/v4';

export const newHabit = (attrs = {}) => {
  const habit = {
    title: attrs.title || 'Habit',
    group: attrs.group || 'Group',
    id: uuidv4(),
    runningSince: attrs.runningSince || getCurDatePlusOffset(0),
    failDate: attrs.failDate || getCurDatePlusOffset(0),
    isComplete: false,
  };

  return habit;
}

export const getCurDatePlusOffset = (offset) => {
  return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + offset);
}