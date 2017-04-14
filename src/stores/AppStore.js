import {EventEmitter} from "fbemitter";
import _ from "underscore";
import ActionConstants from "../constants/AppConstants";
import dispatcher from "../dispatchers/AppDispatcher";
import $ from "jquery";

const CHANGE_EVENT = "CHANGE_EVENT";
<<<<<<< HEAD
const STORE_API_URL = "https://api.myjson.com/bins/1dd6yj";
=======
const STORE_API_URL = "https://api.myjson.com/bins/1dd6yj"
>>>>>>> origin/master

let _emitter = new EventEmitter();
let _noteStore = [];

function _fetchFromJsonStore() {
<<<<<<< HEAD
=======

>>>>>>> origin/master
    $.get(STORE_API_URL, res => {
        _noteStore = res.notes;
        _emitter.emit(CHANGE_EVENT);
    }).fail(err => {
        console.log(err);
    });
}

function _updateJsonStore() {
    $.ajax({
        url: STORE_API_URL,
        method: "PUT",
        data: JSON.stringify({notes: _noteStore}),
<<<<<<< HEAD
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
=======
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function (data){
>>>>>>> origin/master
            console.log(data);
        },
        error: function (jqXhr, status, err) {
            console.log(err);
        }
    });
}
<<<<<<< HEAD

=======
>>>>>>> origin/master

function _addNote(note) {
    _noteStore.push(note);
}

function _updateNote(note, id) {
    let notesToUpdate = _noteStore.filter(n => n.id === id);
<<<<<<< HEAD
    if(notesToUpdate.length > 1) {
        notesToUpdate[0].note = note;
        notesToUpdate[0].isEditing = false;
        _updateJsonStore();
    }
=======
    notesToUpdate[0].note = note;
    notesToUpdate[0].isEditing = false;

    _updateJsonStore();
>>>>>>> origin/master
}

function _deleteNote(id) {
    _noteStore = _.without(_noteStore, _.findWhere(_noteStore, {
        id
    }));
<<<<<<< HEAD
=======

>>>>>>> origin/master
    _updateJsonStore();
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
    let isEmitChange = true;

    switch (action.type) {
        case ActionConstants.INIT:
<<<<<<< HEAD
            _fetchFromJsonStore();
            isEmitChange = false;
=======
            isEmitChange = false;
            _fetchFromJsonStore();
>>>>>>> origin/master
            break;
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

    if(isEmitChange) _emitter.emit(CHANGE_EVENT);
});

export default AppStore;
