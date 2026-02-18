require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name         = "LinkIOReactNative"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/pt-nakul-sharma/LinkIO-React-Native.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"

  # LinkIO iOS SDK from GitHub
  # Users need to add to their Podfile:
  # pod 'LinkIO', :git => 'https://github.com/pt-nakul-sharma/LinkIO-iOS.git', :tag => '1.0.0'
end
