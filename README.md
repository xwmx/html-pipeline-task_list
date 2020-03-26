# Task Lists

This Gem provides various components necessary for integrating
[Task Lists](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
into your GitHub-flavored-Markdown user content.

`HTML::Pipeline::TaskList` is a successor to [TaskList](https://github.com/github/task_list) which GitHub stopped supporting and updating in 2016.  This gem updates key components to support changes to underlying gems.

## Components

The Task List feature is made of several different components:

* GitHub-flavored-Markdown Ruby Filter
* Summary Ruby Model: summarizes task list items
* JavaScript: frontend task list update behavior
* CSS: styles Markdown task list items

## Usage & Integration

The backend components are designed for rendering the Task List item checkboxes, and the frontend components handle updating the Markdown source (embedded in the markup).

### Backend: Markdown pipeline filter

Rendering Task List item checkboxes from source Markdown depends on the `HTML::Pipeline::TaskList::Filter`, designed to integrate with the [`html-pipeline`](https://github.com/jch/html-pipeline) gem. For example:

``` ruby
require 'html/pipeline'
require 'html/pipeline/task_list/filter'

pipeline = HTML::Pipeline.new [
  HTML::Pipeline::MarkdownFilter,
  HTML::Pipeline::TaskList::Filter
]

pipeline.call "- [ ] task list item"
```

### Frontend: Markdown Updates

Task List updates on the frontend require specific HTML markup structure, and must be enabled with JavaScript.

Rendered HTML (the `<ul>` element below) should be contained in a `js-task-list-container` container element and include a sibling `textarea.js-task-list-field` element that is updated when checkboxes are changed.

``` markdown
- [ ] text
```

``` html
<div class="js-task-list-container">
  <ul class="task-list">
    <li class="task-list-item">
      <input type="checkbox" class="js-task-list-item-checkbox" disabled />
      text
    </li>
  </ul>
  <form>
    <textarea class="js-task-list-field">- [ ] text</textarea>
  </form>
</div>
```

Enable Task List updates with:

``` javascript
$('.js-task-list-container').taskList('enable')
```

NOTE: Updates are not persisted to the server automatically. Persistence is the responsibility of the integrating application, accomplished by hooking into the `tasklist:change` JavaScript event. For instance, we use AJAX to submit a hidden form on update.

Read through the documented behaviors and samples [in the source][frontend_behaviors] for more detail, including documented events.

[frontend_behaviors]: https://github.com/github/task_list/blob/master/app/assets/javascripts/task_list.coffee

## Installation

### Backend: RubyGem

For the backend Ruby components, add this line to your application's Gemfile:

    gem 'html-pipeline-task_list'

And then execute:

    $ bundle

## Testing and Development

Ruby unit tests can be run with `rake test`.

Functional tests are useful for manual testing in the browser. To run, install
the necessary components with `script/bootstrap` then run the server:

```
rackup -p 4011
```

Navigate to http://localhost:4011/test/functional/test_task_lists_behavior.html

## Contributing

Read the [Contributing Guidelines](CONTRIBUTING.md) and open a Pull Request!
