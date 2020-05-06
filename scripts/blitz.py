from bs4 import BeautifulSoup
import requests
import urllib.request
import os
ASSETS_FOLDER = "../src/assets/images/set3/"
LINK = "https://blitz.gg/tft/items"
TABLE = "new-item-table"


def download_image(name, url):
  with open(ASSETS_FOLDER + name, 'wb') as handler:
    handler.write(requests.get(url).content)


def write_text(name, contents):
  with open(ASSETS_FOLDER + name, 'w') as handler:
    handler.write(contents)


def get_rows():
  return soup.find_all("div", class_='styles__GridRow-sc-1rypup0-7')


# make request
request = requests.get(LINK).text
soup = BeautifulSoup(request, "html.parser")

# get rows and skip the first one
soup_html_rows = get_rows()[1:]

# process remaining rows
for row_num, row in enumerate(soup_html_rows, start=1):
  for col_num, cell in enumerate(row.contents):
    image_url = cell.img.attrs['src']
    download_image("{}-{}.png".format(col_num, row_num), image_url)
    if col_num != 0:
      tool_tip_html = cell.img.attrs['data-tip']
      tool_tip_text = BeautifulSoup(cell.img.attrs['data-tip'], "html.parser").text
      write_text("{}-{}.txt".format(col_num, row_num), tool_tip_text)
