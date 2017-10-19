/**
 * Created by conan on 2017/8/23.
 */
import { environment } from "../../environments/environment"
import { RESTMockApi } from "./rest-mock-api";
import { isArray } from "util";

class VersionsApi extends RESTMockApi {

    onInit() {
        this.UrlApi = '/versions/:id';
        this.datas = [
            {
                "id": 1,
                "projectid":1,
                "name": "检测器",
                "version": '1.0',
                "description": "",
                "date": "2017-10-13 15:39:29"
            },
            {
                "id": 2,
                "projectid":2,
                "name": "检测器管理中心",
                "version": '1.0',
                "description": "",
                "date": "2017-10-13 15:39:29"
            },
            {
                "id": 2,
                "projectid":2,
                "name": "检测器管理中心",
                "version": '2.0',
                "description": "",
                "date": "2017-10-13 15:39:29"
            },
            {
                "id": 3,
                "projectid":3,
                "name": "数据库系统",
                "version": '3.0',
                "description": "",
                "date": "2017-10-13 15:39:29"
            }
        ];
    }

}

export let versionsApi: VersionsApi = Object.assign(new VersionsApi(), { UrlPrefix: environment.mock_config.api_prefix });
