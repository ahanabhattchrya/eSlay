from flask import Flask

app = Flask(__name__, static_folder="../build", static_url_path='/')

#for the homepage html
@app.route('/')
def html():
    return app.send_static_file("index.html")

#for the front end js
@app.route('/frontendjs')
def frontendjs():
    pass
    # return app.send_static_file("frontend.js")

#for the get and post request

if __name__ == "__main__":
    app.run("0.0.0.0", 3000)