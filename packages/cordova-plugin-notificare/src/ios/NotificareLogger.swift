import Foundation
import NotificareUtilitiesKit

internal var logger: NotificareLogger = {
    var logger = NotificareLogger(
        subsystem: "re.notifica.cordova",
        category: "NotificareCordova"
    )

    logger.labelIgnoreList.append("NotificareCordova")

    return logger
}()
