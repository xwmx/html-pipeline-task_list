# frozen_string_literal: true

lib = File.expand_path('lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'html/pipeline/task_list/version'

Gem::Specification.new do |gem|
  gem.name          = 'html-pipeline-task_list'
  gem.version       = ::HTML::Pipeline::TaskList::VERSION
  gem.license       = 'MIT'
  gem.authors       = ['Codetree']
  gem.email         = ['support@codetree.com']
  gem.homepage      = 'https://github.com/codetree/html-pipeline-task_list'
  gem.summary       = 'An HTML::Pipeline filter for creating GitHub-flavored Markdown TaskLists'
  gem.description   = gem.summary

  gem.files = `git ls-files -z`.split("\x0").reject do |f|
    f =~ %r{^(test|script|gemfiles)/ }
  end

  gem.require_paths = ['lib']

  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})

  gem.add_dependency 'html-pipeline'

  gem.add_development_dependency 'bundler'
  gem.add_development_dependency 'commonmarker'
  gem.add_development_dependency 'guard'
  gem.add_development_dependency 'guard-minitest'
  gem.add_development_dependency 'guard-rubocop'
  gem.add_development_dependency 'guard-shell'
  gem.add_development_dependency 'json'
  gem.add_development_dependency 'minitest'
  gem.add_development_dependency 'rake'
  gem.add_development_dependency 'rubocop'
end
