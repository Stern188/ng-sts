/**
 * Created by conan on 2017/8/23.
 */
import { environment } from "../../environments/environment"
import { RESTMockApi } from "./rest-mock-api";
import { isArray } from "util";

class ProjectsApi extends RESTMockApi {

    onInit() {
        this.UrlApi = '/projects/:id';
        this.datas = [
            {
                "id": 1,
                "name": "检测器",
                "description": "检测器描述"
            },
            {
                "id": 2,
                "name": "检测器管理中心",
                "description": "检测器管理中心描述"
            },
            {
                "id": 3,
                "name": "数据库系统",
                "description": "数据库系统描述"
            }
        ];
    }

}

export let projectsApi: ProjectsApi = Object.assign(new ProjectsApi(), { UrlPrefix: environment.mock_config.api_prefix });
