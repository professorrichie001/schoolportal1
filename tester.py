import sqlite3

def create_marks_table():
    conn = sqlite3.connect("student.db")
    cursor = conn.cursor()

    # ENABLE FOREIGN KEYS (CRITICAL)
    cursor.execute("PRAGMA foreign_keys = ON;")

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS marks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            admission_no TEXT NOT NULL,
            year INTEGER NOT NULL,
            term TEXT NOT NULL,
            exam_type TEXT NOT NULL,
            marks_json TEXT NOT NULL,

            FOREIGN KEY (admission_no)
                REFERENCES students(admission_no)
                ON DELETE CASCADE
                ON UPDATE CASCADE,

            UNIQUE (admission_no, year, term, exam_type)
        );
    """)

    conn.commit()
    conn.close()

# Run once
create_marks_table()
