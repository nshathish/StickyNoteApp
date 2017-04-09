import {EventEmitter} from "fbemitter";
import _ from "underscore";
import ActionConstants from "../constants/AppConstants";
import dispatcher from "../dispatchers/AppDispatcher";

const CHANGE_EVENT = "CHANGE_EVENT";

let _emitter = new EventEmitter();
let _noteStore = [
    {id: 1, note: "Call Bill", isEditing: false},
    {id: 2, note: "Email Lisa", isEditing: false},
    {id: 3, note: "Make Dentist appointment", isEditing: false},
    {id: 4, note: "Send Proposal", isEditing: false}
];

function _addNote(note) {
    _noteStore.push(note);
}

function _updateNote(note, id) {
    let noteToUpdate = _noteStore.map(n => {
        return n.id === id;
    });

    noteToUpdate.note = note;
}

function _deleteNote(id) {
    _noteStore = _.without(_noteStore, _.findWhere(_noteStore, {
        id
    }));
}


let AppStore = {
    getNotes() {
        return _noteStore;
    },
    getNextId() {
        let topId = Math.max(..._.pluck(_noteStore, "id"));
        return ++topId;
    },
    addListener(cb) {
        return _emitter.addListener(CHANGE_EVENT, cb);
    }
};

dispatcher.DispatchToken = dispatcher.register(action => {
    switch (action.type) {
        case ActionConstants.ADD:
            _addNote(action.note);
            break;
        case ActionConstants.UPDATE:
            _updateNote(action.note, action.index);
            break;
        case ActionConstants.DELETE:
            _deleteNote(action.index);
            break;
    }

    _emitter.emit(CHANGE_EVENT);
});

export default AppStore;
