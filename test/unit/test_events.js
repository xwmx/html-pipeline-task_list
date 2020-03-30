// ./test/unit/test_events.js

QUnit.module("TaskList events", {
  beforeEach: function() {
    this.container = $('<div>', {
      "class": 'js-task-list-container'
    });
    this.list = $('<ul>', {
      "class": 'task-list'
    });
    this.item = $('<li>', {
      "class": 'task-list-item'
    });
    this.checkbox = $('<input>', {
      type: 'checkbox',
      "class": 'task-list-item-checkbox',
      disabled: true,
      checked: false
    });
    this.field = $('<textarea>', {
      "class": 'js-task-list-field'
    }, "- [ ] text");
    this.item.append(this.checkbox);
    this.list.append(this.item);
    this.container.append(this.list);
    this.container.append(this.field);
    $('#qunit-fixture').append(this.container);
    return this.container.taskList();
  },
  afterEach: function() {
    $(document).off('tasklist:enabled');
    $(document).off('tasklist:disabled');
    $(document).off('tasklist:change');
    return $(document).off('tasklist:changed');
  }
});

QUnit.test("triggers a tasklist:change event before making task list item changes", function( assert ) {
  var done = assert.async();
  assert.expect(1);
  this.field.on('tasklist:change', function(event, index, checked) {
    return assert.ok(true);
  });
  setTimeout(function() {
    done();
  }, 20);
  return this.checkbox.click();
});

QUnit.test("triggers a tasklist:changed event once a task list item changes", function( assert ) {
  var done = assert.async();
  assert.expect(1);
  this.field.on('tasklist:changed', function(event, index, checked) {
    return assert.ok(true);
  });
  setTimeout(function() {
    done();
  }, 20);
  return this.checkbox.click();
});

QUnit.test("can cancel a tasklist:changed event", function( assert ) {
  var initial;
  var done = assert.async();
  assert.expect(2);
  this.field.on('tasklist:change', function(event, index, checked) {
    assert.ok(true);
    return event.preventDefault();
  });
  this.field.on('tasklist:changed', function(event, index, checked) {
    return assert.ok(false);
  });
  initial = this.checkbox.val();
  setTimeout((function(_this) {
    return function() {
      assert.equal(initial, _this.checkbox.val());
      done();
    };
  })(this), 20);
  return this.checkbox.click();
});

QUnit.test("enables task list items when a .js-task-list-field is present", function( assert ) {
  var done = assert.async();
  assert.expect(1);
  $(document).on('tasklist:enabled', function(event) {
    return assert.ok(true);
  });
  this.container.taskList();
  return setTimeout(function() {
    done();
  }, 20);
});

QUnit.test("doesn't enable task list items when a .js-task-list-field is absent", function( assert ) {
  var done = assert.async();
  assert.expect(0);
  $(document).on('tasklist:enabled', function(event) {
    return assert.ok(true);
  });
  this.field.remove();
  this.container.taskList();
  return setTimeout(function() {
    done();
  }, 20);
});
