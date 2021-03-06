import ActionConstants from "../constants/AppConstants";
import dispatcher from "../dispatchers/AppDispatcher";

export default {

    initialize() {
        dispatcher.dispatch({
            type: ActionConstants.INIT
        });
    },

    addNote(note) {
        dispatcher.dispatch({
            type: ActionConstants.ADD,
            note
        });
    },

    updateNote(note, index) {
        dispatcher.dispatch({
            type: ActionConstants.UPDATE,
            note,
            index
        });
    },

    deleteNote(index) {
        dispatcher.dispatch({
            type: ActionConstants.DELETE,
            index
        });
    }
}
