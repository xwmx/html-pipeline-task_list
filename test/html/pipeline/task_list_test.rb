require File.expand_path('../../../test_helper', __FILE__)

class TaskListTest < Minitest::Test
  class Record < Struct.new(:body)
    def task_list_items
      []
    end
  end

  def test_has_summary
    assert summary = task_list("- [ ] one").summary, "summary expected"
    assert_kind_of HTML::Pipeline::TaskList::Summary, summary
  end

  def test_complete_item
    item = HTML::Pipeline::TaskList::Item.new("[x]", "complete")
    assert item.complete?, "expected to be complete"
  end

  def test_incomplete_item
    item = HTML::Pipeline::TaskList::Item.new("[ ]", "incomplete")
    assert !item.complete?, "expected to be incomplete"
  end

  protected

  def task_list(text)
    HTML::Pipeline::TaskList.new(Record.new(text))
  end
end
