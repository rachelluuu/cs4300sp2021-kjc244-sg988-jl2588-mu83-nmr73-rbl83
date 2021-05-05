from . import *  
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
import requests
import json
import numpy as np
import os

project_name = "Playground"
net_id = "Michael Noor: mn598\nJoy Chen: jhc287\nJyne Dunbar: jcd322\nRachel Lu: rbl83\nVladia Trinh: vt95"

@irsystem.route('/', methods=['GET'])
def render():
  return render_template('index.html')

def songs_at_loc(loc1, loc2):
    songs1 = []
    songs2 = []
    with open('top_100_cities.json') as cities_file:
        data = json.load(cities_file)
        songs1 = data[loc1.lower()]
        songs2 = data[loc2.lower()]
    songsall = songs1+songs2
    return songsall

def songs_at_oneloc(loc1):
    songs1 = []
    with open('top_100_cities.json') as cities_file:
        data = json.load(cities_file)
        songs1 = data[loc1.lower()]
    return songs1

def get_syn(word): #necessary new helper function
  synonyms = set()
  for syn in wordnet.synsets(word):
    for l in syn.lemmas():
      synonyms.add(l.name())
  return synonyms

def sim_score_final(genre_scores, keywords, lyrics, popularity, song_genres):
    #genre_scores: a dict w/ key=genre name, val=score, outputted from Rachel and Vladia's code
    #keywords: string, exactly what's put in by the user in that section
    #song: json, directly from Jyne's JSON file, containing info about the song
    #song_genres: a list of the genres that this song was classified into
    #lyrics = get_lyrics(song['title'], song['primary_artist']['name'])
    #popularity = song['pyongs_count'] + .1 # to avoid multiplying by 0

    riff_words = {'ooh', 'oh', 'ah', 'yeah', 'yuh', 'mm', 'mmm', 'hmm', 'hey', 'baby'}
    song_stopwords = set(stopwords.words('english')).union(riff_words)

    syn_weight = .2
    word_match_weight = 1.0
    genre_weight_cutoff = .01

    def dot_score(key_dict, line):
      line_dict = string_to_dict(line)
      sim = -1 * (word_match_weight - syn_weight) * key_dict["Total Words"] * line_dict["Total Words"] #cancels out to 0
      for word in key_dict:
        if word in song_stopwords:
          continue
        if word in line_dict:
            sim += (word_match_weight - syn_weight) * key_dict[word] * line_dict[word]
        for syn in get_syn(word):
            if syn in line_dict:
              sim += syn_weight * key_dict[word] * line_dict[syn]
      return sim, line_dict["Total Words"]

    key_dict = string_to_dict(keywords)

    if lyrics is None:
        lyrics = ""
    lines = lyrics.split('\n')
    relevant_lyrics = ""
    best_score = 0
    if len(lines) == 1 and lines[0] == "":
      return -1 * float('inf'), ""
    if popularity is None:
      popularity = 0

    sim = 0
    for line in lines:
      curr_score, line_len = dot_score(key_dict, line)
      if line_len != 0 and curr_score / line_len > best_score:
        best_score = curr_score / line_len
        relevant_lyrics = line
      sim += curr_score

    sim = np.log(sim+.1) - np.log(string_to_dict(lyrics)["Total Words"])
    sim += np.log(np.log(popularity + 1) + .1) #double log so it's not weighted too much'

    genre_score = 0
    if len(song_genres) > 0:
      relevant_scores = [genre_scores[genre] for genre in song_genres if genre in genre_scores]
      if len(relevant_scores) > 0:
        genre_score = np.mean(relevant_scores)
        if genre_score > .95:
          genre_score = .95
        if genre_score < -.95:
          genre_score = -.95
      else:
        genre_score = 0
    sim += np.tan(genre_score * np.pi / 2)

    return (sim, relevant_lyrics)

def sim_score2(genre_scores, keywords, lyrics, popularity, song_genres):
    #genre_scores: a dict w/ key=genre name, val=score, outputted from Rachel and Vladia's code
    #keywords: string, exactly what's put in by the user in that section
    #song: json, directly from Jyne's JSON file, containing info about the song
    #song_genres: a list of the genres that this song was classified into
    #lyrics = get_lyrics(song['title'], song['primary_artist']['name'])
    #popularity = song['pyongs_count'] + .1 # to avoid multiplying by 0
    key_dict = string_to_dict(keywords)
    song_dict = string_to_dict(lyrics)
    if key_dict["Total Words"] == 0 or song_dict["Total Words"] == 0:
        return 0
    if popularity is None:
    	popularity = 0
    sim = -1 * key_dict["Total Words"] * song_dict["Total Words"]
    for word in key_dict:
        if word in song_dict:
            sim += key_dict[word] * song_dict[word]
        for syn in get_syn(word):
            if syn in song_dict:
              pass
              sim += .2 * key_dict[word] * song_dict[syn]
    sim = np.log(sim+.1) - np.log(key_dict["Total Words"] * song_dict["Total Words"])
    sim += np.log(popularity + 1)
    if len(song_genres) > 0:
      total_genre_score = sum([genre_scores[genre] for genre in song_genres if genre in genre_scores])
      if total_genre_score == 0:
      	total_genre_score = .1
      sim += np.log(total_genre_score)
    return sim

# Returns of list of genre similarity scores given a list of genres that the user wants
def get_genre_similarity(genre_list):
    with open("genreSVD/genres_compressed.npy", 'rb') as f:
        genres_compressed = np.load(f)
    if genre_list == ['']:
        return [0]*len(genres_compressed)
    with open("genreSVD/genre_to_idx.json") as json_file:
        genre_to_idx = json.load(json_file)
    scores = np.asarray([genres_compressed.dot(genres_compressed[genre_to_idx[genre],:]) for genre in genre_list])
    return np.max(scores, axis=0).tolist()

# deprecated
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

def get_toks(input): #necessary updated helper function
    output = []
    for toks in [list(map(str.lower, word_tokenize(sent))) for sent in sent_tokenize(input)]:
      output += toks
    return output

def string_to_dict(str_in, tokenizer=get_toks): #necessary updated helper function
    riff_words = {'ooh', 'oh', 'ah', 'yeah', 'yuh', 'mm', 'mmm', 'hmm', 'hey', 'baby'}
    song_stopwords = set(stopwords.words('english')).union(riff_words)
    if str_in is None:
        return {"Total Words":0}
    ans = dict()
    i = -1
    stopword_count = 0
    for i, word in enumerate(tokenizer(str_in)):
        if word in song_stopwords:
          stopword_count += 1
          continue
        if word not in ans:
            ans[word] = 0
        ans[word] += 1
    ans["Total Words"] = i + 1 - stopword_count
    return ans

def get_similarity_list(songs_by_location, genres, keywords, seen_songs=set()):
    song_lyrics = []
    if len(seen_songs) > 0:
        purge_duplicates = []
        for song in songs_by_location:
            title = song["title"]
            if title not in seen_songs:
                purge_duplicates.append(song)
        songs_by_location = purge_duplicates
    with open('song_and_artist_to_lyrics.json') as lyrics_file:
        lyrics_map = json.load(lyrics_file)
        for song in songs_by_location:
            title = song["title"]
            seen_songs.add(title)
            artist = song["primary_artist"]["name"]
            key = title + " - " + artist
            if key in lyrics_map:
                song_lyrics.append((song, lyrics_map[key]))
            else:
                song_lyrics.append((song, None))
    song_genres = []
    with open('song_genres.json') as genres_file:
        genres_map = json.load(genres_file)
        for song in songs_by_location:
            title = song["title"]
            artist = song["primary_artist"]["name"]
            key = title + " - " + artist
            if key in genres_map:
                song_genres.append(genres_map[key])
            else:
                song_genres.append([])
    genre_scores = get_genre_similarity(genres)
    song_scores = []
    for index, (song_info, lyric) in enumerate(song_lyrics):
        popularity = song_info["pyongs_count"]
        genres = song_genres[index]
        (similarity,lyric) = sim_score_final(genre_scores, keywords, lyric, popularity, genres)
        song_scores.append((song_info["title"], song_info["primary_artist"]["name"], similarity, lyric))
    return sorted(song_scores, key=lambda x: x[2], reverse=True)

# returns a ranked playlist of song titles and artists given a origin, destination, genres, and keywords
def get_playlist(origin, destination, genres, keywords):
  origin_songs = songs_at_oneloc(origin)
  dest_songs = songs_at_oneloc(destination)
  seen_songs = set()
  origin_sim = get_similarity_list(origin_songs, genres, keywords, seen_songs)[:50]
  dest_sim = get_similarity_list(dest_songs, genres, keywords, seen_songs)[:50]
  return origin_sim+dest_sim
  
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
  # remove similarity from items in list
	playlist = map(lambda x: (x[0], x[1], x[3]), playlist)
	return {'error': error_msg, 'playlist': list(playlist)}