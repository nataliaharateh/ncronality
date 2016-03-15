from lxml import html
import os, sys, requests

person = {'name': sys.argv[1], 'surname': sys.argv[2]}

page = requests.get('http://ncredinburgh.com/people/' + person['name'] + '-' + person['surname'])
tree = html.fromstring(page.content)

name = tree.xpath('//div[@class="small-padding"]/h1/text()')
bio = tree.xpath('//div[@class="small-padding"]/p/text()')

# Remove existing tweets
if os.path.exists("bio.txt"):
    os.remove("bio.txt")

fo = open("bio.txt", 'wb')
for line in bio:
  fo.write("%s\n" % line.encode('utf-8'))
fo.close()