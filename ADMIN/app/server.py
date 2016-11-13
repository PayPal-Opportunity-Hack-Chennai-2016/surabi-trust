#Importing required libraries
from flask import request,render_template,redirect,url_for,json,session
from eve import Eve
from eve.auth import BasicAuth
from bson import ObjectId
from bson.json_util import dumps
from datetime import datetime,timedelta
from functools import wraps
import bcrypt
import os

#Defining directories for static files and views
PWD = os.environ.get('PWD')
templates = os.path.join(PWD,'templates')
static = os.path.join(PWD,'static')

#BasicAuth to protect API routes
class MyBasicAuth(BasicAuth):
    def check_auth(self,username,password,allowed_roles,resource,method):
        return username == 'Admin@surabi' and password == 'aDm!n@surab!'

#App - eve instance
app = Eve(auth=MyBasicAuth,static_folder=static,template_folder=templates)
app.secret_key = "b859cc924ec74258b675e3cd0df68e41bd6bc75c103a439f42"

#Login required decorator - wrapper
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('login'))
    return wrap

#API root
@app.route('/')
def rootURL():
    return render_template('login.html')

#Login route
@app.route('/login',methods=['POST'])
def login():
    error = None
    email = request.form['inputUsername']
    password = request.form['inputPassword']
    print email
    print password
    account = app.data.driver.db['Admin']
    account = account.find_one({'email': email})
    if account and bcrypt.hashpw(password.encode('utf-8'),account['salt'].encode('utf-8')) == account['password']:
        session['logged_in'] = True
        session['_id'] = str(account['_id'])
        return redirect(url_for('dashboard'))
    else:
        error = 'Invalid credentials.Please try again.'
        return render_template('login.html',error=error), 400

#Create Admin
@app.route('/create',methods=['GET','POST'])
@login_required
def createAdmin():
    if request.method == "GET":
        return render_template('createAdmin.html')
    success_msg = "Successfully Added!"
    err_msg = "OOPS!Some technical issue has occured!"
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    salt = bcrypt.gensalt(8).encode('utf-8')
    if(name == None or email == None or password == None):
        return json.dumps({'Err':'Missing parameters'}), 400, {'ContentType':'application/json'}
    password = password.encode('utf-8')
    password = bcrypt.hashpw(password,salt)
    payload = {
        "name" : name,
        "email" : email,
        "password" : password,
        "salt" : salt,
        "_created" : datetime.utcnow()
    }
    Admin = app.data.driver.db['Admin']
    resp = Admin.insert(payload)
    if type(resp) == ObjectId:
        return render_template('createAdmin.html',success_msg=success_msg), 201
    else:
        return render_template('createAdmin.html',err_msg=err_msg), 400

#Approve student/mentor
@app.route('/approve/<userType>',methods=['POST','GET'])
@login_required
def approve(userType):
    if userType ==  "mentor":
        mentorId = request.form.get('mentorId')
        mentor = app.data.driver.db['Mentor']
        resp = mentor.update_one({
                  '_id': ObjectId(mentorId)
                },{
                  '$set': {
                    'isApproved': True
                  }
                }, upsert=False)
        return 'OK',200
    if userType ==  "student":
        studentId = request.form.get('studentId')
        student = app.data.driver.db['Student']
        resp = student.update_one({
                  '_id': ObjectId(studentId)
                },{
                  '$set': {
                    'isApproved': True
                  }
                }, upsert=False)
        return json.dumps({'success':True}), 200

#Dashboard route
@app.route('/dashboard',methods=['GET'])
@login_required
def dashboard():
    mentor = app.data.driver.db['Mentor']
    mentor_length = len(list(mentor.find()))
    student = app.data.driver.db['Student']
    student_length = len(list(student.find()))
    date_dif = datetime.now() - timedelta(days=14)
    Assignment = app.data.driver.db['Assignment']
    ids = Assignment.find({'updated_at':{"$lt":str(date_dif)}}).distinct('student_id')
    def cvrt(id) : return ObjectId(id)
    ids = map(cvrt,ids);
    inactive_users = list(student.find({'_id': {"$in": ids}}))
    course = app.data.driver.db['Course']
    course_list = list(course.find())
    return render_template('dashboard.html',mentor_length = mentor_length,student_length = student_length,inactive_users = inactive_users, course_list = course_list)

#Deactivate student/mentor
@app.route('/deactivate/<userType>',methods=['POST','GET'])
@login_required
def deactivate(userType):
    if userType ==  "mentor":
        mentorId = request.form.get('mentorId')
        mentor = app.data.driver.db['Mentor']
        resp = mentor.update_one({
                  '_id': ObjectId(mentorId)
                },{
                  '$set': {
                    'isApproved': False
                  }
                }, upsert=False)
        return json.dumps({'success':True}), 200
    if userType ==  "student":
        studentId = request.form.get('studentId')
        student = app.data.driver.db['Student']
        resp = student.update_one({
                  '_id': ObjectId(studentId)
                },{
                  '$set': {
                    'isApproved': False
                  }
                }, upsert=False)
        return json.dumps({'success':True}), 200

#View all mentors/students
@app.route('/view/<userType>',methods=['GET'])
@login_required
def view(userType):
    if userType ==  "mentors":
        mentor = app.data.driver.db['Mentor']
        mentors = dumps(mentor.find({}))
        return json.dumps(mentors), 200
    if userType ==  "students":
        student = app.data.driver.db['Student']
        students = dumps(student.find({}))
        return json.dumps(students), 200

#Mentor view
@app.route('/mentor')
@login_required
def mentor():
    mentor = app.data.driver.db['Mentor']
    mentor_list = list(mentor.find())
    return render_template('mentors.html',mentor_list=mentor_list)

#Student view
@app.route('/student')
@login_required
def student():
    student = app.data.driver.db['Student']
    student_list = list(student.find())
    return render_template('students.html',student_list=student_list)

#Logout
@app.route('/logout')
@login_required
def logout():
    session.pop('logged_in', None)
    session.pop('id', None)
    return redirect(url_for('rootURL'))

#Server startup
app.run(debug=True,port=8585)
