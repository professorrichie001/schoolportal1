# from flask import Flask, request, render_template
# import database
# import document_functions
# import sqlite3
# import exam

# app = Flask(__name__)

# @app.route('/exams')
# def show_exams():
#     # 1. Get the data
#     exams = exam.get_exams_data() 
    
#     # 2. DEBUG: Print this to your terminal! 
#     # It should look like: [{'id': 1, 'marks_json': {...}}, ...]
#     print(f"DEBUG DATA: {exams}") 
    
#     return render_template('index254.html', exams=exams)

# if __name__ == '__main__':
#     app.run(debug=True)
