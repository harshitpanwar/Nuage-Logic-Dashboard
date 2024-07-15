const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  groupsTag: {
    type: String,
    enum: ["active contacts", "lead list", "new contacts", "inactive contacts"],
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  nickname: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true
  },
  source: {
    type: String,
    enum: ["customer", "lead", "referral", "vendor", "other"],
    required: true
  },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  title: {
    type: String,
    required: true
  },
  workEmail: {
    type: String,
    required: true
  },
  additionalWorkEmail: String,
  homeEmail: String,
  mobilePhone: String,
  workPhone: String,
  extension: String,
  linkedin: String,
  homeAddress: String,
  notes: String,
});

module.exports = mongoose.model('Contact', ContactSchema);
