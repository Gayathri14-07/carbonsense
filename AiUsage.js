const mongoose = require('mongoose');

const aiUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  provider: String,        // e.g., "openai", "stable-diffusion"
  model: String,           // e.g., "gpt-4o"
  compute_ms: Number,      // milliseconds of compute
  tokens_in: Number,
  tokens_out: Number,
  estimated_kg: { type: Number, default: 0 }, // CO2 estimate
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AiUsage', aiUsageSchema);
