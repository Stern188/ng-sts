import { Component, OnInit, ViewChild } from '@angular/core';
import { Members } from './members';
import { MembersService } from './members.service';
import { ProjectsService } from '../projects/projects.service';
import { Projects } from '../projects/projects';
import { Modal } from "ngx-modialog/plugins/vex";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
// import { FormGroup } from "@angular/forms";
// import {
//   DynamicFormControlModel,
//   DynamicSelectModel,
//   DynamicFormService,
//   DynamicInputModel
// } from "@ng2-dynamic-forms/core";

// let example_model = [
//   new DynamicInputModel(
//     {
//       hint: "用户名格式为字母开头、6-16字节、只允许输入字母数字下划线",
//       label: "用户名",
//       id: "userInput",
//       validators: {
//         required: null,
//         pattern: /^[A-Za-z][\w]{5,15}$/
//       },
//       errorMessages: {
//         required: "格式不正确",
//       }
//     }
//   ),
//   new DynamicSelectModel<string>(
//     {
//       id: "proSelect",
//       label: "选择项目",
//       multiple: true,
//       options: [
//         {
//           label: "Option 1",
//           value: "option-1",
//         },
//         {
//           label: "Option 2",
//           value: "option-2"
//         },
//         {
//           label: "Option 3",
//           value: "option-3"
//         },
//         {
//           label: "Option 4",
//           value: "option-4"
//         }
//       ]
//     }
//   )
// ];
@Component({
  selector: 'app-members',
  providers: [ToasterService],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: Members[];
  projects: Projects[];
  editing: object = {};
  users: object = {};
  rows = [];
  temp = [];
  public basic_options;
  isShow: boolean = false;
  mdIcon: string = 'keyboard_arrow_down';
  // formModel: DynamicFormControlModel[] = example_model;
  // formGroup: FormGroup;private formService: DynamicFormService
  constructor(private toasterService: ToasterService, public modal: Modal, private membersService: MembersService, private projectsService: ProjectsService) {
    // this.formGroup = this.formService.createFormGroup(this.formModel);
  }
  getProjects(): void {
    this.projectsService
      .getProjects()
      .subscribe(res => {
        // this.projects = res;
        let projectArr = [];
        res.forEach(function (project) {
          projectArr.push({
            id: project.id,
            text: project.name
          });
        });
        this.projects = projectArr;
      });
  }
  getMembers(): void {
    this.membersService
      .getMembers()
      .subscribe(members => {
        this.temp = [...members];
        this.rows = members;
      });
  }
  showAddForm() {
    this.isShow = !this.isShow;
  }
  add(users: object): void {
    this.membersService.create(this.users)
      .subscribe(member => {
        this.rows.unshift(member);
        this.isShow = false;
        this.users = {};
      });
  }
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    /* if (cell === 'projectsname') {
      this.rows[rowIndex][cell] = this.getSelectValues(event.target);
    } else { */
    this.rows[rowIndex][cell] = event.target ? event.target.value : event.value;
    // }
    this.rows = [...this.rows];
    this.membersService.update(this.rows[rowIndex]);
  }
  /* getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }; */
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }
  delete(rowIndex: number): void {
    const dialogRef = this.modal.confirm()
      .isBlocking(true)
      .message('是否确定删除？')
      .okBtn('确定')
      .cancelBtn('取消')
      .open().then(dialogRef => {
        dialogRef.result.then(result => {
          this.membersService
            .delete(this.rows[rowIndex].id)
            .subscribe(() => {
              this.rows = this.rows.filter(h => h !== this.rows[rowIndex]);
            });
            // .catch(() => {
            //   this.toasterService.pop('error', '', '删除失败');
            // });
        }).catch(result => { });
      });
  }
  ngOnInit() {
    this.getMembers();
    this.getProjects();
    this.basic_options = {
      multiple: true,
      closeOnSelect: false
    }
  }
}
