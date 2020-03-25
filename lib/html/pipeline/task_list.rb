require 'html/pipeline/task_list/summary'

class HTML::Pipeline::TaskList
  attr_reader :record

  # `record` is the resource with the Markdown source text with task list items
  # following this syntax:
  #
  #   - [ ] a task list item
  #   - [ ] another item
  #   - [x] a completed item
  #
  def initialize(record)
    @record = record
  end

  # Public: return the TaskList::Summary for this task list.
  #
  # Returns a TaskList::Summary.
  def summary
    @summary ||= HTML::Pipeline::TaskList::Summary.new(record.task_list_items)
  end

  Item = Struct.new(:checkbox_text, :source) do
    COMPLETE = /\[[xX]\]/.freeze # see TaskList::Filter

    # Public: Check if a task list is complete.
    #
    # Examples
    #
    #   Item.new(checkbox_text: "- [x]").complete?
    #   # => true
    #
    #   Item.new(checkbox_text: "- [ ]").complete?
    #   # => false
    #
    # Returns true for checked list, false otherwise
    def complete?
      checkbox_text =~ COMPLETE
    end
  end
end
