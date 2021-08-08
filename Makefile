SHELL := /bin/bash
CWD := $(shell pwd)
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

# new base-al2 build components
VERSION_FILE := "lib/html/pipeline/task_list/version.rb"
RUBY_VER := $(shell cat .ruby-version)
GEM_VER := $(shell grep -e "VERSION" $(VERSION_FILE) | cut -d "'" -f2)
GEM_NAME := $(shell echo "$(CWD)" | sed 's!.*/!!')

test: setup
	@bundle exec rake test
	@npm test
	@npm run lint

.check-gem-ver:
ifneq ($(shell gem query $(GEM_NAME) -r -a | grep -F $(GEM_VER)),)
	@echo ""
	@echo "Version $(GEM_VER) has already been published."
	@echo "Update '$(VERSION_FILE)' if you wish to continue."
	@echo ""
	@exit 1
endif

.check-branch:
ifneq ($(BRANCH),main)
	@echo ""
	@echo "currently in $(BRANCH) branch. move to main."
	@echo ""
	@exit 1
endif

push-gem: .check-gem-ver .check-branch
	git tag -a "v$(GEM_VER)" -m "creating v$(GEM_VER)"
	git push --tags

print-vars:
	@echo "gem name: $(GEM_NAME)"
	@echo "gem version: $(GEM_VER)"
	@echo "ruby version: $(RUBY_VER)"
	@echo "git branch: $(BRANCH)"

setup:
	bundle install
	npm install
