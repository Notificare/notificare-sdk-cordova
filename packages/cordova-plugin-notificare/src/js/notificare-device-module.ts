import { NotificareDevice } from './models/notificare-device';
import { NotificareDoNotDisturb } from './models/notificare-do-not-disturb';

export class NotificareDeviceModule {
  /**
   * @returns The current {@link NotificareDevice} information.
   */
  public async getCurrentDevice(): Promise<NotificareDevice | null> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'getCurrentDevice', []);
    });
  }

  /**
   * @returns The preferred language of the current device for notifications and
   * messages.
   */
  public async getPreferredLanguage(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'getPreferredLanguage', []);
    });
  }

  /**
   * Updates the preferred language setting for the device.
   *
   * @param language The preferred language code.
   */
  public async updatePreferredLanguage(language: string | null): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'updatePreferredLanguage', [language]);
    });
  }

  /**
   * Registers a user for the device.
   *
   * To register the device anonymously, set both `userId` and `userName` to `null`.
   *
   * @param userId Optional user identifier.
   * @param userName Optional username.
   *
   * @deprecated Use updateUser() instead.
   */
  public async register(userId: string | null, userName: string | null): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'register', [userId, userName]);
    });
  }

  /**
   * Updates the user information for the device.
   *
   * To register the device anonymously, set both `userId` and `userName` to `null`.
   *
   * @param userId Optional user identifier.
   * @param userName Optional username.
   */
  public async updateUser(userId: string | null, userName: string | null): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'updateUser', [userId, userName]);
    });
  }

  /**
   * Fetches the tags associated with the device.
   *
   * @return A list of tags currently associated with the device.
   */
  public async fetchTags(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'fetchTags', []);
    });
  }

  /**
   * Adds a single tag to the device.
   *
   * @param tag The tag to add.
   */
  public async addTag(tag: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'addTag', [tag]);
    });
  }

  /**
   * Adds multiple tags to the device.
   *
   * @param tags A list of tags to add.
   */
  public async addTags(tags: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'addTags', [tags]);
    });
  }

  /**
   * Removes a specific tag from the device.
   *
   * @param tag The tag to remove.
   */
  public async removeTag(tag: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'removeTag', [tag]);
    });
  }

  /**
   * Removes multiple tags from the device.
   *
   * @param tags A list of tags to remove.
   */
  public async removeTags(tags: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'removeTags', [tags]);
    });
  }

  /**
   * Clears all tags from the device.
   */
  public async clearTags(): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'clearTags', []);
    });
  }

  /**
   * Fetches the "Do Not Disturb" (DND) settings for the device.
   *
   * @return The current {@link NotificareDoNotDisturb} settings, or `null` if
   * none are set.
   */
  public async fetchDoNotDisturb(): Promise<NotificareDoNotDisturb | null> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'fetchDoNotDisturb', []);
    });
  }

  /**
   * Updates the "Do Not Disturb" (DND) settings for the device.
   *
   * @param dnd The new {@link NotificareDoNotDisturb} settings to apply.
   */
  public async updateDoNotDisturb(dnd: NotificareDoNotDisturb): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'updateDoNotDisturb', [dnd]);
    });
  }

  /**
   * Clears the "Do Not Disturb" (DND) settings for the device.
   */
  public async clearDoNotDisturb(): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'clearDoNotDisturb', []);
    });
  }

  /**
   * Fetches the user data associated with the device.
   *
   * @return The current user data.
   */
  public async fetchUserData(): Promise<Record<string, string>> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'fetchUserData', []);
    });
  }

  /**
   * Updates the custom user data associated with the device.
   *
   * @param userData The updated user data to associate with the device.
   */
  public async updateUserData(userData: Record<string, string>): Promise<void> {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'updateUserData', [userData]);
    });
  }
}
