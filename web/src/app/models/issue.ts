export class Issue {
    title: string = String();
    body: string = String();
    createdAt!: Date;
    url: string = String();
    id: number = Number();
    userLogin: string = String();
    userHtmlUrl: string = String();
    milestoneDueOn: string = String();
    milestoneHtmlUrl: string = String();
    milestoneTitle: string = String();

}
