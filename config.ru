# Rack environment for testing purposes

require 'json'

map '/update' do
  run lambda { |env|
    sleep 0.5
    req = Rack::Request.new(env)
    [200, { 'Content-Type' => 'application/json' }, [req.params.to_json]]
  }
end


base_path = File.expand_path('test', __dir__)
puts base_path

map '/test' do
  run Rack::Directory.new(base_path)
end


