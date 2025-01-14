import { NotificareAsset } from './models/notificare-asset';

export class NotificareAssets {
  /**
   * Fetches a list of {@link NotificareAsset} for a specified group.
   *
   * @param {string} group - The name of the group whose assets are to be fetched.
   * @returns {Promise<NotificareAsset[]>} - A promise that resolves to a list of
   * {@link NotificareAsset} belonging to the specified group.
   */
  public static async fetch(group: string): Promise<NotificareAsset[]> {
    return new Promise<NotificareAsset[]>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareAssets', 'fetch', [group]);
    });
  }
}
