import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css', '../shared/common.css']
})
export class IssuesComponent implements OnInit {


  public issues: Issue[] = [];

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {

    this.issueService.GetIssues().subscribe(
      issues => {
        this.issues = issues
      }
    )
  }
}
