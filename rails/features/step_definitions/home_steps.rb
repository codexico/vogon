Dado /^que estou na pagina inicial$/ do
  visit '/'
end

Dado /^preencho o campo "([^"]*)" com "([^"]*)"$/ do |campo, valor|
  fill_in(campo, :with => valor)
end

Dado /^aperto o botao "([^"]*)"$/ do |botao|
  click_button(botao)
end

Dado /^clico em "([^"]*)"$/ do |link|  
  click_link(link)
end

Dado /^clico no elemento "([^"]*)"$/ do |selector|  
  find(selector).click
end

Entao /^eu deveria ver "([^"]*)"$/ do |texto|
  page.should have_content(texto)
end


