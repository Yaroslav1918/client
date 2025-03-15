import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { BusyService } from "../_services/busy.service";
import { delay, finalize, identity } from "rxjs";
import { environment } from "../../environments/environment.development";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  busyService.busy();

  return next(req).pipe(
    environment.apiUrl ? identity : delay(1000),
    finalize(() => {
      busyService.idle();
    })
  );
};
