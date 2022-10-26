const { Notification } = require('../models');

module.exports = {
  async getMyNotifications(userId) {
    try {
      const notifications = await Notification.findAll({ where: { userId } });

      return {
        error: false,
        message: 'notifications fetched successfully',
        notifications,
      };
    } catch (e) {
      return { error: true, message: 'could not fetch notifications' };
    }
  },

  async createNotifications(notification) {
    try {
      const created = new Notification({ ...notification });
      await created.save();

      return {
        error: false,
        message: 'notifications fetched successfully',
        notification: created,
      };
    } catch (e) {
      return {
        error: true,
        message: 'could not fetch notifications',
      };
    }
  },

  async deleteNotification(notificationId) {
    try {
      await Notification.destroy({ where: { id: notificationId } });

      return {
        message: 'Notification successfully deleted',
        error: true,
      };
    } catch (e) {
      return {
        message: 'Could not delete notification',
        error: false,
      };
    }
  },
};
