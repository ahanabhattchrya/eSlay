from flask import Flask

app = Flask(__name__)

#for the homepage html
@app.route('/')
def html():
    pass
    # return app.send_static_file("homepage.html")

#for the front end js
@app.route('/frontendjs')
def frontendjs():
    pass
    # return app.send_static_file("frontend.js")

#for the get and post request

if __name__ == '__main__':
    app.run()
