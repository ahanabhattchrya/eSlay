# Imports
from flask import Flask, send_from_directory, jsonify, render_template, request
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../build/static', template_folder='../build/')
CORS(app)

#for the homepage html
@app.route('/')
def html():
    return render_template("index.html")

# https://stackoverflow.com/a/50660437
# The above stack overflow link allowed us to utilize React Routing while allowing Flask to handle
# any requests made to the same routes by sending it straight from the directory as a static file the
# same way React woudl. God bless this person.
@app.route('/<path:path>')
def serve(path):
     path_dir = os.path.abspath("../build") #path react build
     if path != "" and os.path.exists(os.path.join(path_dir, path)):
         return send_from_directory(os.path.join(path_dir), path)
     else:
         return send_from_directory(os.path.join(path_dir),'index.html')

#for the front end js
@app.route('/frontendjs')
def frontendjs():
    pass
    # return app.send_static_file("frontend.js")

@app.route('/login', methods=["POST"])
def login(): 
    print(request.data)
    pass
    # return app.send_static_file()

#for the get and post request

if __name__ == "__main__":
    app.run("0.0.0.0", 3000)