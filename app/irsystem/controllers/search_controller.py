from . import *  
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
import requests
import json
import numpy as np

project_name = "Playground"
net_id = "Michael Noor: mn598\nJoy Chen: jhc287\nJyne Dunbar: jcd322\nRachel Lu: rbl83\nVladia Trinh: vt95"

@irsystem.route('/', methods=['GET'])
def render():
  return render_template('index.html')

def songs_at_loc(loc1, loc2):
    loc1 = loc1.replace(" ", "%20")
    loc2 = loc2.replace(" ", "%20")
    songs1 = []
    songs2 = []
    for i in range(1, 4):
        response1 = requests.get("https://genius.com/api/search/lyrics?q=" + loc1 + "&page=" + str(i))
        songs1 += response1.json()['response']['sections'][0]['hits']
        response2 = requests.get("https://genius.com/api/search/lyrics?q=" + loc2 + "&page=" + str(i))
        songs2 += response2.json()['response']['sections'][0]['hits']
        
    songsall = []
    for s in songs1:
        songsall.append(s['result'])
    for s in songs2:
        songsall.append(s['result'])
    return songsall

# Returns of list of genre similarity scores given a list of genres that the user wants
def get_genre_similarity(genre_list):
    with open("genreSVD/genres_compressed.npy", 'rb') as f:
        genres_compressed = np.load(f)
    with open("genreSVD/genre_to_idx.json") as json_file:
        genre_to_idx = json.load(json_file)
    scores = np.asarray([genres_compressed.dot(genres_compressed[genre_to_idx[genre],:]) for genre in genre_list])
    return np.max(scores, axis=0).tolist()

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

def sim_score(genre_scores, keywords, lyrics, user_dict=None, lyrics_dict=None, tokenizer=naive_tokenizer):
    # lyrics is a string of the song, the untokenized outpyt from get_lyrics
    # userinput is whatever unprocessed string the user sent us
    
    # TODO: Some things I would eventually like to do:
    # 1. Use word embeddings to calculate similarities instead of strings
    # 2. Use nltk to strip stopwords (modified for songs; e.x. ooh, oh, yeah, yuh, ah, mm, hmm, hey)
    if user_dict is None:
        user_dict = string_to_dict(keywords)
    if lyrics_dict is None:
        lyrics_dict = string_to_dict(lyrics)
    if user_dict["Total Words"] == 0 or lyrics_dict["Total Words"] == 0:
        return 0
    sim = -1 * user_dict["Total Words"] * lyrics_dict["Total Words"]
    for word in user_dict:
        if word in lyrics_dict:
            sim += user_dict[word] * lyrics_dict[word]
    return sim / (user_dict["Total Words"] * lyrics_dict["Total Words"])

# returns a ranked playlist of song titles and artists given a origin, destination, genres, and keywords
def get_playlist(origin, destination, genres, keywords):
  songs_by_location = songs_at_loc(origin,destination)
  song_lyrics = [(song, get_lyrics(song["title"], song["primary_artist"]["name"])) for song in songs_by_location]
  genre_scores = get_genre_similarity(genres)
  song_scores = sorted([(song["title"], song["primary_artist"]["name"], sim_score(genre_scores, keywords, lyric)) for (song,lyric) in song_lyrics], key=lambda x: x[2], reverse=True)
  return song_scores
  
# the search route that takes in origin, destination, genres and keywords, and outputs a playlist
@irsystem.route('/search')
def search():
	error_msg = ""
	origin = request.args.get('origin')
	destination = request.args.get('destination')
	genres = request.args.get('genres').split(",")
	keywords = request.args.get('keywords')

	if not origin or not destination:
		error_msg = 'Make sure to put in an orgin and destination'

	playlist = get_playlist(origin, destination, genres, keywords)
  
	return {'error': error_msg, 'playlist': playlist}