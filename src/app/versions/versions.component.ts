import { Component, OnInit, ViewChild } from '@angular/core';
import { Versions } from './versions';
import { VersionsService } from './versions.service';
import { ProjectsService } from '../projects/projects.service';
import { Projects } from '../projects/projects';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  providers: [ToasterService],
  styleUrls: ['./versions.component.scss']
})
export class VersionsComponent implements OnInit {
  versions: Versions[];
  projects: Projects[];
  editing: object = {};
  v: object = {};
  rows = [];
  temp = [];
  public basic_options;
  isShow: boolean = false;
  mdIcon: string = 'keyboard_arrow_down';
  constructor(private toasterService: ToasterService, private versionsService: VersionsService, private projectsService: ProjectsService) { }
  getProjects(): void {
    this.projectsService
      .getProjects()
      .subscribe(res => {
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
  getVersions(): void {
    this.versionsService.getVersions()
      .subscribe(data => {
        if (data) {
          this.temp = [...data];
          this.rows = data;
        }
      });
  }
  showAddForm() {
    this.isShow = !this.isShow;
  }
  add(v: object): void {
    let samenameflag = true;
    for (var i = 0; i < this.rows.length; i++) {
      if (this.rows[i].projectid === this.v['projectid'] && this.rows[i].version === this.v['version']) {
        this.toasterService.pop('warning', '', '已存在该版本的项目');
        samenameflag = false;
        break;
      }
    }
    if (samenameflag) {
      for (var j = 0; j < this.projects.length; j++) {
        if (this.projects[j].id === this.v['projectid']) {
          this.v['name'] = this.projects[j]['text'];
          break;
        }
      }
      let now = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      this.v['date'] = now;
      this.versionsService.create(this.v)
        .subscribe(versions => {
          this.isShow = false;
          this.v = {};
        });
    }
  }
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target ? event.target.value : event.value;
    this.rows = [...this.rows];
    this.versionsService.update(this.rows[rowIndex]);
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }
  delete(rowIndex: number): void {
    this.versionsService
      .delete(this.rows[rowIndex].id)
      .subscribe(() => {
        this.rows = this.rows.filter(h => h !== this.rows[rowIndex]);
      });
  }
  ngOnInit() {
    this.getVersions();
    this.getProjects();
    this.basic_options = {
      multiple: true,
      closeOnSelect: false
    }
  }
}
