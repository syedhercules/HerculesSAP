# kpi_routes.py
from flask import Blueprint, jsonify
from sqlalchemy import text
from database import engine
import time

kpi_bp = Blueprint("kpi_bp", __name__)

# Store the latest known record
latest_id = None
latest_data = None


def calculate_kpis(d):
    WG = lambda k: float(d.get(k, 0))
    DM = lambda k: float(d.get(k, 0))
    PL = lambda k: float(d.get(k, 0))

    # Milling KPIs
    mill_throughput = WG("WG202") / 25 * 100
    mill_time_eff = WG("WG202_Total_Running_Time") / WG("Daily_Hours") * 100
    total_util = (mill_time_eff * mill_throughput) / 100
    milling_gain = ((WG("WG301") + WG("WG302") + WG("WG501") + WG("WG502") + WG("WG503")) / WG("WG201")) * 100
    screening_ratios = WG("WG301") / WG("WG201") * 100 + WG("WG302") / WG("WG101") * 100
    water_consumption = DM("DM101") + DM("DM102") + DM("DM201") + DM("DM202") + DM("DM203")
    extraction_rates = (WG("WG501") + WG("WG502") + WG("WG503")) / WG("WG202") * 100
    milling_loss = (WG("WG202") - (WG("WG501") + WG("WG502") + WG("WG503"))) / WG("WG202") * 100
    net_hours = WG("WG202_Total_Running_Time")
    downtime = WG("WG202_Stop_Start")

    # Packing KPIs
    packing_line_capacity = 40.00
    daily_packing_output = PL("PL601") / 375 * 6000
    packing_net_hours = PL("PL601") / 375
    packing_downtime = 16 - packing_net_hours
    packing_utilization = (packing_net_hours / 16) * 100

    return {
        "milling_kpis": {
            "Mill Throughput (%)": round(mill_throughput, 2),
            "Mill Time Efficiency (%)": round(mill_time_eff, 2),
            "Total Utilization (%)": round(total_util, 2),
            "Milling Gain": round(milling_gain, 2),
            "Screening Ratios": round(screening_ratios, 2),
            "Water Consumption (m³)": round(water_consumption, 2),
            "Extraction Rates (%)": round(extraction_rates, 2),
            "Milling Loss (%)": round(milling_loss, 2),
            "Net Hours (hrs)": round(net_hours, 2),
            "Downtime (hrs)": round(downtime, 2),
        },
        "packing_kpis": {
            "Packing Line Capacity (bags/hr)": round(packing_line_capacity, 2),
            "Daily Packing Output (bags)": round(daily_packing_output, 2),
            "Net Hours (hrs)": round(packing_net_hours, 2),
            "Downtime (hrs)": round(packing_downtime, 2),
            "Machine Utilization (%)": round(packing_utilization, 2),
        }
    }


@kpi_bp.route("/api/kpi", methods=["GET"])
def get_kpis():
    global latest_id, latest_data
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT TOP 1 * FROM kpicalculations ORDER BY ID DESC"))
            row = result.fetchone()

            if not row:
                return jsonify({"error": "No data found"}), 404

            row_id = row._mapping.get("id")
            if latest_id != row_id:
                latest_id = row_id
                latest_data = dict(row._mapping)

            kpi_output = calculate_kpis(latest_data)
            return jsonify(kpi_output)

    except Exception as e:
        return jsonify({"error": f"Error calculating KPIs: {str(e)}"}), 500
