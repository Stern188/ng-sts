import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexService } from '../index/index.service';
import { ProjectsService } from '../projects/projects.service';
import { Projects } from '../projects/projects';
import { MembersService } from '../members/members.service';
import { Members } from '../members/members';
import { VersionsService } from '../versions/versions.service';
import { Versions } from '../versions/versions';
import { Index } from '../index/index';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  index: Index[];
  projects: Projects[];
  members: string;
  indexMod: object = {};
  versions: Versions[];
  rows = [];
  temp = [];
  proVal: number = 1;
  verVal: number = 1;
  isShow: boolean = false;
  constructor(private indexService: IndexService, private projectsService: ProjectsService, private versionsService: VersionsService, private membersService: MembersService) {
  }
  showAddForm() {
    this.isShow = !this.isShow;
  }
  getVersions(): void {
    this.versionsService
      .getVersions()
      .subscribe(res => {
        let versionArr = [];
        res.forEach(function (version) {
          versionArr.push({
            id: version.id,
            text: version.version
          });
        });
        this.versions = versionArr;
      });
  }
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
  getIndex(): void {
    this.indexService
      .getIndex()
      .subscribe(index => {
        this.temp = [...index];
        this.rows = index;
      });
  }
  getMembers(): void {
    this.membersService
      .getMembers()
      .subscribe(res => {
        let memberArr = [];
        res.forEach(function (member) {
          memberArr.push(member.name);
        });
        this.members = memberArr.join(',');
      });
  }
  add(indexMod: object): void {
    this.indexService.create(this.indexMod)
      .subscribe(index => {
        this.rows.unshift(index);
        this.isShow = false;
        this.indexMod = {};
      });
  }
  chgPro() {
    this.indexService.findVByProId(this.proVal);
  }
  chgVer() {
    this.indexService.findMem(this.proVal, this.verVal);
    this.getMembers();
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || d.state.toLowerCase().indexOf(val) !== -1 || d.projectname.toLowerCase().indexOf(val) !== -1 || d.description.toLowerCase().indexOf(val) !== -1 || d.date.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }
  ngOnInit() {
    this.getIndex();
    this.getProjects();
    this.getVersions();
    this.getMembers();
  }
}
