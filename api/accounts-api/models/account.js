import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const AccountSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    mname: { type: String },
    lname: { type: String, required: true },
    stdno: { type: Number },
    type: { type: String, required: true }, // student || admin || approver
    isValidated: { type: Boolean, required: true }, // can only login when admin validates the user
    isClearanceOfficer: { type: Boolean },
    upmail: { type: String, required: true },
    password: { type: String, required: true },
    adviser: { type: String  },
    advisee: { type: Array },
    application: { type: Array }
});


// do not save the user's actual password on the database
AccountSchema.pre("save", function (next) {
    const account = this;

    if (!account.isModified("password")) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(account.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }

            account.password = hash;
            return next();
        });
    });
});


// method to compare passwords (checker for login)
AccountSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
}

mongoose.model("Account", AccountSchema);

export {AccountSchema};