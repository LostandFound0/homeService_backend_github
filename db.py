import mysql.connector


db_config = {
    "host": "localhost",
    "user": "root",
    "password": "admin",
    "database": "homeservice"
}

def db_connection():
    try:
        con=mysql.connector.connect(**db_config)
        print("Database connected sucessfully")
        return con
    except mysql.connector.Error as err:
        print(err)


