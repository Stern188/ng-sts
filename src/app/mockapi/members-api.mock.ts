/**
 * Created by conan on 2017/8/23.
 */
import { environment } from "../../environments/environment"
import { RESTMockApi } from "./rest-mock-api";
import { isArray } from "util";

class MembersApi extends RESTMockApi {

    onInit() {
        this.UrlApi = '/members/:id';
        this.datas = [
            {
                "id": 1,
                "name": "张三",
                "email":"zhangsan@topsec.com.cn",
                "username": "zhangsan",
                "projectsid": ["1","2"],
                "projectsname": ["检测器","检测器管理中心"]
            },
            {
                "id": 2,
                "name": "李四",
                "email":"lisi@topsec.com.cn",
                "username": "lisi",
                "projectsid": ["1"],
                "projectsname": ["检测器"]
            },
            {
                "id": 3,
                "name": "王五",
                "email":"wangwu@topsec.com.cn",
                "username": "wangwu",
                "projectsid": ["1","3"],
                "projectsname": ["检测器","数据库系统"]
            }
        ];
    }

}

export let membersApi: MembersApi = Object.assign(new MembersApi(), { UrlPrefix: environment.mock_config.api_prefix });
