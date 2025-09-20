from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample conversion factors (placeholder)
KWH_PER_MS = {
    "openai:gpt-4o": 1e-7,
    "openai:gpt-4o-mini": 2e-8,
    "stable-diffusion:sd-xl": 5e-8
}
GRID_DEFAULT_KG_PER_KWH = 0.5  # average grid carbon intensity

# Optional: test route to check server is running
@app.route('/', methods=['GET'])
def home():
    return "Analytics service is running!"

# AI carbon estimation endpoint
@app.route('/estimate_ai', methods=['POST'])
def estimate_ai():
    data = request.json
    if not data:
        return jsonify({"error": "Missing JSON body"}), 400

    provider = data.get('provider')
    model = data.get('model')
    compute_ms = data.get('compute_ms', 0)
    tokens = data.get('tokens_in', 0) + data.get('tokens_out', 0)

    # energy estimation
    key = f"{provider}:{model}"
    kwh_per_ms = KWH_PER_MS.get(key, 1e-8)
    energy_kwh = compute_ms * kwh_per_ms

    # fallback: tokens-based estimate
    if energy_kwh == 0 and tokens > 0:
        energy_kwh = tokens * 1e-6

    # carbon calculation
    kg_co2 = energy_kwh * GRID_DEFAULT_KG_PER_KWH

    return jsonify({"kgCO2": kg_co2})

if __name__ == '__main__':
    # debug=True will auto-reload the server on code changes
    app.run(host='0.0.0.0', port=5000, debug=True)
