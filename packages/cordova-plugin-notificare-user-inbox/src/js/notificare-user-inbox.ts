import { NotificareNotification } from 'cordova-plugin-notificare';
import { NotificareUserInboxItem } from './models/notificare-user-inbox-item';
import { NotificareUserInboxResponse } from './models/notificare-user-inbox-response';

export class NotificareUserInbox {
  /**
   * Parses a JSON {@link Record} to produce a {@link NotificareUserInboxResponse}.
   *
   * This method takes a raw JSON {@link Record} and converts it into a structured
   * {@link NotificareUserInboxResponse}.
   *
   * @param {Record<string, unknown>} json - The JSON Record representing the user
   * inbox response.
   * @return {Promise<NotificareUserInboxResponse>} - A promise that resolves to
   * a {@link NotificareUserInboxResponse} object parsed from the
   * provided JSON Record.
   */
  public static async parseResponseFromJson(json: Record<string, unknown>): Promise<NotificareUserInboxResponse> {
    return new Promise<NotificareUserInboxResponse>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareUserInbox', 'parseResponseFromJson', [json]);
    });
  }

  /**
   * Parses a JSON string to produce a {@link NotificareUserInboxResponse}.
   *
   * This method takes a raw JSON string and converts it into a structured
   * {@link NotificareUserInboxResponse}.
   *
   * @param {string} json - The JSON string representing the user inbox response.
   * @return {Promise<NotificareUserInboxResponse>} - A promise that resolves to
   * a {@link NotificareUserInboxResponse} object parsed from the
   * provided JSON string.
   */
  public static async parseResponseFromString(json: string): Promise<NotificareUserInboxResponse> {
    return new Promise<NotificareUserInboxResponse>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareUserInbox', 'parseResponseFromString', [json]);
    });
  }

  /**
   * Opens an inbox item and retrieves its associated notification.
   *
   * This function opens the provided {@link NotificareUserInboxItem} and returns
   * the associated {@link NotificareNotification}.
   * This operation marks the item as read.
   *
   * @param {NotificareUserInboxItem} item - The {@link NotificareUserInboxItem}
   * to be opened.
   * @return {Promise<NotificareNotification>} - The {@link NotificareNotification}
   * associated with the opened inbox item.
   */
  public static async open(item: NotificareUserInboxItem): Promise<NotificareNotification> {
    return new Promise<NotificareNotification>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareUserInbox', 'open', [item]);
    });
  }

  /**
   * Marks an inbox item as read.
   *
   * This function updates the status of the provided
   * {@link NotificareUserInboxItem} to read.
   *
   * @param {NotificareUserInboxItem} item - The {@link NotificareUserInboxItem}
   * to mark as read.
   * @returns {Promise<void>} - A promise that resolves when the inbox item has
   * been successfully marked as read.
   */
  public static async markAsRead(item: NotificareUserInboxItem): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareUserInbox', 'markAsRead', [item]);
    });
  }

  /**
   * Removes an inbox item from the user's inbox.
   *
   * This function deletes the provided {@link NotificareUserInboxItem} from the
   * user's inbox.
   *
   * @param {NotificareUserInboxItem} item - The {@link NotificareUserInboxItem}
   * to be removed.
   * @returns {Promise<void>} - A promise that resolves when the inbox item has
   * been successfully removed.
   */
  public static async remove(item: NotificareUserInboxItem): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareUserInbox', 'remove', [item]);
    });
  }
}
