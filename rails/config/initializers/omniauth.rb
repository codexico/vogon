Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, '7mrbMlJQH1oIHLHujxbWNA', '54dmAAPT4Pt0MxSOlbxvddD5rH5cJ7H5OcbIKBg2Ig'
  provider :facebook, 'b6a1310d1c772f66df70bf88f4b2ad6f', '2bbf01b40ec9dfce4146df684ee88a3b'
end
