/**
 *
 * Created by conan on 2017/7/28.
 */
import {environment} from "../../environments/environment"
import {RESTMockApi} from "./rest-mock-api";
import {isArray} from "util";

class StatisticsApi extends RESTMockApi {

  onInit() {
    this.UrlApi = '/audit/statistics/info/:id';
    this.datas = [];
  }

  private __gen_data(d: any) {
    for (let s of d['serials']) {
      if (s.type === 'serial') {
        s.data = Array.from({length: s.n}, (v, i) =>
          Math.floor(Math.random() * 100)
        );
      } else if (s.type === 'top') {
        s.data = Array.from({length: s.n}, (v, i) => Math.floor(Math.random() * 100))
          .sort((a, b) => a - b);
      } else if (s.type === 'chance') {
        s.data = Array.from({length: s.n}, (v, i) => Math.random());
      }
    }
  }

  do_get(conn) {
    let restparams = this.__get_restParams(conn);
    let data = this.__get_dataByparam(restparams);

    if (!data) {
      return this.res(conn, {'error': 404, 'msg': 'object not found!'}, 404);
    }

    //对于取状态操作，模拟前5次返回start,取5次后成功
    if ((!isArray(data))
      && (!data['serials'][0].data)
      && restparams[restparams.length - 1].key === 'id'
      && restparams[restparams.length - 1].value) {
      if (data['status_cnt']) {
        data['status_cnt'] += 1;
      }
      else {
        data['status_cnt'] = 1;
      }
      if (data['status_cnt'] > 5) {
        data['status'] = 'finish';
        this.__gen_data(data);
      }
      else {
        data['status'] = 'start';
      }

    }
    return this.res(conn, data);
  }

}

export let statisticsApi: StatisticsApi = Object.assign(new StatisticsApi(), {UrlPrefix: environment.mock_config.api_prefix});
