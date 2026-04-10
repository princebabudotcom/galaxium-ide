import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SessionSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
      default: 'unknown',
    },
    ipAddress: {
      type: String,
      required: true,
      default: 'unknown',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiryAt: {
      type: Date,
      required: true,
    },
    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  }
);
const AiConfigSchema = new mongoose.Schema(
  {
    /* ---------- MODEL ---------- */
    model: {
      type: String,
      default: 'gpt-4o',
      trim: true,
    },

    autoSelectModel: {
      type: Boolean,
      default: false,
    },

    /* ---------- GENERATION ---------- */
    temperature: {
      type: Number,
      default: 0.7,
      min: 0,
      max: 1,
    },

    maxTokens: {
      type: Number,
      default: 2048,
      min: 1,
      max: 10000, // 🔥 prevent insane values
      set: (v) => Number(v), // 🔥 ensures string → number
    },

    topP: {
      type: Number,
      default: 1.0,
      min: 0,
      max: 1,
    },

    frequencyPenalty: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 2,
    },

    presencePenalty: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 2,
    },

    /* ---------- RESPONSE STYLE ---------- */
    responseStyle: {
      type: String,
      enum: ['friendly', 'professional', 'developer', 'strict', 'creative'],
      default: 'friendly',
    },

    /* ---------- SYSTEM ---------- */
    systemInstructions: {
      type: String,
      default: 'You are an AI developer assistant.',
      trim: true,
      maxlength: 2000, // 🔥 prevent abuse
    },

    enableMemory: {
      type: Boolean,
      default: true,
    },

    /* ---------- EXECUTION ---------- */
    autoExecute: {
      type: Boolean,
      default: false,
    },

    streaming: {
      type: Boolean,
      default: true,
    },

    safeMode: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false, // cleaner docs
  }
);

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    username: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_]+$/,
      index: true,
      sparse: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
      index: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false, // 🔐 never return password
    },

    avatar: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    googleId: {
      type: String,
      sparse: true,
      index: true,
    },

    githubId: {
      type: String,
      sparse: true,
      index: true,
    },

    lastLoginAt: Date,

    loginCount: {
      type: Number,
      default: 0,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },

    // others schema's

    sessions: [SessionSchema],
    aiConfig: {
      type: AiConfigSchema,
      default: () => ({}),
    },

    preferences: {
      theme: {
        type: String,
        enum: ['dark', 'light'],
        default: 'dark',
      },
      fontSize: {
        type: Number,
        default: 14,
        min: 10,
        max: 24,
      },
      language: {
        type: String,
        enum: ['javascript', 'typescript', 'python'],
        default: 'javascript',
      },
    },

    activeProjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      index: true,
    },

    recentFiles: [
      {
        path: {
          type: String,
          required: true,
        },
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project',
        },
      },
    ],

    subscription: {
      plan: {
        type: String,
        enum: ['free', 'pro'],
        default: 'free',
        index: true,
      },
      aiTokensUsed: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 Compound Indexes (IMPORTANT)
// UserSchema.index({ email: 1, username: 1 });
// UserSchema.index({ googleId: 1 }, { sparse: true });
// UserSchema.index({ githubId: 1 }, { sparse: true });
UserSchema.index({ createdAt: -1 });

// 🔐 Password Hash Middleware
UserSchema.pre('save', async function () {
  if (this.googleId === null) {
    this.googleId = undefined;
  }

  if (this.githubId === null) {
    this.githubId = undefined;
  }

  if (!(this.password && this.isModified('password'))) return;

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
