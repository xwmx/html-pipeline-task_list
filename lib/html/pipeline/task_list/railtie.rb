# frozen_string_literal: true

module HTML
  class Pipeline
    # utilized to integrate into rails asset pipeline
    class TaskList
      class << self
        def root_path
          @root_path ||= Pathname.new(File.expand_path('../..', __dir__))
        end

        def asset_paths
          @asset_paths ||= Dir[root_path.join('app/assets/*')]
        end
      end

      if defined? ::Rails::Railtie
        # If the Rails asset pipeline exists, incorporate into
        # asset pipeline
        class Railtie < ::Rails::Railtie
          initializer 'task_list' do |app|
            TaskList.asset_paths.each do |path|
              app.config.assets.paths << path
            end
          end
        end
      end
    end
  end
end
