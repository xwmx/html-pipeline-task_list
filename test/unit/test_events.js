// ./test/unit/test_events.js

(function() {
    module("TaskList events", {
      setup: function() {
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
      teardown: function() {
        $(document).off('tasklist:enabled');
        $(document).off('tasklist:disabled');
        $(document).off('tasklist:change');
        return $(document).off('tasklist:changed');
      }
    });
  
    asyncTest("triggers a tasklist:change event before making task list item changes", function() {
      expect(1);
      this.field.on('tasklist:change', function(event, index, checked) {
        return ok(true);
      });
      setTimeout(function() {
        return start();
      }, 20);
      return this.checkbox.click();
    });
  
    asyncTest("triggers a tasklist:changed event once a task list item changes", function() {
      expect(1);
      this.field.on('tasklist:changed', function(event, index, checked) {
        return ok(true);
      });
      setTimeout(function() {
        return start();
      }, 20);
      return this.checkbox.click();
    });
  
    asyncTest("can cancel a tasklist:changed event", function() {
      var before;
      expect(2);
      this.field.on('tasklist:change', function(event, index, checked) {
        ok(true);
        return event.preventDefault();
      });
      this.field.on('tasklist:changed', function(event, index, checked) {
        return ok(false);
      });
      before = this.checkbox.val();
      setTimeout((function(_this) {
        return function() {
          equal(before, _this.checkbox.val());
          return start();
        };
      })(this), 20);
      return this.checkbox.click();
    });
  
    asyncTest("enables task list items when a .js-task-list-field is present", function() {
      expect(1);
      $(document).on('tasklist:enabled', function(event) {
        return ok(true);
      });
      this.container.taskList();
      return setTimeout(function() {
        return start();
      }, 20);
    });
  
    asyncTest("doesn't enable task list items when a .js-task-list-field is absent", function() {
      expect(0);
      $(document).on('tasklist:enabled', function(event) {
        return ok(true);
      });
      this.field.remove();
      this.container.taskList();
      return setTimeout(function() {
        return start();
      }, 20);
    });
  
  }).call(this);
  