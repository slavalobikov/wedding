import { Client, Account, Databases, ID, Functions } from 'appwrite';
import config from '../../config.js';
import { createToast } from '../utils';
import { ROUTES } from '../utils/const';

const envs = {
  baseUrl: config.APPWRITE.BASE_URL,
  projectId: config.APPWRITE.PROJECT_ID,
  guests: {
    databaseId: config.APPWRITE.GUESTS.DATABASE_ID,
    guestCollectionId: config.APPWRITE.GUESTS.GUEST_COLLECTION_ID,
    guestGroupCollectionId: config.APPWRITE.GUESTS.GUEST_GROUP_COLLECTION_ID,
  },
  questions: {
    databaseId: config.APPWRITE.QUESTIONS.DATABASE_ID,
    questionCollectionId: config.APPWRITE.QUESTIONS.COLLECTION_ID,
  },
  functions: {
    createGuestFunctionId: config.APPWRITE.FUNCTIONS.CREATE_GUEST_ID,
    createGuestGroupFunctionId: config.APPWRITE.FUNCTIONS.CREATE_GUEST_GROUP_FUNCTION_ID,
    getGuestGroupFunctionId: config.APPWRITE.FUNCTIONS.GET_GUEST_GROUP_FUNCTION_ID,
    updateGuestGroupFunctionId: config.APPWRITE.FUNCTIONS.UPDATE_GUEST_GROUP_FUNCTION_ID,
    deleteGuestGroupFunctionId: config.APPWRITE.FUNCTIONS.DELETE_GUEST_GROUP_FUNCTION_ID,
  },
};

class AppwriteService {
  static #client = new Client();
  static #account = new Account(this.#client);
  static #databases = new Databases(this.#client);
  static #functions = new Functions(this.#client);

  // init
  static init = () => {
    this.#client.setEndpoint(envs.baseUrl).setProject(envs.projectId);
  };

  // guests
  static getGuest = (guestId, callback) => {
    const promise = this.#databases.getDocument(envs.guests.databaseId, envs.guests.guestCollectionId, guestId);

    promise.then(
      function (response) {
        callback(response);
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };
  static createGuest = (data, onPending, onSuccess) => {
    const promise = () => this.#functions.createExecution(envs.functions.createGuestFunctionId, JSON.stringify(data));
    createToast(promise, 'Guest creating...', 'Guest created!', onPending, onSuccess);
  };
  static updateGuest = ({ guestId, ...data }, onPending, onSuccess) => {
    const promise = () =>
      this.#databases.updateDocument(envs.guests.databaseId, envs.guests.guestCollectionId, guestId, data);
    createToast(promise, 'Guest updating...', 'Guest updated!', onPending, onSuccess);
  };

  // groups
  static getGuestGroups = (callback) => {
    const promise = this.#databases.listDocuments(envs.guests.databaseId, envs.guests.guestGroupCollectionId);

    promise.then(
      function (response) {
        callback(response?.documents);
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };
  static getGuestGroup = (data, callback) => {
    let promise = this.#functions.createExecution(envs.functions.getGuestGroupFunctionId, JSON.stringify(data));

    promise.then(
      function (response) {
        callback(JSON.parse(response?.response));
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };
  static updateGuestGroup = (data) => {
    let promise = this.#functions.createExecution(envs.functions.updateGuestGroupFunctionId, JSON.stringify(data));

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };
  static deleteGuestGroup = (data, onPending, onSuccess) => {
    let promise = () => this.#functions.createExecution(envs.functions.deleteGuestGroupFunctionId, JSON.stringify(data));

    createToast(promise, 'Group deleting...', 'Group deleted!', onPending, onSuccess)
  };

  //session
  static createSession = (email, password, navigate) => {
    const promise = this.#account.createEmailSession(email, password);

    promise.then(
      function (response) {
        sessionStorage.setItem('_session', JSON.stringify(response));
        navigate(ROUTES.ADMIN);
      },
      function (error) {
        return error;
      },
    );
  };
  static deleteSession = () => {
    const sessionId = JSON.parse(sessionStorage.getItem('_session')).$id;
    const promise = this.#account.deleteSession(sessionId);

    promise.then(
      function (response) {
        sessionStorage.removeItem('_session');
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };

  // questions
  static getQuestions = (callback) => {
    const promise = this.#databases.listDocuments(envs.questions.databaseId, envs.questions.questionCollectionId);

    promise.then(
      function (response) {
        callback(response?.documents);
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };
  static addQuestion = (questionTitle, answers) => {
    const promise = this.#databases.createDocument(
      envs.questions.databaseId,
      envs.questions.questionCollectionId,
      ID.unique(),
      {
        questionTitle,
        answers,
      },
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };
  static updateQuestion = (questionId) => {
    const promise = this.#databases.updateDocument(
      envs.questions.databaseId,
      envs.questions.questionCollectionId,
      questionId,
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };
  static deleteQuestion = (questionId) => {
    const promise = this.#databases.deleteDocument(
      envs.questions.databaseId,
      envs.questions.questionCollectionId,
      questionId,
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };
}

export default AppwriteService;
