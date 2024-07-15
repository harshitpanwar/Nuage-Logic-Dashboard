const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
  },
  groupsTag: String,
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Prospect', 'Warm Lead'],
    default: 'Active',
  },
  assigned: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: String,
//   opportunity: { type: Schema.Types.ObjectId, ref: 'Opportunity' },
  logo: String,
  summary: String,
  opportunityTag: String,
  specialties: String,
  industry: String,
  revenue: String,
  size: Number,
  locations: [{ type: String }],
  officePhone: String,
  website: String,
  mainContact: { type: Schema.Types.ObjectId, ref: 'Contact' },
  contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
});

module.exports = mongoose.model('Company', CompanySchema);
