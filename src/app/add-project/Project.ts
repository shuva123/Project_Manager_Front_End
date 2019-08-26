export class Projects {
    Project_ID:Number;
    ProjectName: string; 
    Start_Date:Date;
    End_Date:Date;
    Priority:string;
    Employee_Name:string;
    Employee_ID:Number;
}

export class viewProject {
    Project_ID:Number;
    ProjectName: string; 
    Start_Date:string;
    End_Date:string;
    Priority:string;
    TaskCount:string;
    CompletedTaskCount: String;
    IsCompleted: String;
}

export class endProject {
    Project_ID:Number;
    IsCompleted: String;
}

export class managerModalData {
    Employee_ID:Number;
    First_Name: String;
    Last_Name: String;
}