import { NotificarePass } from './models/notificare-pass';

export class NotificareLoyalty {
  /**
   * Fetches a pass by its serial number.
   *
   * @param serial The serial number of the pass to be fetched.
   * @return The fetched {@link NotificarePass} corresponding to the given serial
   * number.
   */
  public static async fetchPassBySerial(serial: string): Promise<NotificarePass> {
    return new Promise<NotificarePass>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareLoyalty', 'fetchPassBySerial', [serial]);
    });
  }

  /**
   * Fetches a pass by its barcode.
   *
   * @param barcode The barcode of the pass to be fetched.
   * @return The fetched {@link NotificarePass} corresponding to the given
   * barcode.
   */
  public static async fetchPassByBarcode(barcode: string): Promise<NotificarePass> {
    return new Promise<NotificarePass>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareLoyalty', 'fetchPassByBarcode', [barcode]);
    });
  }

  /**
   * Presents a pass to the user.
   *
   * @param pass The {@link NotificarePass} to be presented to the user.
   */
  public static async present(pass: NotificarePass): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cordova.exec(resolve, reject, 'NotificareLoyalty', 'present', [pass]);
    });
  }
}
