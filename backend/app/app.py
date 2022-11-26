from flask import Flask

app = Flask(__name__, static_folder='frontend/build', template_folder='frontend/build')

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

@app.route('/login')
def login(): 
    pass
    # return app.send_static_file()

#for the get and post request

if __name__ == '__main__':
    app.run()