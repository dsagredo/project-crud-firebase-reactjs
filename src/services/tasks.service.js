import firebase from "../firebaseConfig";
const db = firebase.database();
const refTasks = db.ref("mistareas");
const refStatus = db.ref("estados");

const getTasks = () => refTasks;

const getStatus = () => refStatus;

const create = (item) => refTasks.push(item);

const update = (key, item) => refTasks.child(key).update(item);

const remove = (key) => refTasks.child(key).remove();

const edit = (key) => refTasks.child(key).once("value");

export {getTasks, getStatus, create, update, remove, edit};
