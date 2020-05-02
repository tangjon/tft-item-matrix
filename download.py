from bs4 import BeautifulSoup
import requests
import urllib.request


def download_image(name, url):
  with open(ASSETS_FOLDER + name, 'wb') as handler:
    handler.write(requests.get(url).content)
  print("DONE!")


ASSETS_FOLDER = "src/assets/images/set3/"
link = "https://lolchess.gg/items"
table = "new-item-table"

request = requests.get(link).text
soup = BeautifulSoup(request, "html.parser")

soup_html_rows = [row for row in soup.find(id=table).contents if row != '\n']

first_row, rem_rows = soup_html_rows[0], soup_html_rows[1:]

# process first row
for i, cell in enumerate(first_row.find_all('img'), start=1):
  image_url = "http://" + cell.attrs['src'].lstrip('//').strip("'")
  download_image("{}-0.png".format(i), image_url)

# process remaining rows
for i, row in enumerate(rem_rows, start=1):
  for j, cell in enumerate(row.find_all('img')):
    image_url = "http://" + cell.attrs['src'].lstrip('//').strip("'")
    download_image("{}-{}.png".format(j,i), image_url)
