import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  education: [{
    institution: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    }
  }],
  skills: [String],
  projects: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    links: [String]
  }],
  work: [{
    company: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    }
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
