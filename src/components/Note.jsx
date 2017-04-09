import React from "react";
import AppActions from "../actions/AppActions";

export default class Note extends React.Component {

    constructor(props) {
        super(props);

        // don't use this.props
        this.state = {
            editing: props.isEditing,
            note: props.note
        };

        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save =  this.save.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
    }

    componentWillMount() {
        this.style = {
            right: this._randomBetween(0, window.innerWidth - 150) + "px",
            top: this._randomBetween(0, window.innerHeight - 150) + "px",
            transform: "rotate(" + this._randomBetween(-15, 15) +"deg)"
        };
    }

    /*componentWillReceiveProps(nextProps) {
        this.setState({note: nextProps.note });
    }*/

    edit() {
        this.setState({editing: true});
    }

    delete() {
        AppActions.deleteNote(this.props.id);
    }

    save() {
        this.setState({editing: false});
        AppActions.updateNote(this.state.note, this.props.id);
    }

    onNoteChange(e) {
        this.setState({
            note: e.target.value
        });
    }

    _randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

    renderDisplay() {
        return (
            <div className="note" style={this.style}>
                <p>{this.state.note}</p>
                <span>
                    <button className="btn btn-primary glyphicon glyphicon-pencil"
                            onClick={this.edit} />
                    <button className="btn btn-danger glyphicon glyphicon-trash"
                            onClick={this.delete} />
                </span>
            </div>
        );
    }

    renderForm() {
        return (
            <div className="note" style={this.style}>
                <textarea className="form-control" onChange={this.onNoteChange} defaultValue={this.state.note}></textarea>
                <button className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"
                        onClick={this.save} />
            </div>
        );
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay();
    }
}