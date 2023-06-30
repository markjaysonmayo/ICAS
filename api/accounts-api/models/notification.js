import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    status: { type: String, required: true },  // read || unread
    studentId: { type: String, required: true },
    applicationId: { type: String, required: true },
    notificationDate: { type: Date, required: true }
});

mongoose.model("Notification", NotificationSchema);

