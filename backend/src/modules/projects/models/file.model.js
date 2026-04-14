import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },

    name: String,
    path: String, // /src/index.js

    type: {
      type: String,
      enum: ['file', 'folder'],
    },

    content: String,

    language: String, // js, html, css

    size: Number,
  },
  { timestamps: true }
);

const File = mongoose.model('File', FileSchema);

export default File;
