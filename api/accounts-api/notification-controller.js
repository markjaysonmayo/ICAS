import mongoose from "mongoose";
// get notification model registered in Mongoose
const Notification = mongoose.model("Notification");


// =================== METHODS ===================

// add a notification containing adviser's/admin's remark OR notif when clearance cleared
// OUTPUT: { "success": Boolean }
const createNotification = async (req, res) => {
    const newNotif = new Notification({
        status: "unread",
        studentId: req.body.studentId,
        applicationId: req.body.applicationId,
        returner: req.body.returner,    // "adviser" || "clearance officer"
        notificationDate: req.body.notificationDate
    });

    const result = await newNotif.save();
    if (result._id) {
        res.send({ success: true })
    } else {
        res.send({ success: false })
    }
}

// set a notification as read given its id
// OUTPUT: { "success": Boolean }
const setNotificationToRead = async (req, res) => {
    var notif = Notification.findById(req.body.appliId);

    if (notif) {
        await Notification.updateOne({_id: req.body.appliId}, {$set: {status: "read"}});
        res.send({ sucess: true });
    } else {
        res.send({ success: false });
    }
}

// show notifications based on user
const showNotification = async (req, res) => {
    var account = await Account.findOne({ upmail: req.body.upmail });

    if (account == null) {
        return res.send({ success: false });
    }
    res.send(await Notification.find({ studentId: account._id }));

}

export { createNotification, setNotificationToRead, showNotification };