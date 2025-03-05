import { ErrorHandler, Injectable } from "@angular/core";
import { AppInsightsMonitoringService } from "./logging.service";

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    constructor(private monitoringService: AppInsightsMonitoringService) {
        super();
    }

    
    override handleError(error: Error) {
        this.monitoringService.logException(error); // Manually log exception
    }
}
