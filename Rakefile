require 'rake'
require 'rake/packagetask'

ACTIVE_SUPPORT_ROOT     = File.expand_path(File.dirname(__FILE__))
ACTIVE_SUPPORT_SRC_DIR  = File.join(ACTIVE_SUPPORT_ROOT, 'src')
ACTIVE_SUPPORT_DIST_DIR = File.join(ACTIVE_SUPPORT_ROOT, 'dist')
ACTIVE_SUPPORT_VERSION  = '0.1'

task :default => [:dist, :package, :clean_package_source]

task :dist do
  $:.unshift File.join(ACTIVE_SUPPORT_ROOT, 'lib')
  require 'protodoc'
  
  Dir.chdir(ACTIVE_SUPPORT_SRC_DIR) do
    File.open(File.join(ACTIVE_SUPPORT_DIST_DIR, 'active_support.js'), 'w+') do |dist|
      dist << Protodoc::Preprocessor.new('active_support.js')
    end
  end
end

Rake::PackageTask.new('active_support', ACTIVE_SUPPORT_VERSION) do |package|
  package.need_tar_gz = true
  package.package_dir = ACTIVE_SUPPORT_DIST_DIR
  package.package_files.include(
    '[A-Z]*',
    'dist/active_support.js',
    'lib/**',
    'src/**'
  )
end
task :clean_package_source do
  rm_rf File.join(ACTIVE_SUPPORT_DIST_DIR, "prototype-#{ACTIVE_SUPPORT_VERSION}")
end
