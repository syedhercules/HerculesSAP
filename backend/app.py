from flask import Flask
from flask_cors import CORS
from routes.kpi_routes import kpi_bp
from routes.material_routes import material_bp
from database import engine
from models.kpi_model import Base as KpiBase
from models.material_model import Base as MaterialBase

app = Flask(__name__)
CORS(app)

# Create tables if not exist
KpiBase.metadata.create_all(engine)
MaterialBase.metadata.create_all(engine)

# Register Blueprints
app.register_blueprint(kpi_bp)
app.register_blueprint(material_bp)

@app.route("/")
def home():
    return "Welcome to the Hercules KPI API"

if __name__ == "__main__":
    app.run(debug=True)
