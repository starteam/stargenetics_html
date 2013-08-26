export class StudentIDWidgetState {
    element_id: string;
    student_id: string;

    constructor(config:StarGeneticsConfig)
    {
        this.element_id = config.element_id;
        this.student_id = config.StudentID;
    }

    get id()
    {
        return this.student_id;
    }

    get uid()
    {
        return this.element_id;
    }
}

export class StarGeneticsAppWidgetState {
    element_id: string;

    constructor(config:StarGeneticsConfig)
    {
        this.element_id = config.element_id;
    }

    get uid()
    {
        return this.element_id;
    }
}

export class StarGeneticsState {
    StudentIDWidgetState: StudentIDWidgetState;
    StarGeneticsAppWidgetState:StarGeneticsAppWidgetState;

    setStudentID(config:StarGeneticsConfig):StudentIDWidgetState
    {
        this.StudentIDWidgetState = new StudentIDWidgetState(config);
        return this.StudentIDWidgetState;
    }

    setApp(config:StarGeneticsConfig):StarGeneticsAppWidgetState
    {
        this.StarGeneticsAppWidgetState = new StarGeneticsAppWidgetState(config);
        return this.StarGeneticsAppWidgetState;
    }

    get student_id() {
        var sid = this.StudentIDWidget;
        return sid ? sid.id : "__NOT_SET__";
    }
}

export class StarGeneticsGlobalState {
    state = {};

    get_state( config:StarGeneticsConfig):StarGeneticsState
    {
        var Group = config['Group'] || 'default';
        if(! this.state[Group] )
        {
            this.state[Group] = new StarGeneticsState();
        }
        var my_state = this.state[Group];
        return my_state;
    }
}