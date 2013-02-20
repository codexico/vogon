require 'openid/store/filesystem'
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, '7mrbMlJQH1oIHLHujxbWNA', '54dmAAPT4Pt0MxSOlbxvddD5rH5cJ7H5OcbIKBg2Ig'
  provider :facebook, 'b6a1310d1c772f66df70bf88f4b2ad6f', '2bbf01b40ec9dfce4146df684ee88a3b'
  provider :open_id, OpenID::Store::Filesystem.new('/tmp')
  provider :open_id, OpenID::Store::Filesystem.new('/tmp'), :name => 'google', :identifier => 'https://www.google.com/accounts/o8/id'
  provider :open_id, OpenID::Store::Filesystem.new('/tmp'), :name => "yahoo", :identifier => "https://me.yahoo.com"
end
