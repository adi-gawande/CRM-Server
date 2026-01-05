import mongoose from "mongoose";

const pastEmploymentSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      trim: true,
    },

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },

    employeeCode: {
      type: String,
      trim: true,
    },

    joiningDate: {
      type: Date,
    },

    relievingDate: {
      type: Date,
    },

    inHandSalary: {
      type: Number,
    },

    yearsOfExperiance: {
      type: Number,
    },

    note: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const employeeSchema = new mongoose.Schema(
  {
    // ======================
    // BASIC IDENTITY
    // ======================
    employeeCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: /^[A-Z]{3}[0-9]{3}$/,
      trim: true,
    },

    prefix: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prefix",
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
    },

    // ======================
    // CONTACT DETAILS
    // ======================
    contactNumber: {
      type: Number,
    },

    alternativeContactNumber: {
      type: Number,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    alternativeEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    // ======================
    // PAST EMPLOYMENT
    // ======================
    pastEmploymentDetails: [pastEmploymentSchema],

    // ======================
    // CURRENT EMPLOYMENT
    // ======================
    currentEmploymentDetail: {
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },

      employeeRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },

      designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
      },

      appointmentDate: {
        type: Date,
      },

      joiningDate: {
        type: Date,
      },

      reportingTo: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        default: null,
      },
    },

    // ======================
    // QUALIFICATION
    // ======================
    qualification: {
      diploma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diploma",
      },

      graduation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Graduation",
      },

      postGraduation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostGraduation",
      },

      other: {
        type: String,
        trim: true,
      },
    },

    // ======================
    // SYSTEM FLAGS (OPTIONAL)
    // ======================
    isActive: {
      type: Boolean,
      default: true,
    },

    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

const User = mongoose.model("User", employeeSchema);
export default User;
