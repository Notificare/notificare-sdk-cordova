export class NotificareEventsModule {
  /**
   * Logs in Notificare a custom event in the application.
   *
   * This function allows logging, in Notificare, of application-specific events,
   * optionally associating structured data for more detailed event tracking and
   * analysis.
   *
   * @param event The name of the custom event to log.
   * @param data Optional structured event data for further details.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async logCustom(event: string, data?: Record<string, any>) {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Notificare', 'logCustom', [event, data]);
    });
  }
}
