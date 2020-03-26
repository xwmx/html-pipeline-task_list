module HTML
  class Pipeline
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
