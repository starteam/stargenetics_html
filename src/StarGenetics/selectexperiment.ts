/// <reference path="../../../starx/src/StarX/lib/jquery.d.ts" />
/// <reference path="../../../starx/src/StarX/lib/require.d.ts" />
/// <reference path="state.ts" />
/// <reference path="config.d.ts" />

export class StarGeneticsSelectExperimentWidget {
    state:StarGeneticsState;
    config:StarGeneticsConfig;
    set_message(message) {
        $('#' + this.config['element_id']).html(message);
    }

    constructor(state:StarGeneticsState, config:StarGeneticsConfig) {
        this.state = state;
        this.config = config ;
        console.info( "StarGeneticsSelectExperimentWidget");
        console.info( config );
        this.set_message("Welcome!");
        $('button','#' + this.config['element_id']).click()
        window.select_experiment = this;
        state.listen_websocket(config,this);
    }

    public onmessage(message)
    {
        var data = JSON.parse( message.data) ;
        if( data.command == 'list_experiment_response')
        {
            console.info( "Experiment list");
            console.info( data.experiments ) ;
        }
    }

    public onopen(socket,event)
    {
        this.socket = socket;
        socket.send(JSON.stringify({'command':'list_experiments'}));
    }
}