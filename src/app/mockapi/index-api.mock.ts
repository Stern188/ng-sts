/**
 * Created by conan on 2017/8/23.
 */
import { environment } from "../../environments/environment"
import { RESTMockApi } from "./rest-mock-api";
import { isArray } from "util";

class IndexApi extends RESTMockApi {

    onInit() {
        this.UrlApi = '/index/:id';
        this.datas = [
            {
                "id": 1,
                "name": "张三",
                "date":"2017-10-9 17:27:26",
                "state":"all",
                "description":"",
                "version":"1.0",
                "projectname": "检测器"
            },
            {
                "id": 2,
                "name": "李四",
                "date":"2017-10-9 17:27:26",
                "state":"part",
                "description":"",
                "version":"1.0",
                "projectname": "检测器管理中心"
            },
            {
                "id": 3,
                "name": "王五",
                "date":"2017-10-9 17:27:26",
                "state":"none",
                "description":"部分功能未实现",
                "version":"1.0",
                "projectname": "数据库系统"
            }
        ];
    }

}

export let indexApi: IndexApi = Object.assign(new IndexApi(), { UrlPrefix: environment.mock_config.api_prefix });
