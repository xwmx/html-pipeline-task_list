// HTML::Pipeline::TaskList
/* eslint no-undef: "off" */

const indexOf = [].indexOf || function indexOf(item) {
  for (let i = 0, l = this.length; i < l; i += 1) {
    if (i in this && this[i] === item) return i;
  } return -1;
};

const incomplete = '[ ]';
const complete = '[x]';

const escapePattern = function escapePattern(str) {
  return str.replace(/([[\]])/g, '\\$1').replace(/\s/, '\\s').replace('x', '[xX]');
};

const incompletePattern = RegExp(`${escapePattern(incomplete)}`);

const completePattern = RegExp(`${escapePattern(complete)}`);

const itemPattern = RegExp(`^(?:\\s*(?:>\\s*)*(?:[-+*]|(?:\\d+\\.)))\\s*(${escapePattern(complete)}|${escapePattern(incomplete)})\\s+(?!\\(.*?\\))(?=(?:\\[.*?\\]\\s*(?:\\[.*?\\]|\\(.*?\\))\\s*)*(?:[^\\[]|$))`);

const codeFencesPattern = /^`{3}(?:\s*\w+)?[\S\s].*[\S\s]^`{3}$/mg;

const itemsInParasPattern = RegExp(`^(${escapePattern(complete)}|${escapePattern(incomplete)}).+$`, 'g');

const updateTaskListItem = function updateTaskListItem(source, itemIndex, checked) {
  const clean = source.replace(/\r/g, '')
    .replace(codeFencesPattern, '')
    .replace(itemsInParasPattern, '')
    .split('\n');
  let index = 0;
  const result = (function determineUTLIResult() {
    const ref = source.split('\n');
    const results = [];
    let line;
    for (let i = 0, len = ref.length; i < len; i += 1) {
      line = ref[i];
      if (indexOf.call(clean, line) >= 0 && line.match(itemPattern)) {
        index += 1;
        if (index === itemIndex) {
          if (checked) {
            line = line.replace(incompletePattern, complete);
          } else {
            line = line.replace(completePattern, incomplete);
          }
        }
      }
      results.push(line);
    }
    return results;
  }());
  return result.join('\n');
};

const updateTaskList = function updateTaskList(item) {
  const container = item.closest('.js-task-list-container');
  const field = container.find('.js-task-list-field');
  const index = 1 + container.find('.task-list-item-checkbox').index(item);
  const checked = item.prop('checked');
  const event = $.Event('tasklist:change');
  field.trigger(event, [index, checked]);
  if (!event.isDefaultPrevented()) {
    field.val(updateTaskListItem(field.val(), index, checked));
    field.trigger('change');
    return field.trigger('tasklist:changed', [index, checked]);
  }
  return null;
};

$(document).on('change', '.task-list-item-checkbox', function onChangeUpdateTaskList() {
  return updateTaskList($(this));
});

const enableTaskList = function enableTaskList(container) {
  if (container.find('.js-task-list-field').length > 0) {
    container.find('.task-list-item')
      .addClass('enabled')
      .find('.task-list-item-checkbox')
      .attr('disabled', null);
    return container.addClass('is-task-list-enabled').trigger('tasklist:enabled');
  }
  return null;
};

const enableTaskLists = function enableTaskLists(containers) {
  let container;
  const results = [];
  for (let i = 0, len = containers.length; i < len; i += 1) {
    container = containers[i];
    results.push(enableTaskList($(container)));
  }
  return results;
};

const disableTaskList = function disableTaskList(container) {
  container.find('.task-list-item')
    .removeClass('enabled')
    .find('.task-list-item-checkbox')
    .attr('disabled', 'disabled');
  return container.removeClass('is-task-list-enabled').trigger('tasklist:disabled');
};

const disableTaskLists = function disableTaskLists($containers) {
  let container;
  const results = [];
  for (let i = 0, len = $containers.length; i < len; i += 1) {
    container = $containers[i];
    results.push(disableTaskList($(container)));
  }
  return results;
};

$.fn.taskList = function taskList(method) {
  const container = $(this).closest('.js-task-list-container');
  const methods = {
    enable: enableTaskLists,
    disable: disableTaskLists,
  };
  return methods[method || 'enable'](container);
};
