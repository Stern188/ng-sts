/**
 *
 * Created by conan on 2017/7/26.
 */
import {environment} from "../../environments/environment"
import {RESTMockApi} from "./rest-mock-api";

class DashboardApi extends RESTMockApi{

  onInit(){
    this.UrlApi='/dashboard/:id';
    this.datas=[
      {
        id:'111111',
        name:'111111',
        dashboard:[
          {'label':'item1',
            view:{cols: 2, rows: 1, y: 0, x: 0},
          },
          {'label':'item2',
            view:{cols: 2, rows: 2, y: 0, x: 2},
          },
          {'label':'item3',
            view:{cols: 1, rows: 1, y: 0, x: 4},
          },
          {'label':'item4',
            view:{cols: 1, rows: 1, y: 0, x: 5},
          },
          {'label':'item5',
            view:{cols: undefined, rows: undefined, y: 1, x: 0},
          },
          {'label':'item6',
            view:{cols: 1, rows: 1, y: undefined, x: undefined},
          },
          {'label':'item7',
            view:{cols: 2, rows: 2, y: 1, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
          },
          {'label':'item8',
            view:{cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2'},
          },
          {'label':'item9',
            view:{cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
          },
          {'label':'item10',
            view:{cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled'},
          },
          {'label':'item11',
            view:{cols: 1, rows: 1, y: 0, x: 6},
          },
        ]
      },{
        id:'222222',
        name:'222222',
      }
    ];
  }

}

export let dashboardApi:DashboardApi = Object.assign(new DashboardApi(), {UrlPrefix:environment.mock_config.api_prefix} );
