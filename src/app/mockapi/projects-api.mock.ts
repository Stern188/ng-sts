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
                "membersid": ["1","2"],
                "members":["张三","李四"],
                "description": "检测器描述",
                "date":"2017-10-10 16:06:19"
            },
            {
                "id": 2,
                "name": "检测器管理中心",
                "membersid": ["1"],
                "members":["张三"],
                "description": "检测器管理中心描述",
                "date":"2017-10-10 16:06:19"
            },
            {
                "id": 3,
                "name": "数据库系统",
                "membersid": ["1","3"],
                "members":["张三","王五"],
                "description": "数据库系统描述",
                "date":"2017-10-10 16:06:19"
            }
        ];
    }

}

export let projectsApi: ProjectsApi = Object.assign(new ProjectsApi(), { UrlPrefix: environment.mock_config.api_prefix });
