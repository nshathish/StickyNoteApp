import React from "react";
import Note from "./Note";
import AppStore from "../stores/AppStore";
import AppActions from "../actions/AppActions";

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            notes: AppStore.getNotes()
        };

        this._changeEvent = this._changeEvent.bind(this);
        this.newNote = this.newNote.bind(this);
    }

    componentWillMount() {
        AppStore.addListener(this._changeEvent);
    }

    newNote() {
        AppActions.addNote({
            id: AppStore.getNextId(),
            note: "",
            isEditing: true
        });
    }

    _changeEvent() {
        this.setState({
            notes: AppStore.getNotes()
        });
    }

    render() {

        let notes = this.state.notes.map(note => {
            return <Note key={note.id} id={note.id} note={note.note} isEditing={note.isEditing} />;
        });

        return (
            <div className="board">
                {notes}
                <button className="btn btn-success btn-sm glyphicon glyphicon-plus"
                        onClick={this.newNote} />
            </div>
        );
    }
}