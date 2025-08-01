# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

connection_string = (
      "mssql+pyodbc:///?odbc_connect="
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=HELLOKIDZZ;"  # <== No \SQLEXPRESS
    "DATABASE=HerculesV22;"
    "Trusted_Connection=yes;"
  
)

engine = create_engine(connection_string)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()
