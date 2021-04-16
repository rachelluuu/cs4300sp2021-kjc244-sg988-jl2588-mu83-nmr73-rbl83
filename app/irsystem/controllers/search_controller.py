from . import *  
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
import requests
import json

project_name = "Playground"
net_id = "Michael Noor: mn598\nJoy Chen: jhc287\nJyne Dunbar: jcd322\nRachel Lu: rbl83\nVladia Trinh: vt95"

@irsystem.route('/', methods=['GET'])
def render():
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

def get_lyrics(track, artist):
    track = track.replace(" ", "%20")
    artist = artist.replace(" ", "%20")
    authorization_code = "c26318b7fe659daaf8b468523a4196e7"
    link = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_track="+track+"&q_artist="+artist+"&apikey="+authorization_code
    response = requests.get(link)
    try:
        return response.json()['message']['body']['lyrics']['lyrics_body'].split("...")[0]
    except:
        return None

def naive_tokenizer(str_in):
    str_in = str_in.lower()
    for token in ['\n', '-', '-', "–", '!', '.', ',', '(', ')']:
        str_in = str_in.replace(token, " ")
    return str_in.split()

def string_to_dict(str_in, tokenizer=naive_tokenizer):
    if str_in is None:
        return {"Total Words":0}
    ans = dict()
    i = -1
    for i, word in enumerate(tokenizer(str_in)):
        if word not in ans:
            ans[word] = 0
        ans[word] += 1
    ans["Total Words"] = i + 1
    return ans

def sim_score(user_input, lyrics, user_dict=None, lyrics_dict=None, tokenizer=naive_tokenizer):
    # lyrics is a string of the song, the untokenized outpyt from get_lyrics
    # userinput is whatever unprocessed string the user sent us
    
    # TODO: Some things I would eventually like to do:
    # 1. Use word embeddings to calculate similarities instead of strings
    # 2. Use nltk to strip stopwords (modified for songs; e.x. ooh, oh, yeah, yuh, ah, mm, hmm, hey)
    if user_dict is None:
        user_dict = string_to_dict(user_input)
    if lyrics_dict is None:
        lyrics_dict = string_to_dict(lyrics)
    if user_dict["Total Words"] == 0 or lyrics_dict["Total Words"] == 0:
        return 0
    sim = -1 * user_dict["Total Words"] * lyrics_dict["Total Words"]
    for word in user_dict:
        if word in lyrics_dict:
            sim += user_dict[word] * lyrics_dict[word]
    return sim / (user_dict["Total Words"] * lyrics_dict["Total Words"])

# returns a ranked playlist of songs given a origin, destination, and vibe 
def get_playlist(origin, destination, vibe):
  songs_by_location = songs_at_loc(origin,destination)
  print(songs_by_location)
  song_lyrics = [(song, get_lyrics(song["title"], song["primary_artist"]["name"])) for song in songs_by_location]
  song_scores = sorted([(song, sim_score(vibe, lyric)) for (song,lyric) in song_lyrics], key=lambda x:x[1])
  return [song for (song,_) in song_scores]
  
# the search route that takes in origin, destination, and vibe and outputs a playlist
@irsystem.route('/search')
def search():
	error_msg = ""
	origin = request.args.get('origin')
	destination = request.args.get('destination')
	vibe = request.args.get('vibe')

	if not origin or not destination or not vibe:
		error_msg = 'Make sure to put in an orgin, destination, and vibe'

	playlist = get_playlist(origin, destination, vibe)
  
	return {'error': error_msg, 'playlist': playlist}
