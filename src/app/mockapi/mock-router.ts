/**
 *
 * Created by conan on 2017/7/28.
 */
import { BaseMockApi } from "./mock-api";
import { authApi } from "./auth-api.mock";
import { dashboardApi } from "./dashboard-api.mock";
import { projectsApi } from "./projects-api.mock";
import { membersApi } from "./members-api.mock";
import { versionsApi } from "./versions-api.mock";
import { indexApi } from "./index-api.mock";
import { statisticsApi } from "./statistics-api.mock";


interface MockRouters {
  timeout: number;
  routers: BaseMockApi[];
}


//reg mock API here
export const mockRouters: MockRouters = {
  'timeout': 200,
  'routers': [
    authApi,
    dashboardApi,
    projectsApi,
    membersApi,
    versionsApi,
    indexApi,
    statisticsApi
  ]
};
