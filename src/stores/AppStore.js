import {EventEmitter} from "fbemitter";
import _ from "underscore";
import ActionConstants from "../constants/AppConstants";
import dispatcher from "../dispatchers/AppDispatcher";
import $ from "jquery";

const CHANGE_EVENT = "CHANGE_EVENT";
const STORE_API_URL = "https://api.myjson.com/bins/1dd6yj";

let _emitter = new EventEmitter();
let _noteStore = [];

function _fetchFromJsonStore() {
    // using Fetch
    fetch(STORE_API_URL)
        .then(res => {
            return res.json();
        })
        .then(res => {
            _noteStore = res.notes;
            _emitter.emit(CHANGE_EVENT);
        })
        .catch(err => {
            console.log("Fetch From Data Store", err);
        });


    /*$.get(STORE_API_URL, res => {
        _noteStore = res.notes;
        _emitter.emit(CHANGE_EVENT);
    }).fail(err => {
        console.log(err);
    });*/
}

function _updateJsonStore() {
    // using Fetch
    fetch(STORE_API_URL, {
        method: "PUT",
        mode: "cors",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({notes: _noteStore})
    }).catch(err => {
        console.log("Update Json Store", err);
    });


    /*$.ajax({
        url: STORE_API_URL,
        method: "PUT",
        data: JSON.stringify({notes: _noteStore}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function (data){
            console.log(data);
        },
        error: function (jqXhr, status, err) {
            console.log(err);
        }
    });*/
}

function _addNote(note) {
    _noteStore.push(note);
}

function _updateNote(note, id) {
    let notesToUpdate = _noteStore.filter(n => n.id === id);

    if(notesToUpdate.length == 1) {
        notesToUpdate[0].note = note;
        notesToUpdate[0].isEditing = false;
    }

    _noteStore.forEach(note => {
        note.isEditing = false;
    });

    _updateJsonStore();
}

function _deleteNote(id) {
    _noteStore = _.without(_noteStore, _.findWhere(_noteStore, {
        id
    }));
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
            _fetchFromJsonStore();
            isEmitChange = false;
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
