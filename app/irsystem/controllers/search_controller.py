from . import *  
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder

project_name = "Playground"
net_id = "Michael Noor: mn598\nJoy Chen: jhc287\nJyne Dunbar: jcd322\nRachel Lu: rbl83\nVladia Trinh: vt95"

@irsystem.route('/', methods=['GET'])
def search():
	origin = request.args.get('origin')
	dest = request.args.get('destination')
	vibe = request.args.get('vibe')
	if not origin or not dest:
		data = []
		output_message = 'Make sure to put in an orgin and destination'
	else:
		output_message = "Check out these songs for your next trip from " + origin + " to " + dest + " with " + vibe
		data = range(5) 
		#TODO set data equal to API function calls
	return render_template('search.html', name=project_name, netid=net_id, output_message=output_message, data=data)



