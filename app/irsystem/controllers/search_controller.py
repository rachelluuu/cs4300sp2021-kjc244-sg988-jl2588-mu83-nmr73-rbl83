from . import *  
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
import requests

project_name = "Playground"
net_id = "Michael Noor: mn598\nJoy Chen: jhc287\nJyne Dunbar: jcd322\nRachel Lu: rbl83\nVladia Trinh: vt95"


@irsystem.route('/testjson')
def testjson():
  my_dictionary = {'name': 'test1'}
  return my_dictionary

@irsystem.route('/', methods=['GET'])
def search():
  return render_template('index.html')


#returns list of first 100 songs from genius api for each location
def songs_at_loc(loc1, loc2):
  loc1 = loc1.replace(" ", "%20")
  loc2 = loc2.replace(" ", "%20")
  songs1 = []
  songs2 = []
  for i in range(1, 11):
    response1 = requests.get("https://api.genius.com/search?q=" + loc1 + "&page=" + str(i) + "&access_token=9NTODlkpDaz4ehLNvb14u5Jv7asQuGjyvzZD4X5O8VC5kxtwh2vbkz0uuOmviuC_")
    songs1 += response1.json()['response']['hits']
    response2 = requests.get("https://api.genius.com/search?q=" + loc2 + "&page=" + str(i) + "&access_token=9NTODlkpDaz4ehLNvb14u5Jv7asQuGjyvzZD4X5O8VC5kxtwh2vbkz0uuOmviuC_")
    songs2 += response2.json()['response']['hits']
        
  songsall = []
  for s in songs1:
    songsall.append(s['result'])
  for s in songs2:
    songsall.append(s['result'])
  return songsall

