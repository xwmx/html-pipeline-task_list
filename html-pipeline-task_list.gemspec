lib = File.expand_path('lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'html/pipeline/task_list/version'

Gem::Specification.new do |gem|
  gem.name          = 'html-pipeline-task_list'
  gem.version       = TaskList::VERSION
  gem.authors       = ['Codetree']
  gem.email         = ['support@codetree.com']
  gem.description   = 'GitHub-flavored-Markdown TaskList components'
  gem.summary       = 'GitHub-flavored-Markdown TaskList components'

  gem.files         = `git ls-files`.split($INPUT_RECORD_SEPARATOR)
  gem.executables   = gem.files.grep(%r{^bin/}).map { |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ['lib']

  gem.add_dependency 'html-pipeline', '~> 2.12'

  gem.add_development_dependency 'coffee-script', '~> 2.4'
  gem.add_development_dependency 'commonmarker', '~> 0.21.0'
  gem.add_development_dependency 'github-markdown', '~> 0.6.9'
  gem.add_development_dependency 'json', '~> 2.3'
  gem.add_development_dependency 'minitest', '~> 5.14'
  gem.add_development_dependency 'rack', '~> 2.2'
  gem.add_development_dependency 'rake', '~> 13.0'
  gem.add_development_dependency 'rubocop', '~> 0.80.1'
  gem.add_development_dependency 'sprockets', '~> 4.0'
end
