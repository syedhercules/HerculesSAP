from flask import Blueprint, request, jsonify
from sqlalchemy import text
from database import SessionLocal

material_bp = Blueprint("material_bp", __name__)

@material_bp.route("/api/materials", methods=["GET"])
def get_materials():
    session = SessionLocal()
    try:
        result = session.execute(text("SELECT * FROM material_mappings ORDER BY id DESC"))
        materials = [dict(row._mapping) for row in result]
        return jsonify(materials)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()

@material_bp.route("/api/materials", methods=["POST"])
def add_material():
    data = request.get_json()
    session = SessionLocal()
    try:
        # Note: Ensure the keys in `data` match the column names exactly.
        insert_query = text("""
            INSERT INTO material_mappings (material, version, scale, recipe, packingLine)
            VALUES (:material, :version, :scale, :recipe, :packingLine)
        """)
        session.execute(insert_query, data)
        session.commit()
        return jsonify({"message": "Material added successfully"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
