import { Component, OnInit } from '@angular/core';
import { Projects } from './projects';
import { ProjectsService } from './projects.service';
import { MembersService } from '../members/members.service';
import { Members } from '../members/members';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Projects[];
  members: Members[];
  editing: object = {};
  project: object = {};
  rows = [];
  temp = [];
  // public basic_options;
  isShow: boolean = false;
  mdIcon: string = 'keyboard_arrow_down';
  constructor(private projectsService: ProjectsService, private membersService: MembersService) {
  }
  getProjects(): void {
    this.projectsService
      .getProjects()
      .then(projects => {
        this.temp = [...projects];
        this.rows = projects;
      });
  }
  getMembers(): void {
    this.membersService
      .getMembers()
      .then(res => {
        this.members = res;
        /* let memberArr = [];
        res.forEach(function (member) {
          memberArr.push({
            id: member.id,
            text: member.name
          });
        });
        this.members = memberArr; */
      });
  }
  showAddForm() {
    this.isShow = !this.isShow;
  }
  add(project: object): void {
    this.projectsService.create(this.projects)
      .then(project => {
        this.rows.unshift(project);
        this.isShow = false;
        this.project = {};
      });
  }
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.projectsService.update(this.rows[rowIndex]);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }
  delete(rowIndex: number): void {
    this.projectsService
      .delete(this.rows[rowIndex].id)
      .then(() => {
        this.rows = this.rows.filter(h => h !== this.rows[rowIndex]);
      });
  }
  ngOnInit() {
    this.getProjects();
    this.getMembers();
    /* this.basic_options = {
      multiple: true,
      closeOnSelect: false
    } */
  }
}
