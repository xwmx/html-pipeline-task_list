require 'html/pipeline'

class HTML::Pipeline::TaskList
  # Provides a summary of provided TaskList `items`.
  #
  # `items` is an Array of TaskList::Item objects.
  Summary = Struct.new(:items) do
    # Public: returns true if there are any TaskList::Item objects.
    def items?
      item_count.positive?
    end

    # Public: returns the number of TaskList::Item objects.
    def item_count
      items.size
    end

    # Public: returns the number of complete TaskList::Item objects.
    def complete_count
      items.select(&:complete?).size
    end

    # Public: returns the number of incomplete TaskList::Item objects.
    def incomplete_count
      items.reject(&:complete?).size
    end
  end
end
