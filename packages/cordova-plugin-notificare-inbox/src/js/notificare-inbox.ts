import { NotificareNotification } from 'cordova-plugin-notificare';
import { EventSubscription } from './events';
import { NotificareInboxItem } from './models/notificare-inbox-item';

export class NotificareInbox {
  /**
   * @returns A list of all {@link NotificareInboxItem}, sorted by the timestamp.
   */
  public static async getItems(): Promise<NotificareInboxItem[]> {
    return new Promise<NotificareInboxItem[]>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareInbox', 'getItems', []);
    });
  }

  /**
   * @returns The current badge count, representing the number of unread inbox
   * items.
   */
  public static async getBadge(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareInbox', 'getBadge', []);
    });
  }

  /**
   * Refreshes the inbox data, ensuring the items and badge count reflect the
   * latest server state.
   */
  public static async refresh(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareInbox', 'refresh', []);
    });
  }

  /**
   * Opens a specified inbox item, marking it as read and returning the
   * associated notification.
   *
   * @param item The {@link NotificareInboxItem} to open.
   * @return The {@link NotificareNotification} associated with the inbox item.
   */
  public static async open(item: NotificareInboxItem): Promise<NotificareNotification> {
    return new Promise<NotificareNotification>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareInbox', 'open', [item]);
    });
  }

  /**
   * Marks the specified inbox item as read.
   *
   * @param item The {@link NotificareInboxItem} to mark as read.
   */
  public static async markAsRead(item: NotificareInboxItem): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareInbox', 'markAsRead', [item]);
    });
  }

  /**
   * Marks all inbox items as read.
   */
  public static async markAllAsRead(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareInbox', 'markAllAsRead', []);
    });
  }

  /**
   * Permanently removes the specified inbox item from the inbox.
   *
   * @param item The {@link NotificareInboxItem} to remove.
   */
  public static async remove(item: NotificareInboxItem): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareInbox', 'remove', [item]);
    });
  }

  /**
   * Clears all inbox items, permanently deleting them from the inbox.
   */
  public static async clear(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareInbox', 'clear', []);
    });
  }

  // region Events

  /**
   * Called when the inbox is successfully updated.
   *
   * @param callback A callback that will be invoked with the result of the
   * onInboxUpdated event. It will provide an updated list of
   * {@link NotificareInboxItem}.
   */
  public static onInboxUpdated(callback: (items: NotificareInboxItem[]) => void): EventSubscription {
    return new EventSubscription('inbox_updated', callback);
  }

  /**
   * Called when the unread message count badge is updated.
   *
   * @param callback A callback that will be invoked with the
   * result of the onBadgeUpdated event. It will provide an updated badge count,
   * representing current the number of unread inbox items.
   */
  public static onBadgeUpdated(callback: (badge: number) => void): EventSubscription {
    return new EventSubscription('badge_updated', callback);
  }

  // endregion
}
