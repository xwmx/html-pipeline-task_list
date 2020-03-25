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

  gem.add_dependency 'html-pipeline'

  gem.add_development_dependency 'coffee-script'
  gem.add_development_dependency 'commonmarker'
  gem.add_development_dependency 'github-markdown'
  gem.add_development_dependency 'json'
  gem.add_development_dependency 'minitest', '~> 5.3.2'
  gem.add_development_dependency 'rack'
  gem.add_development_dependency 'rake'
  gem.add_development_dependency 'rubocop'
  gem.add_development_dependency 'sprockets'
end
