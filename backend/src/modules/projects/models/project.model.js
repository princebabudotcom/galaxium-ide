import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,

    type: {
      type: String,
      enum: ['website', 'api', 'ai-app', 'fullstack'],
      default: 'website',
    },

    sections: [
      {
        type: String,
        enum: ['frontend', 'backend', 'plan', 'readme'],
      },
    ],

    status: {
      type: String,
      enum: ['draft', 'building', 'ready', 'failed'],
      default: 'draft',
    },

    visibility: {
      type: String,
      enum: ['private', 'public'],
      default: 'private',
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    techStack: {
      frontend: String, // React, HTML, etc
      backend: String, // Node, Django
      database: String, // MongoDB, MySQL
    },

    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
      },
    ],

    commands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Command',
      },
    ],

    deployment: {
      url: String,
      status: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
