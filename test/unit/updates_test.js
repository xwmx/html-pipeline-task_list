// ./test/unit/test_updates.js

QUnit.module("TaskList updates", {
  beforeEach: function() {
    this.container = $('<div>', {
      "class": 'js-task-list-container'
    });
    this.list = $('<ul>', {
      "class": 'task-list'
    });
    this.completeItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.completeCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: true
    });
    this.incompleteItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.incompleteCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: false
    });
    this.nbsp = String.fromCharCode(160);
    this.incompleteNBSPItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.incompleteNBSPCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: false
    });
    this.blockquote = $('<blockquote>');
    this.quotedList = $('<ul>', {
      "class": 'task-list'
    });
    this.quotedCompleteItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.quotedCompleteCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: true
    });
    this.quotedIncompleteItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.quotedIncompleteCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: false
    });
    this.innerBlockquote = $('<blockquote>');
    this.innerList = $('<ul>', {
      "class": 'task-list'
    });
    this.innerCompleteItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.innerCompleteCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: true
    });
    this.innerIncompleteItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.innerIncompleteCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: false
    });
    this.orderedList = $('<ol>', {
      "class": 'task-list'
    });
    this.orderedCompleteItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.orderedCompleteCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: true
    });
    this.orderedIncompleteItem = $('<li>', {
      "class": 'task-list-item'
    });
    this.orderedIncompleteCheckbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: false
    });
    this.field = $('<textarea>', {
      "class": 'js-task-list-field',
      text: "- [x] complete\n- [ ] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [x] quoted complete\n> - [ ] quoted incomplete\n>> - [x] inner complete\n> > - [ ] inner incomplete\n> 0. [x] ordered complete\n> 0. [ ] ordered incomplete"
    });
    this.changes = {
      toComplete: "- [ ] complete\n- [ ] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [x] quoted complete\n> - [ ] quoted incomplete\n>> - [x] inner complete\n> > - [ ] inner incomplete\n> 0. [x] ordered complete\n> 0. [ ] ordered incomplete",
      toQuotedComplete: "- [x] complete\n- [ ] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [ ] quoted complete\n> - [ ] quoted incomplete\n>> - [x] inner complete\n> > - [ ] inner incomplete\n> 0. [x] ordered complete\n> 0. [ ] ordered incomplete",
      toInnerComplete: "- [x] complete\n- [ ] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [x] quoted complete\n> - [ ] quoted incomplete\n>> - [ ] inner complete\n> > - [ ] inner incomplete\n> 0. [x] ordered complete\n> 0. [ ] ordered incomplete",
      toOrderedComplete: "- [x] complete\n- [ ] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [x] quoted complete\n> - [ ] quoted incomplete\n>> - [x] inner complete\n> > - [ ] inner incomplete\n> 0. [ ] ordered complete\n> 0. [ ] ordered incomplete",
      toIncomplete: "- [x] complete\n- [x] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [x] quoted complete\n> - [ ] quoted incomplete\n>> - [x] inner complete\n> > - [ ] inner incomplete\n> 0. [x] ordered complete\n> 0. [ ] ordered incomplete",
      toQuotedIncomplete: "- [x] complete\n- [ ] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [x] quoted complete\n> - [x] quoted incomplete\n>> - [x] inner complete\n> > - [ ] inner incomplete\n> 0. [x] ordered complete\n> 0. [ ] ordered incomplete",
      toInnerIncomplete: "- [x] complete\n- [ ] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [x] quoted complete\n> - [ ] quoted incomplete\n>> - [x] inner complete\n> > - [x] inner incomplete\n> 0. [x] ordered complete\n> 0. [ ] ordered incomplete",
      toOrderedIncomplete: "- [x] complete\n- [ ] incomplete\n- [" + this.nbsp + "] incompleteNBSP\n> - [x] quoted complete\n> - [ ] quoted incomplete\n>> - [x] inner complete\n> > - [ ] inner incomplete\n> 0. [x] ordered complete\n> 0. [x] ordered incomplete",
      toIncompleteNBSP: "- [x] complete\n- [ ] incomplete\n- [x] incompleteNBSP\n> - [x] quoted complete\n> - [ ] quoted incomplete\n>> - [x] inner complete\n> > - [ ] inner incomplete\n> 0. [x] ordered complete\n> 0. [ ] ordered incomplete"
    };
    this.completeItem.append(this.completeCheckbox);
    this.list.append(this.completeItem);
    this.completeItem.expectedIndex = 1;
    this.incompleteItem.append(this.incompleteCheckbox);
    this.list.append(this.incompleteItem);
    this.incompleteItem.expectedIndex = 2;
    this.incompleteNBSPItem.append(this.incompleteNBSPCheckbox);
    this.list.append(this.incompleteNBSPItem);
    this.incompleteNBSPItem.expectedIndex = 3;
    this.container.append(this.list);
    this.container.append(this.field);
    this.quotedCompleteItem.append(this.quotedCompleteCheckbox);
    this.quotedList.append(this.quotedCompleteItem);
    this.quotedCompleteItem.expectedIndex = 4;
    this.quotedIncompleteItem.append(this.quotedIncompleteCheckbox);
    this.quotedList.append(this.quotedIncompleteItem);
    this.quotedIncompleteItem.expectedIndex = 5;
    this.blockquote.append(this.quotedList);
    this.innerCompleteItem.append(this.innerCompleteCheckbox);
    this.innerList.append(this.innerCompleteItem);
    this.innerCompleteItem.expectedIndex = 6;
    this.innerIncompleteItem.append(this.innerIncompleteCheckbox);
    this.innerList.append(this.innerIncompleteItem);
    this.innerIncompleteItem.expectedIndex = 7;
    this.innerBlockquote.append(this.innerList);
    this.innerBlockquote.append(this.innerField);
    this.blockquote.append(this.innerBlockquote);
    this.container.append(this.blockquote);
    this.orderedCompleteItem.append(this.orderedCompleteCheckbox);
    this.orderedList.append(this.orderedCompleteItem);
    this.orderedCompleteItem.expectedIndex = 8;
    this.orderedIncompleteItem.append(this.orderedIncompleteCheckbox);
    this.orderedList.append(this.orderedIncompleteItem);
    this.orderedIncompleteItem.expectedIndex = 9;
    this.container.append(this.orderedList);
    this.blockquote.append(this.field);
    $('#qunit-fixture').append(this.container);
    return this.container.taskList();
  },
  afterEach: function() {
    return $(document).off('tasklist:changed');
  }
});

QUnit.test("updates the source, marking the incomplete item as complete", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(checked);
      assert.equal(index, _this.incompleteItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toIncomplete);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.incompleteCheckbox.click();
});

QUnit.test("updates the source, marking the complete item as incomplete", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(!checked);
      assert.equal(index, _this.completeItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toComplete);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.completeCheckbox.click();
});

QUnit.test("updates the source for items with non-breaking spaces", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(checked);
      assert.equal(index, _this.incompleteNBSPItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toIncompleteNBSP);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.incompleteNBSPCheckbox.click();
});

QUnit.test("updates the source of a quoted item, marking the incomplete item as complete", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(checked);
      assert.equal(index, _this.quotedIncompleteItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toQuotedIncomplete);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.quotedIncompleteCheckbox.click();
});

QUnit.test("updates the source of a quoted item, marking the complete item as incomplete", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(!checked);
      assert.equal(index, _this.quotedCompleteItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toQuotedComplete);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.quotedCompleteCheckbox.click();
});

QUnit.test("updates the source of a quoted quoted item, marking the incomplete item as complete", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(checked);
      assert.equal(index, _this.innerIncompleteItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toInnerIncomplete);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.innerIncompleteCheckbox.click();
});

QUnit.test("updates the source of a quoted quoted item, marking the complete item as incomplete", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(!checked);
      assert.equal(index, _this.innerCompleteItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toInnerComplete);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.innerCompleteCheckbox.click();
});

QUnit.test("updates the source of an ordered list item, marking the incomplete item as complete", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(checked);
      assert.equal(index, _this.orderedIncompleteItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toOrderedIncomplete);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.orderedIncompleteCheckbox.click();
});

QUnit.test("updates the source of an ordered list item, marking the complete item as incomplete", function( assert ) {
  var done = assert.async();
  assert.expect(3);
  this.field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(!checked);
      assert.equal(index, _this.orderedCompleteItem.expectedIndex);
      return assert.equal(_this.field.val(), _this.changes.toOrderedComplete);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return this.orderedCompleteCheckbox.click();
});

QUnit.test("update ignores items that look like Task List items but lack list prefix", function( assert ) {
  var done = assert.async();
  var changes, container, field, item1, item1Checkbox, item2, item2Checkbox, list;
  assert.expect(3);
  $('#qunit-fixture').empty();
  container = $('<div>', {
    "class": 'js-task-list-container'
  });
  list = $('<ul>', {
    "class": 'task-list'
  });
  item1 = $('<li>', {
    "class": 'task-list-item'
  });
  item1Checkbox = $('<input>', {
    type: 'checkbox',
    "class": 'task-list-item-checkbox',
    disabled: true,
    checked: false
  });
  item2 = $('<li>', {
    "class": 'task-list-item'
  });
  item2Checkbox = $('<input>', {
    type: 'checkbox',
    "class": 'task-list-item-checkbox',
    disabled: true,
    checked: false
  });
  field = $('<textarea>', {
    "class": 'js-task-list-field',
    text: "[ ] one\n[ ] two\n- [ ] three\n- [ ] four"
  });
  changes = "[ ] one\n[ ] two\n- [ ] three\n- [x] four";
  item1.append(item1Checkbox);
  list.append(item1);
  item1.expectedIndex = 1;
  item2.append(item2Checkbox);
  list.append(item2);
  item2.expectedIndex = 2;
  container.append(list);
  container.append(field);
  $('#qunit-fixture').append(container);
  container.taskList();
  field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(checked);
      assert.equal(index, item2.expectedIndex);
      return assert.equal(field.val(), changes);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return item2Checkbox.click();
});

QUnit.test("update ignores items that look like Task List items but are links", function( assert ) {
  var done = assert.async();
  var changes, container, field, item1, item1Checkbox, item2, item2Checkbox, list;
  assert.expect(3);
  $('#qunit-fixture').empty();
  container = $('<div>', {
    "class": 'js-task-list-container'
  });
  list = $('<ul>', {
    "class": 'task-list'
  });
  item1 = $('<li>', {
    "class": 'task-list-item'
  });
  item1Checkbox = $('<input>', {
    type: 'checkbox',
    "class": 'task-list-item-checkbox',
    disabled: true,
    checked: false
  });
  item2 = $('<li>', {
    "class": 'task-list-item'
  });
  item2Checkbox = $('<input>', {
    type: 'checkbox',
    "class": 'task-list-item-checkbox',
    disabled: true,
    checked: false
  });
  field = $('<textarea>', {
    "class": 'js-task-list-field',
    text: "- [ ] (link)\n- [ ] [reference]\n- [ ] () collapsed\n- [ ] [] collapsed reference\n- [ ] \\(escaped item)\n- [ ] item"
  });
  changes = "- [ ] (link)\n- [ ] [reference]\n- [ ] () collapsed\n- [ ] [] collapsed reference\n- [ ] \\(escaped item)\n- [x] item";
  item1.append(item1Checkbox);
  list.append(item1);
  item1.expectedIndex = 1;
  item2.append(item2Checkbox);
  list.append(item2);
  item2.expectedIndex = 2;
  container.append(list);
  container.append(field);
  $('#qunit-fixture').append(container);
  container.taskList();
  field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(checked);
      assert.equal(index, item2.expectedIndex);
      return assert.equal(field.val(), changes);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return item2Checkbox.click();
});

QUnit.test("updates items followed by links", function( assert ) {
  var done = assert.async();
  var changes, container, field, item1, item1Checkbox, item2, item2Checkbox, list;
  assert.expect(3);
  $('#qunit-fixture').empty();
  container = $('<div>', {
    "class": 'js-task-list-container'
  });
  list = $('<ul>', {
    "class": 'task-list'
  });
  item1 = $('<li>', {
    "class": 'task-list-item'
  });
  item1Checkbox = $('<input>', {
    type: 'checkbox',
    "class": 'task-list-item-checkbox',
    disabled: true,
    checked: false
  });
  item2 = $('<li>', {
    "class": 'task-list-item'
  });
  item2Checkbox = $('<input>', {
    type: 'checkbox',
    "class": 'task-list-item-checkbox',
    disabled: true,
    checked: false
  });
  field = $('<textarea>', {
    "class": 'js-task-list-field',
    text: "- [ ] [link label](link)\n- [ ] [reference label][reference]"
  });
  changes = "- [ ] [link label](link)\n- [x] [reference label][reference]";
  item1.append(item1Checkbox);
  list.append(item1);
  item1.expectedIndex = 1;
  item2.append(item2Checkbox);
  list.append(item2);
  item2.expectedIndex = 2;
  container.append(list);
  container.append(field);
  $('#qunit-fixture').append(container);
  container.taskList();
  field.on('tasklist:changed', (function(_this) {
    return function(event, index, checked) {
      assert.ok(checked);
      assert.equal(index, item2.expectedIndex);
      return assert.equal(field.val(), changes);
    };
  })(this));
  setTimeout(function() {
    done();
  }, 20);
  return item2Checkbox.click();
});
